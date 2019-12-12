// VIRTUAL TRUCKER RICH PRESENCE 2.84

const DiscordRPC = require('discord-rpc');
var now = require("date-now")
var ETCarsClient = require('etcars-node-client');
var fetch = require('node-fetch');
var util = require('util');
var config = require('./config');
const LogManager = require('./LogManager');
const argv = require('yargs').argv
const clientConfiguration = require(argv.clientConfiguration ? argv.clientConfiguration : './clientconfiguration.json');
const UpdateNotifier = require('./UpdateNotifier');
const ProModsNotifier = require('./ProModsNotifier');
var updateChecker = new UpdateNotifier();
var promodsNotify = new ProModsNotifier();

class RichPresenceManager {
    // IMPORTANT STUFF //
    constructor() {
        this.logger = new LogManager();
        this.etcars = new ETCarsClient();

        if(argv.promods) {
            argv.dev == true;
        }

        // configure logging for ETCars client
        if(argv.dev) {
            this.etcars.enableDebug = false;
        }

        // setting initial variables state
        this.rpc = null;
        this.mpCheckerIntervalTime = config.mpCheckerIntervalMilliseconds;
        this.locationCheckerIntervalTime = config.locationCheckerIntervalMilliseconds;

        if(argv.dev) {
            this.mpCheckerIntervalTime = 0.5 * 60 * 1000; // 30 seconds
            this.locationCheckerIntervalTime = 0.5 * 60 * 1000; // 30 seconds
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

    // INITIALIZATION OF VT-RPC //
    init() {
        this.bindETCarsEvents();
        this.etcars.connect();
    }

    // ETCARS FUNCTIONS //
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

                            instance.timestamp = Date.now()

                            if (!instance.checkIfMultiplayer(data)){
                                instance.startLocationChecker();

                                if (argv.dev) {
                                    instance.checkLocationInfo();
                                }
                            }

                            // creating a new Discord RPC Client instance
                            instance.rpc = new DiscordRPC.Client({
                                transport: 'ipc'
                            })

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
                            instance.startMPChecker();
                            instance.checkMpInfo();
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
            promodsNotify.notifyUser();
        });

