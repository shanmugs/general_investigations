const winston = require("winston");
const os = require('os'); 
var appRoot = require("app-root-path");
const MESSAGE = Symbol.for("message");


const APP_NAME = process.env.APP_NAME || "APP_NAME";
const NODE_ENV = process.env.NODE_ENV || "NODE_ENV";
const HOST = process.env.HOST || os.hostname();
const LOG_CATEGORY = process.env.LOG_CATEGORY || "API";
const LOG_LEVEL = process.env.LOG_LEVEL || "error";

// console.log("**********APP_NAME************** "+process.env.APP_NAME)
// console.log("**********LOG_LEVEL************** "+process.env.LOG_LEVEL)


var options = {
  file: {
    level: LOG_LEVEL,
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level:LOG_LEVEL,
    handleExceptions: true,
    json: true,
    colorize: true
  }
};


const jsonFormatter = logEntry => {
  const base = {
    timestamp: new Date().toUTCString(),
    app: APP_NAME,
    env: NODE_ENV,
    host: HOST,
    category:LOG_CATEGORY,
    level:logEntry.level
   };
  const json = Object.assign(base, {log:logEntry});{"timestamp":"Mon, 01 Jun 2020 04:24:24 GMT","app":"loggerAPP","env":"development","host":"sathish-s","category":"API","level":"info","log":{"message":"::1 - - [01/Jun/2020:04:24:24 +0000] \"GET / HTTP/1.1\" 304 - \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36\"\n","level":"info"}}
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format(jsonFormatter)(),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: function(message, encoding){
      logger.info(message);
  }
};


module.exports = logger;

 

// testing

//  logger.info("message content", { context: "index.js", metric: 1 });
//  logger.info("message content 2");
//  let x = {
//    a: "hello",
//    b: "belloo",
//    c: { xz: "cccc" }
//  };

//  logger.info(x);

// let err = new Error("error message");
// err.code = "505";
// logger.error("error message: ", err);

// logger.warn("warnwarnwarnwarnwarn");
// logger.info("infoinfoinfoinfoinfo");
// logger.debug("debugdebugdebugdebug");
