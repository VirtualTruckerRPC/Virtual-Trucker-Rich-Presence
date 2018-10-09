// VIRTUAL TRUCKER RICH PRESENCE 2.61

const DiscordRPC = require('discord-rpc');
var now = require("date-now")
var ip = require("ip");
var ETCarsClient = require('etcars-node-client');
var fetch = require('node-fetch');
var util = require('util');
var config = require('./config');
const LogManager = require('./LogManager');
const path = require('path');
const argv = require('yargs').argv
const clientConfiguration = require(argv.clientConfiguration ? argv.clientConfiguration : './clientconfiguration.json');
const UpdateNotifier = require('./UpdateNotifier');
var child_process = require('child_process');
var updateChecker = new UpdateNotifier();

class RichPresenceManager {
    constructor() {
        this.logger = new LogManager();
        this.etcars = new ETCarsClient();

        // configure logging for ETCars client
        if (argv.dev)
            this.etcars.enableDebug = false;

        // setting initial variables state
        this.rpc = null;
        this.mpCheckerIntervalTime = config.mpCheckerIntervalMilliseconds; // 2 minute
        this.locationCheckerIntervalTime = config.locationCheckerIntervalMilliseconds; // 1 minute

        if (argv.dev) {
            this.mpCheckerIntervalTime = 0.5 * 60 * 1000; // 1 minute
            this.locationCheckerIntervalTime = 0.5 * 60 * 1000; // 1 minute
        }

        this.mpInfo = null;
        this.lastData = null;
        this.rpcReady = false;
        this.rpcOnChangingState = false;
        this.mpCheckerInterval = null;
        this.locationCheckerInterval = null;
        this.locationInfo = null;

        this.logger.info('Client configuration:');
        this.logger.info(JSON.stringify(clientConfiguration));
    }

    init() {
        this.bindETCarsEvents();

        this.etcars.connect();
    }

    bindETCarsEvents() {
        var instance = this;

        this.etcars.on('data', function (data) {
            //use a try / catch as sometimes the data isn't there when first connecting...plus it's json parsing...
            try {

                // putting apart last data received
                instance.lastData = data;
                if (typeof (data.telemetry) != 'undefined' && data.telemetry) {

                    if (argv.logetcarsdata) {
                        instance.logger.debug(data);
                    }

                    // telemetry exists

                    // begin to initialize Discord RPC
                    // checking if is in valid state
                    if (!instance.rpcOnChangingState) {

                        // checking if is not ready
                        if (!instance.rpcReady) {

                            instance.rpcOnChangingState = true;

                            // getting application id (default ETS2)
                            var applicationID = config.applications.ets2;

                            // checking if playing ATS
                            if (instance.isAts(data)) {
                                applicationID = config.applications.ats;
                                instance.logger.info('Game detected: ATS');
                            } else {
                                instance.logger.info('Game detected: ETS2');
                            }
                            instance.logger.info(`Using Discord Application ID ${applicationID}`);

                            instance.startLocationChecker();

                            // creating a new Discord RPC Client instance
                            instance.rpc = new DiscordRPC.Client({
                                transport: 'ipc'
                            });

                            // login to RPC
                            instance.rpc.login({clientId: applicationID }).then(() => {
                                instance.logger.info('Discord RPC ready');
                                // cleaning up variables to save RPC Client state
                                instance.rpcReady = true;
                                instance.rpcOnChangingState = false;
                            }).catch(console.error);
                        }
                    }

                    if (instance.rpcReady) {

                        // checking if playing in multiplayer and loading online state, server and position
                        if (instance.checkIfMultiplayer(data) && instance.mpInfo == null) {
                            instance.logger.info('Multiplayer detected');
                            instance.checkMpInfo();
                            instance.startMPChecker();
                        }

                        var activity = instance.buildActivity(data);

                        if (activity != null) {
                            instance.rpc.setActivity(activity);
                        }
                    }
                }
            } catch (error) {
                instance.logger.error(error);
            }
        });

        this.etcars.on('connect', function (data) {
            instance.logger.info('Connected to ETCARS');
            updateChecker.checkUpdates();
        });

        this.etcars.on('error', function (data) {
            instance.resetETCarsData();

            instance.destroyRPCClient();

            instance.resetMPChecker();

            instance.resetLocationChecker();
        });
    }
    
