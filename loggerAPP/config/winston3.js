const winstonConfig = require('./winston-config');

 const winston = require('winston');

 let defaultLogger = winstonConfig.defaultLogger;
 defaultLogger.info('Beginning program execution...');

 const MODULE = 'example-9';

 winston.loggers.add(MODULE, winstonConfig.createLoggerConfig(MODULE));
 const moduleLogger = winston.loggers.get(MODULE);

 moduleLogger.info('Howdy, Winston!');
 moduleLogger.warn('WARNING, Winston!');
 moduleLogger.error('ERROR, Winston!');

 const FOO = 'foo';
 const BAR = 'bar';

 winston.loggers.add(FOO, winstonConfig.createLoggerConfig(FOO));
 winston.loggers.add(BAR, winstonConfig.createLoggerConfig(BAR));

 const fooLogger = winston.loggers.get(FOO);
 fooLogger.info('Howdy, Winston!');

 const barLogger = winston.loggers.get(BAR);
 barLogger.info('Howdy, Winston!');

 defaultLogger.info('Program terminated.');