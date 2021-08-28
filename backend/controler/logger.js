var fs = require("fs");

var Logger = (exports.Logger = {});

try {
    var infoStream = fs.createWriteStream("./logs/info.txt", {flags: 'a'});

    var errorStream = fs.createWriteStream("./logs/error.txt", {flags: 'a'});

    var debugStream = fs.createWriteStream("./logs/debug.txt", {flags: 'a'});

    console.log("[+] created logs...");
    debug("Log files created.");
    
} catch (error) {
    console.log("ERROR: Cannot create log files..." + error);
    
}


Logger.info = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  infoStream.write(message);
};

function debug(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  debugStream.write(message);
};

Logger.error = function(msg) {
  var message = new Date().toISOString() + " : " + msg + "\n";
  errorStream.write(message);
};

Logger.debug = debug;