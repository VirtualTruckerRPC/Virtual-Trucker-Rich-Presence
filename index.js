// VIRTUAL TRUCKER RICH PRESENCE 2.82

const LogManager = require('./LogManager');
const logger = new LogManager(); 
const config = require('./config');
const packageInfo = require('./package.json');
const argv = require('yargs').argv
const UpdateNotifier = require('./UpdateNotifier');
const ProModsNotifier = require('./ProModsNotifier');

logger.info('Rich Presence plugin starting');
logger.info(`Version: ${packageInfo.version}`);
logger.info(`Platform: ${process.platform}`);
logger.info('Startup parameters:');
logger.info(argv)

var RichPresenceManager = require('./RichPresenceManager');
var presenceManager = new RichPresenceManager();
presenceManager.init();

var updateChecker = new UpdateNotifier();
updateChecker.checkUpdates();

var promodsNotify = new ProModsNotifier();
promodsNotify.notifyUser();


// maintain node process running
process.stdin.resume();