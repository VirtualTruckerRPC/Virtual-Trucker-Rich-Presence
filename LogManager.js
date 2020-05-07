// VIRTUAL TRUCKER RICH PRESENCE

const path = require('path');
const fs = require('fs');
const util = require('util');
const argv = require('yargs').argv
var dateFormat = require('dateformat');


var dateNow = new Date();
var dateStamp = dateFormat(dateNow, "yyyy-mm-dd HH-MM-ss");

module.exports = class LogManager {
    constructor() {
        this.logger = null;

        this.logDir = '';
        this.logFilePath = '';
        this.logFileName = util.format('%s.log', dateStamp)

        this.checkLogDirectory();
    }

    checkLogDirectory() {
        this.logDir = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : '/var/local');

        this.logDir = path.join(this.logDir, 'VirtualTruckerRichPresence');

        this.logFilePath = path.join(this.logDir, this.logFileName);

        if (!fs.existsSync(this.logDir)) {
            console.log('[Logger] Creating directory');
            fs.mkdirSync(this.logDir);
        }

        /*var stream = fs.createWriteStream(this.logFilePath, {
            flags: 'w'
        });
        stream.close();*/
        /*if (fs.existsSync(this.logFilePath)) {
            console.log('[Logger] Deleting previous log file');
            fs.unlinkSync(this.logFilePath);
            console.log('[Logger] Previous log file deleted');            
        }*/
    }

    openFile() {
        return fs.createWriteStream(this.logFilePath, {
            flags: 'a'
        });
    }

    closeFile(stream) {
        stream.close();
    }

    logLine(level, message) {
        var dateTIME = new Date();
        var dateLOG = dateFormat(dateTIME, "yyyy-mm-dd HH-MM-ss-L");
        return util.format('%s - %s - %s\n', dateLOG, level, typeof message === 'object' ? JSON.stringify(message) : message);
    }

    info(message) {
        var stream = this.openFile();
        stream.write(this.logLine('INFO', message));
        this.closeFile(stream);
        this.logToConsole(message);
    }

    debug(message) {
        var stream = this.openFile();
        stream.write(this.logLine('DEBUG', message));
        this.closeFile(stream);
        this.logToConsole(message);
    }

    error(exception) {
        var stream = this.openFile();
        stream.write(this.logLine('ERROR', exception.message));
        this.closeFile(stream);
        var stream = this.openFile();
        console.log('STACK TRACE: ' + exception.stack);
        stream.write(this.logLine('ERROR', exception.stack || exception));
        this.closeFile(stream);
        this.logToConsole(exception);
    }

    warn(message) {
        var stream = this.openFile();
        stream.write(this.logLine('WARN', message));
        this.closeFile(stream);
        this.logToConsole(message);
    }

    log(message) {
        var stream = this.openFile();
        stream.write(this.logLine('INFO', message));
        this.closeFile(stream);
        this.logToConsole(message);
    }

    logToConsole(message) {
        console.log(message);
    }
}
