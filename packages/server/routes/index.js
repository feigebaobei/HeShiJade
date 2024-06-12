var express = require('express');
var router = express.Router();

const { logger } = require('../helper/log')

/* GET home page. */
router.get('/', function(req, res, next) {
  logger.debug('debug')
  logger.info('hi')
  logger.info({k: 2, b: true, a: 'str', name: 'hi'})
  logger.info({k: 2, b: true, a: 'str', name: 'hi'}, 'other str')
  logger.error('error')
  res.render('index', { title: 'Express' });
});

module.exports = router;
