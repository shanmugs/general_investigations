const winston = require('winston');

const { splat, combine, timestamp, printf } = winston.format;



// meta param is ensured by splat()
const myFormat = printf(({ timestamp, level, message, meta }) => {
    console.log(meta)
  return `${timestamp};${level};${message};${ meta? JSON.stringify(meta) : ''}`;
});

const logger = winston.createLogger({
    
  format: combine(
    timestamp(),
    splat(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});


  // Returns if a value is an object
  function isObject (value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

// Returns if value is an error object
function isError (value) {
    return value instanceof Error && typeof value.message !== 'undefined';
    }

//   // Create the logger
//   let x = {
//     a:'hello',
//     b:'belloo',
//     c:{'xz':'cccc'}
// }

// console.log(isObject(x))
// logger.info('Howdy, Winston!');

// logger.info("hello",{x});

// let err = new  Error('error message');
// err.code ="505"
// logger.error('error message: ', err);

// console.log(isError(err))

// logger.warn('message');
// logger.info('message');
// logger.debug('message');


const test = { t: 'test', array: [1, 2, 3] };
// NOTE: wrapping object name in `{...}` ensures that JSON.stringify will never 
// return an empty string e.g. if `test = 0` you won't get any info if 
// you pass `test` instead of `{ test }` to the logger.info(...)
logger.info('your message',  test );
// logger output:
// 2018-09-18T20:21:10.899Z;info;your message;{"test": {"t":"test","array":[1,2,3]}}