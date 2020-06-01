 const winston = require('winston');
 // The Logger metadata (functional area)


 const APP_NAME = 'APP_NAME';
 const NODE_ENV = 'NODE_ENV';
 const HOST = 'HOST.com';



 // Logger configuration
 const logConfiguration = {
     transports: [
         new winston.transports.Console()
     ],
     format: winston.format.combine(
         winston.format.label({
             label: HOST + ' : ' + NODE_ENV + ' : ' + APP_NAME
         }),
         winston.format.timestamp(),
         winston.format.printf((info) => {
             return `${info.timestamp} - ${info.label} : [${info.level}] : ${info.message}`;
         })
     )
 };
 // Create the logger
 const logger = winston.createLogger(logConfiguration);
 logger.info('Howdy, Winston!');