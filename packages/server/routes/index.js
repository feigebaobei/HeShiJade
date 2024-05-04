var express = require('express');
var router = express.Router();

const { logger } = require('../helper/log')

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.debug('debug')
  logger.info('hi')
  logger.error('error')
  res.render('index', { title: 'Express' });
});

module.exports = router;
