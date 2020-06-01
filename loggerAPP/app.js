const dotenv = require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var fs = require('fs')
var uuid = require('node-uuid')
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var logger = require('./util/winston');
 
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(assignId)


morgan.token('id', function getId (req) {
  return req.id
})

app.use(morgan("combined", { "stream": logger.stream }));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

logger.info('logging with .info method', { message: 'world' });
logger.log('info','logging with .log method', {"name":"Joe"});
logger.debug('logging with .info method', { message: 'world' });
logger.error('logging with .error method', new Error('hello'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

   // add this line to include winston logging
   logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

     // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function assignId (req, res, next) {
  req.id = uuid.v4()
  next()
}


module.exports = app;
