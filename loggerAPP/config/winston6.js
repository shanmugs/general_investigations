const winston = require("winston");
var appRoot = require("app-root-path");
const MESSAGE = Symbol.for("message");

var options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: true,
    colorize: true
  }
};

const APP_NAME = process.env.APP_NAME || "APP_NAME";
const NODE_ENV = process.env.NODE_ENV || "NODE_ENV";
const HOST = process.env.HOST || "HOST";

const jsonFormatter = logEntry => {
  const base = {
    timestamp: new Date().toUTCString(),
    app: APP_NAME,
    env: NODE_ENV,
    host: HOST
  };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

const logger = winston.createLogger({
  level: "debug",
  format: winston.format(jsonFormatter)(),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

// testing

logger.info("message content", { context: "index.js", metric: 1 });
logger.info("message content 2");
let x = {
  a: "hello",
  b: "belloo",
  c: { xz: "cccc" }
};

logger.info(x);

let err = new Error("error message");
err.code = "505";
logger.error("error message: ", err);

logger.warn("warnwarnwarnwarnwarn");
logger.info("infoinfoinfoinfoinfo");
logger.debug("debugdebugdebugdebug");
