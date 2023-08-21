var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {pagesDb} = require('../mongodb');
const { rules } = require('../helper');
// let md5 = require('md5');
let clog = console.log

router.use(bodyParser.json())

router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  clog('ses', req.session)
  if (req.session.isAuth) {
    // let {user} = req.session
    let result = pagesDb.collection('pages').find({ appUlid: req.query.appUlid })
    clog('result', result)
    result.toArray().then(r => {
      res.status(200).json({
          code: 0,
          message: '',
          data: r
      })
    }).catch(error => {
      res.status(200).json({
        code: 200200,
        message: "数据库出错",
        data: error,
      })
    })
  } else {
    res.status(401).json({
      code: 300000,
      message: '用户未登录',
      data: {}
    })
  }
})
.post(cors.corsWithOptions, (req, res) => {
    if (rules.required(req.body.key) && rules.required(req.body.name) && rules.required(req.body.ulid) && rules.required(req.body.appUlid)) {
      clog('req.body', req.body)
        pagesDb.collection('pages').insertOne({
            key: req.body.key,
            name: req.body.name,
            ulid: req.body.ulid,
            appUlid: req.body.appUlid,
            componentUlid: ''
        }).then((apps) => {
            res.status(200).json({
              code: 0,
              message: "ok",
              data: {},
            })
        }).catch((error) => {
        res.status(200).json({
            code: 200200,
            message: "数据库出错",
            data: error,
          })
        })
    } else {
        res.status(200).json({
          code: 100100,
          message: "请求参数错误",
          data: {},
        })
    }
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

module.exports = router;
