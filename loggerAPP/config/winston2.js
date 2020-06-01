const app_root = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const winston = require('winston');


var logger = createLogger({
  format: format.combine(
    format(function(info, opts){
        console.log(`[${info.IP}]-[${info.Date}]-[${info.Path}]-[${info.Data}]`);
        return info;
    })(),
    format.json()

  ),

  transports: [
    new winston.transports.Console()
  ]
});


 // Create the logger
  logger.info('Howdy, Winston!');

 let err = new  Error('error message');
 err.code ="505"
 logger.error('error message: ', err);
   
logger.warn('message');
logger.info('message');
 logger.debug('message');
  
module.exports = logger;