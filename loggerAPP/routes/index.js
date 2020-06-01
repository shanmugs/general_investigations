var express = require('express');
var logger = require('../util/winston');
var util = require('../util/util.js')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.debug(util.getLogObject("user_123","index_module","/","GET","getHello","log","request came in"));

  res.render('index', { title: 'Express' });
});

module.exports = router;