        this.etcars.on('error', function (data) {
            instance.resetETCarsData();
            instance.destroyRPCClient();
            instance.resetMPChecker();
            instance.resetLocationChecker();
        });
    }

    // EXTERNAL FUNCTIONS //
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
        this.mpStatsInfo = null;
        this.locationInfo = null;
    }

    resetMPChecker() {
        if (this.mpCheckerInterval != null) {
            clearInterval(this.mpCheckerInterval);
            this.mpCheckerInterval = null;
            this.mpInfo = null;
            this.locationInfo = null;
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

    checkIfMultiplayer(data) {
        return data.telemetry && data.telemetry.game && data.telemetry.game.isMultiplayer && data.telemetry.user;
    }

    checkMpInfo() {

        var instance = this;

        if (this.lastData != null && this.checkIfMultiplayer(this.lastData)) {

            this.logger.info('Checking online status');

            var url = util.format('https://api.truckyapp.com/v1/richpresence/playerInfo?query=%s', this.lastData.telemetry.user.steamID);

            //console.log(url);
            fetch(url).then((body) => {
                return body.json()
            }).then((json) => {

                if (!json.error) {
                    try {
                        var response = json.response;
                        if (response.onlineState.online) {
                            instance.mpInfo = {
                                online: true,
                                server: response.onlineState.serverDetails,
                                apiserverid: response.onlineState.serverDetails.apiserverid,
                                playerid: response.onlineState.p_id,
                                mod: response.onlineState.serverDetails.mod
                            };
                            instance.locationInfo = {
                                location: response.onlineState.location.poi.realName,
                                inCity: response.onlineState.location.area
                            }
                        } else {
                            instance.mpInfo = {
                                online: false,
                                server: false,
                                apiserverid: false,
                                playerid: false,
                                mod: false
                            }
                            instance.locationInfo = {
                                location: false,
                                inCity: false
                            };
                        };
                    }
                    catch (error) {
                        instance.logger.error(error);
                    }
                } else {
                    instance.mpInfo = null;
                }
            });
        }
    }

    checkLocationInfo() {
        var instance = this;
        if (this.lastData.status == "TELEMETRY") {
            if(this.lastData.telemetry.truck.worldPlacement.x == "0") { 
                instance.locationInfo = {
                    location: false,
                    inCity: null,
                };
            } else {
                this.logger.info('Checking location');
            
                var url = util.format('https://api.truckyapp.com/v2/map/%s/resolve?x=%s&y=%s', this.lastData.telemetry.game.gameID, this.lastData.telemetry.truck.worldPlacement.x, this.lastData.telemetry.truck.worldPlacement.z);
        
                //console.log(url);
                fetch(url).then((body) => {
                    return body.json()
                }).then((json) => {
            
                    if (!json.error) {
                        var response = json.response;
                            instance.locationInfo = {
                                location: response.poi.realName,
                                inCity: response.area,
                            };
                    } else {
                        instance.locationInfo = {
                            location: false,
                            inCity: null,
                        };
                    }
                });
            }
        } else {
            instance.locationInfo = {
                location: false,
                inCity: null,
            };
        }
    }

    // DISCORD ACTIVITY //
    buildActivity(data) {
        var activity = null;

        if (typeof data.telemetry != 'undefined' && data.telemetry) {
            activity = {};

            if(data.telemetry.truck.make == false) {
                this.gameLoading = true;
            } else {
                this.gameLoading = false;
            }

            var speed = data.telemetry.truck.speed;
                
            activity.smallImageText = `${data.telemetry.truck.make} ${data.telemetry.truck.model} - ${this.calculateDistance(data.telemetry.truck.odometer, this.isAts(data))} ${this.getDistanceUnit(this.isAts(data))}`;

            
            if(!this.gameLoading) {
                if (config.supportedBrands.includes(data.telemetry.truck.makeID.toLowerCase())) {
                activity.smallImageKey = `${config.constants.brandPrefix}${data.telemetry.truck.makeID}`;
                } else {
                    activity.smallImageKey = config.constants.brandGenericKey;
                }
            }
            
            activity.details = '';
            activity.state = '';
            activity.startTimestamp = this.timestamp;

            if (typeof data.telemetry.job != 'undefined' && data.telemetry.job && data.telemetry.job.onJob === true) {
                if (data.telemetry.job.sourceCity != null){
                    activity.details += `🚚 ${data.telemetry.job.sourceCity} > ${data.telemetry.job.destinationCity} | ${data.telemetry.truck.make} ${data.telemetry.truck.model}`;
                } else {
                    activity.details += `🚧 Special Transport | ${data.telemetry.truck.make} ${data.telemetry.truck.model}`
                }
            } else {
                if (this.gameLoading) {
                    activity.details += `🕗 Loading game...`
                } else {
                    activity.details += `🚛 Freeroaming | ${data.telemetry.truck.make} ${data.telemetry.truck.model}`;
                }
            }

            if (!this.gameLoading && data.telemetry.truck.engineEnabled == true) {
                activity.details += util.format(` at ${this.calculateSpeed(speed, this.isAts(data))}${this.getSpeedUnit(this.isAts(data))}`);
            }

            activity.largeImageText = `VT-RPC v2.8.4`;
            activity.largeImageKey = this.getLargeImageKey(data);

            if (this.mpInfo != null && this.mpInfo.online != false) {
                activity.state += util.format('🌐 %s', this.mpInfo.server.name);
                activity.largeImageText += util.format(' | ID: %s', this.mpInfo.playerid)
            } else if (data.telemetry.game.isMultiplayer == true) {
                activity.state = `🌐 TruckersMP`;
            } else {
                activity.state = '🌐 Singleplayer';
            }


            if (this.locationInfo != null && this.locationInfo.inCity == true) {
                this.inCityDetection = 'At';
            } else if (this.locationInfo != null && this.locationInfo.inCity == false) {
                this.inCityDetection = 'Near';
            } else {
                this.inCityDetection = null;
            }

            if (this.locationInfo && this.inCityDetection && this.locationInfo.location && this.locationInfo.location != null) {
                activity.state += util.format(' - %s %s', this.inCityDetection, this.locationInfo.location);
            }

            if (argv.logallactivity) {
                console.log(activity);
            }
        }

        return activity;
    }

    getLargeImageKey(data) {
        var prefix = config.constants.ets2LargeImagePrefix;
        var key = '';

        if(this.mpInfo != null) {
            if(this.mpInfo.mod == "promods" || argv.promods) {
                prefix = config.constants.promodsLargeImagePrefix;
            }
        }
        

        if (this.isAts(data)) {
            prefix = config.constants.atsLargeImagePrefix;
        }
			
        if (key == '') {
            if (this.gameLoading) {
                key = config.constants.largeImageKeys.idle;
            }  else {
                key = config.constants.largeImageKeys.active;
            }
        }

        //console.log(key);
        return prefix + key;
    }

    isAts(data) {
        return data.telemetry.game.gameID == config.constants.ats;
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

    getDistanceUnit(isAts) {

        if (isAts)
            return config.milesString;

        if (clientConfiguration.configuration.distanceUnit == config.constants.km)
            return config.kmString;
        else
            return config.milesString;
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
}

module.exports = RichPresenceManager;