    buildActivity(data) {
        var activity = null;

        if (typeof data.telemetry != 'undefined' && data.telemetry) {
            activity = {};

            var speed = data.telemetry.truck.speed;

            if (speed < 0)
                speed = speed * -1;
                
            activity.smallImageText = `${data.telemetry.truck.make} ${data.telemetry.truck.model} - At ${this.calculateDistance(data.telemetry.truck.odometer, this.isAts(data))} ${this.getDistanceUnit(this.isAts(data))}`;

            if (config.supportedBrands.includes(data.telemetry.truck.makeID.toLowerCase())) {
                activity.smallImageKey = `${config.constants.brandPrefix}${data.telemetry.truck.makeID}`;
            } else {
                activity.smallImageKey = config.constants.brandGenericKey;
            }
            
            activity.details = '';
            activity.state = '';

            if (typeof data.telemetry.job != 'undefined' && data.telemetry.job && data.telemetry.job.onJob === true) {
                activity.details += `🚚 ${data.telemetry.job.sourceCity} > ${data.telemetry.job.destinationCity} at ${this.calculateSpeed(speed, this.isAts(data))} ${this.getSpeedUnit(this.isAts(data))}`;
                activity.largeImageText = `🚚 ${data.telemetry.job.cargo} - Est. Income: ${this.getCurrency(data)} ${data.telemetry.job.income}`;
            } else {
                activity.details += `🚛 Freeroaming at ${this.calculateSpeed(speed, this.isAts(data))} ${this.getSpeedUnit(this.isAts(data))}`;
                activity.largeImageText = `VT-RPC v2.6.0`;
            }

            activity.largeImageKey = this.getLargeImageKey(data);

            if (this.mpInfo != null && this.mpInfo.online && this.mpInfo.server && this.mpInfo.serverUS && this.mpInfo.serverMAX) {

                activity.state += util.format('🌐 %s', this.mpInfo.server.name);
                activity.state += util.format(' | %s/%s', this.mpInfo.serverUS, this.mpInfo.serverMAX);
            } 
            else if (data.telemetry.game.isMultiplayer == true) {
                activity.state = `🌐 Multiplayer`;
            } else {
                activity.state = `🌐 Singleplayer`;
            }
            
            if (this.locationInfo && this.locationInfo.location && this.locationInfo.location != null) {
                activity.state += util.format(' | Near %s', this.locationInfo.location);
            }

            if (argv.logallactivity) {
                console.log(activity);
            }
        }

        return activity;
    }

    getCurrency(data) {
        if (this.isAts(data))
            return config.constants.currencies.dollars;
        else
            return config.constants.currencies.euros;
    }

    isAts(data) {
        return data.telemetry.game.gameID == config.constants.ats;
    }

    getLargeImageKey(data) {
        var prefix = config.constants.ets2LargeImagePrefix;
        var key = '';

        if (this.isAts(data)){
            prefix = config.constants.atsLargeImagePrefix;
		}
			
        if (key == '') {
            if (data.telemetry.truck.lights.lowBeam === true) {
                key = config.constants.largeImageKeys.night;
            } else {
                key = config.constants.largeImageKeys.day;
            }
        }

        //console.log(key);
        return prefix + key;
    }

    getDistanceUnit(isAts) {

        if (isAts)
            return config.milesString;

        if (clientConfiguration.configuration.distanceUnit == config.constants.km)
            return config.kmString;
        else
            return config.milesString;
    }

    getSpeedUnit(isAts) {

        if (isAts)
            return config.mphString;

        if (clientConfiguration.configuration.distanceUnit == config.constants.km)
            return config.kphString;
        else
            return config.mphString;
    }

    calculateSpeed(value, isAts) {

        value = value * config.constants.speedMultiplierValue;

        if (isAts) {
            return Math.round(value * config.kmToMilesConversion);
        } else {
            if (clientConfiguration.configuration.distanceUnit == config.constants.km)
                return Math.round(value);
            else
                return Math.round(value * config.kmToMilesConversion);
        }
    }

