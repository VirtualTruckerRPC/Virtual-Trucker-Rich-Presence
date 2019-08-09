// VIRTUAL TRUCKER RICH PRESENCE 2.75

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

        this.logger.info('Check for update...');

        fetch(config.latestReleaseAPIUrl).then((body) => {
            return body.json();
        }).then((response) => {

            instance.logger.info(`Current version: ${packageInfo.version}, Stable release: ${response.tag_name}`);

            if (packageInfo.version < response.tag_name && !response.prerelease) {

                instance.logger.info('Sending notification');

                notifier.notify({
                        title: 'Virtual Trucker Rich Presence',
                        message: `Update Available: v${response.tag_name} ⚠`,
                        icon: (__dirname, 'assets/vtrpc.ico'),
                        sound: 'Notification.Reminder',
                        wait: true,
                        open: config.latestReleasePage,
                        appID: `VT-RPC v${packageInfo.version}`, 
                        button1: 'Update',
                        button2: 'Ignore',
                        
                    },
                    function (err, response) {
                        // Response is response from notification

                        if (err) {
                            instance.logger.info('Notification sent with error');
                            instance.logger.error(err)
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