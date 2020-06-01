var appRoot = require('app-root-path');
var winston = require('winston');

const APP_NAME = 'APP_NAME';
const NODE_ENV = 'NODE_ENV';
const HOST = 'HOST.com';

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


var logger = new winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    //  format: winston.format.combine(
    //      winston.format.label({
    //          label: '\'host\':\''+ HOST + '\', \'env\':\'' + NODE_ENV + '\',\'app\':\'' + APP_NAME +'\''
    //      }),
    //      winston.format.timestamp(),
    //      winston.format.printf((info) => {

    //         let msg = isObject(info.message) ? JSON.stringify(info.message) : '\''+ info.message +'\''
  
    //          return `{ 'timestamp':'${info.timestamp}', ${info.label}, 'level':'${info.level}','message': ${msg} }`
                 
    //              //(isObject(`${info.message}`) ? JSON.stringify(`{info.message}`) :`${info.message}`);
    //      })
    //  ),
    exitOnError: false, // do not exit on handled exceptions
  });


  logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };


  // Returns if a value is an object
function isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

// Returns if value is an error object
function isError (value) {
    return value instanceof Error && typeof value.message !== 'undefined';
    }

   // Create the logger
   let x = {
       a:'hello',
       b:'belloo',
       c:{'xz':'cccc'}
   }

   console.log(isObject(x))
   logger.info('Howdy, Winston!');

   logger.info(x);
   
 let err = new  Error('error message');
   err.code ="505"
   logger.error('error message: ', err);
   
   console.log(isError(err))
   
  logger.warn('message');
  logger.info('message');
   logger.debug('message');

  module.exports = logger;

  


  
  /**
   
  const CloudWatchTransport = require('winston-aws-cloudwatch')

const logger = winston.createLogger({
  transports: [
    new CloudWatchTransport({
      logGroupName: '...', // REQUIRED
      logStreamName: '...', // REQUIRED
      createLogGroup: true,
      createLogStream: true,
      submissionInterval: 2000,
      submissionRetryCount: 1,
      batchSize: 20,
      awsConfig: {
        accessKeyId: '...',
        secretAccessKey: '...',
        region: '...'
      },
      formatLog: item =>
        `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
    })
  ]
})

const AwsCloudWatch = require('winston-aws-cloudwatch');

logger.add(new AwsCloudWatch(options));
///////  LogDNA
const logdnaWinston = require('logdna-winston');
const winston = require('winston');
const logger = winston.createLogger({});
const options = {
    key: apikey, // the only field required
    hostname: myHostname,
    ip: ipAddress,
    mac: macAddress,
    app: appName,
    env: envName,
    index_meta: true // Defaults to false, when true ensures meta object will be searchable
};

// Only add this line in order to track exceptions
options.handleExceptions = true;

logger.add(new logdnaWinston(options));

let meta = {
    data:'Some information'
};
logger.log('info', 'Log from LogDNA Winston', meta);


   */