    calculateDistance(value, isAts) {
        if (isAts) {
            return Math.round(value * config.kmToMilesConversion);
        } else {
            if (clientConfiguration.configuration.distanceUnit == config.constants.km)
                return Math.round(value);
            else
                return Math.round(value * config.kmToMilesConversion);
        }
    }

    startMPChecker() {
        if (this.mpCheckerInterval == null) {
            var instance = this;
            this.mpCheckerInterval = setInterval(() => {
                instance.checkMpInfo()
            }, this.mpCheckerIntervalTime);
            this.logger.info('Starting MP Checker interval');
        }
    }
    startLocationChecker() {
        if (this.locationCheckerInterval == null) {
            var instance = this;
            this.locationCheckerInterval = setInterval(() => {
                instance.checkLocationInfo()
            }, this.locationCheckerIntervalTime);
            this.logger.info('Starting Location Checker interval');
        }
    }

    resetETCarsData() {
        this.lastData = null;
        this.mpInfo = null;
    }

    resetMPChecker() {
        if (this.mpCheckerInterval != null) {
            clearInterval(this.mpCheckerInterval);
            this.mpCheckerInterval = null;
            this.mpInfo = null;
            this.logger.info('MP Checker interval reset');
        }
    }
    resetLocationChecker() {
        if (this.locationCheckerInterval != null) {
            clearInterval(this.locationCheckerInterval);
            this.locationCheckerInterval = null;
            this.locationInfo = null;
            this.logger.info('Location Checker interval reset');
        }
    }

    destroyRPCClient() {
        if (this.rpc != null) {
            var instance = this;
            this.rpc.setActivity({});
            this.rpc.destroy().then(() => {
                instance.rpc = null;
            });
            this.rpcReady = false;
            this.rpcOnChangingState = false;
            this.logger.info('Discord RPC Client destroyed');
        }
    }

    checkIfMultiplayer(data) {
        return data.telemetry && data.telemetry.game && data.telemetry.game.isMultiplayer && data.telemetry.user;
    }

    checkMpInfo() {

        var instance = this;

        if (this.lastData != null && this.checkIfMultiplayer(this.lastData)) {

            this.logger.debug('Checking online state');

            var url = util.format('https://api.truckyapp.com/v1/richpresence/playerInfo?query=%s', this.lastData.telemetry.user.steamID);

            //console.log(url);
            fetch(url).then((body) => {
                return body.json()
            }).then((json) => {

                if (!json.error) {
                    var response = json.response;
                    if (response.onlineState.online) {
                        instance.mpInfo = {
                            online: true,
                            server: response.onlineState.serverDetails,
                        };
                    } else {
                        instance.mpInfo = {
                            online: false
                        }
                    };
                } else {
                    instance.mpInfo = null;
                }
            });

            var url2 = util.format('https://api.truckyapp.com/v2/truckersmp/servers?query=%s', instance.mpInfo.server.apiserverid);

            //console.log(url);
            fetch(url2).then((body) => {
                return body.json()
            }).then((json) => {

                if (!json.error) {
                    var response = json.response;

                        instance.mpInfo = {
                            serverUS: response.servers.players,
                            serverMAX: response.servers.maxplayers,
                    };
                };
            });
        }
    }
        checkLocationInfo() {
            var instance = this;
            if (this.lastData.status == "TELEMETRY") {
                if(this.lastData.telemetry.truck.worldPlacement.x == "0") { 
                    instance.locationInfo = {
                        location: false,
                    };
                } else {
                    this.logger.debug('Checking location');
                
                    var url = util.format('https://api.truckyapp.com/v2/map/%s/resolve?x=%s&y=%s', this.lastData.telemetry.game.gameID, this.lastData.telemetry.truck.worldPlacement.x, this.lastData.telemetry.truck.worldPlacement.z);
            
                    //console.log(url);
                    fetch(url).then((body) => {
                        return body.json()
                    }).then((json) => {
                
                        if (!json.error) {
                            var response = json.response;
                                instance.locationInfo = {
                                    location: response.poi.realName,
                                };
                        } else {
                            instance.locationInfo = {
                                location: false,
                            };
                        }
                    });
                }
            } else {
                instance.locationInfo = {
                    location: false,
                };
            }
        }
}

module.exports = RichPresenceManager;