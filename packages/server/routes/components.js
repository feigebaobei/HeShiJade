var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {appsDb, componentsDb} = require('../mongodb');
const { rules } = require('../helper');
// let md5 = require('md5');
let clog = console.log

router.use(bodyParser.json())

router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  if (req.session.isAuth) {
    let {user} = req.session
    clog('user', user)
    res.status(200).json({
        code: 0,
        message: '',
        data: [
            {
                name: 'button',
                type: 'Button',
                ulid: '12345asdfg'
            },
            {
                name: 'model',
                type: 'Model',
                ulid: '12345asdfg2'
            },
            {
                name: 'form',
                type: 'Form',
                ulid: '12345asdfge'
            },
            {
                name: 'table',
                type: 'Table',
                ulid: '12345asdfgs'
            },
        ]
    })
    // let result = appsDb.collection('apps').find({ members: {$elemMatch: {$eq: user.account}} })
    // result.toArray().then(r => {
    //   res.status(200).json({
    //       code: 0,
    //       message: '',
    //       data: r
    //   })
    // }).catch(error => {
    //   res.status(200).json({
    //     code: 200200,
    //     message: "数据库出错",
    //     data: error,
    //   })
    // })
  } else {
    res.status(401).json({
      code: 300000,
      message: '用户未登录',
      data: {}
    })
  }
})
.post(cors.corsWithOptions, (req, res) => {
    if (rules.required(req.body.key) && rules.required(req.body.name) && rules.required(req.body.ulid) && rules.isArray(req.body.members)) {
        appsDb.collection('apps').insertOne({
            key: req.body.key,
            name: req.body.name,
            ulid: req.body.ulid,
            members: req.body.members,
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
router.route('/listByPage')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  if (req.session.isAuth) {
    let {user} = req.session
    clog('user', user)
    res.status(200).json({
        code: 0,
        message: '',
        data: [
            {
              ulid: '01H98Q2H3ZRAZ83M8E33ERDMDA',
              type: 'Button',
              next: '',
              prev: '',
              props: {
                bsStyle: "danger"
              },
              // behaivor: {
              //   // click: ""
              // },
              // item: '',
              // slot: '',
              appUlid: '01H90VXCNB7SQZCTEQDTN06FPR',
              pageUlid: '01H98Q2H3ZRAZ83M8E33ERDMDE',
            },
        ]
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
  // res.send('post')
  // 先做成保存到数据库的。
  componentsDb.collection('components').insertOne({
    ulid: req.body.ulid,
    type: req.body.type,
    next: '',
    prev: '',
    props: req.body.props,
    behaivor: req.body.behaivor,
    item: req.body.item,
    slot: req.body.slot,
    appUlid: req.body.appUlid,
    pageUlid: req.body.pageUlid,
  }).then(() => {
    res.status(200).json({
      code: 0,
      message: 'ok',
      data: {},
    })
  }).catch(error => {
    res.status(200).json({
      code: 200200,
      message: "保存时出错",
      data: error
    })
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

module.exports = router;
