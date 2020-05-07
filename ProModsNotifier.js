// VIRTUAL TRUCKER RICH PRESENCE

const notifier = require('node-notifier');
const config = require('./config');
const packageInfo = require('./package.json');
const LogManager = require('./LogManager');
const argv = require('yargs').argv

class ProModsNotifier {
    constructor() {
        this.logger = new LogManager();
    }

    notifyUser() {
        if(argv.promods) {
            var instance = this;
            this.logger.info('ProMods Mode Enabled... Sending Notification');

            notifier.notify({
                title: 'Virtual Trucker Rich Presence',
                message: `ProMods Mode Enabled ⚠`,
                icon: (__dirname, 'assets/vtrpc.ico'),
                sound: true,
                wait: true,
                appID: `VTRPC v${packageInfo.version}`, 
            });
        }
    }
}

module.exports = ProModsNotifier;