var express = require('express');
var logger = require('../util/winston');
var util = require('../util/util.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  logger.debug(util.getLogObject("user_123","user_module","/users","GET","getUserFunction_route","log","request came in"));
  res.send('respond with a resource');

});

router.get('/err', function(req, res, next) {
  logger.error(util.getLogErrorObject("user_123","user_module","/users/err","GET","getUserFunction_route","error_alert","Database is down !!"));
  res.send('respond with a resource');

});

module.exports = router;
