// 这个文件中为开发时调试使用的。
var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {pagesDb, appsDb, lowcodeDb} = require('../mongodb');
const { rules, resParamsError } = require('../helper');
const { errorCode } = require('../helper/errorCode');
// let md5 = require('md5');
let clog = console.log

router.use(bodyParser.json())

router.route('/temporary')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.send('get')
})
.post(cors.corsWithOptions, (req, res) => {
  res.send('post')
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
// 清空
.delete(cors.corsWithOptions, (req, res) => {
  return lowcodeDb.collection('temporary').deleteMany({key: '01HZXE7NPM8GCZYB9TWXZVFBNA_test'}).then(() => {
    res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  }).catch(() => {
    res.status(200).json({
      code: 1,
      message: '',
      data: {}
    })
  })
  
})

module.exports = router;
