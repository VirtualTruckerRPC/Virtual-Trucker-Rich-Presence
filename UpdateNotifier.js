// VIRTUAL TRUCKER RICH PRESENCE 2.61

var fetch = require('node-fetch');
const notifier = require('node-notifier');
const config = require('./config');
const packageInfo = require('./package.json');
const LogManager = require('./LogManager');
const opn = require('open');

class UpdateNotifier {
    constructor() {
        this.logger = new LogManager();
    }

    checkUpdates() {

        var instance = this;

        this.logger.info('Checking updates..');

        fetch(config.latestReleaseAPIUrl).then((body) => {
            return body.json();
        }).then((response) => {

            instance.logger.info(`Current version: ${packageInfo.version}, Latest release: ${response.tag_name}`);

            if (packageInfo.version != response.tag_name && !response.prerelease) {

                instance.logger.info('Sending notification');

                notifier.notify({
                        title: 'Virtual Trucker Rich Presence',
                        message: `Update Available! Version: ${response.tag_name}`,
                        icon: (__dirname, 'assets/vtrpc.ico'),
                        sound: true, // Only Notification Center or Windows Toasters
                        wait: false, // Wait with callback, until user action is taken against notification,    
                        open: config.latestReleasePage,
                        appId: 'Virtual Trucker Rich Presence',                     
                    },
                    function (err, response) {
                        // Response is response from notification

                        if (err) {
                            instance.logger.info('Notification sent with error');
                        }
                        else
                            instance.logger.info('Notification sent');
                    }
                );

                notifier.on('click', function (notifierObject, options) {
                    // Triggers if `wait: true` and user clicks notification
                    opn(options.open);
                });

                notifier.on('timeout', function (notifierObject, options) {
                    // Triggers if `wait: true` and notification closes
                });
            }
        });
    }
}

module.exports = UpdateNotifier;