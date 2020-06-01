const {createLogger, format} = require('winston');
const winston = require('winston');
var appRoot = require('app-root-path');

var options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true,
    },
  };

// instantiate a new Winston Logger with the settings defined above
var logger = createLogger({

    format: format.combine(
      format.timestamp(),
      // format.timestamp({format:'MM/DD/YYYY hh:mm:ss.SSS'}),
      format.json(),
      format.printf(info => {
        return `${info.timestamp} [${info.level}] : ${info.message}`;
      })
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});


const test = { t: 'test', array: [1, 2, 3] };
// NOTE: wrapping object name in `{...}` ensures that JSON.stringify will never 
// return an empty string e.g. if `test = 0` you won't get any info if 
// you pass `test` instead of `{ test }` to the logger.info(...)
logger.info('your message',  test );
// logger output:
// 2018-09-18T20:21:10.899Z;info;your message;{"test": {"t":"test","array":[1,2,3]}}