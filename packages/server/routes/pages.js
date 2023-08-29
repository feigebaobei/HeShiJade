var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {pagesDb, appsDb} = require('../mongodb');
const { rules, resParamsError } = require('../helper');
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
      // 取出指定应用的数据app
      // 使用app.lastPageUlid创建page
        appsDb.collection('apps').findOne({ulid: req.body.appUlid}).then(app => {
          if (app) {
            return app
          } else {
            return Promise.reject({
              code: 400000, message: '指定应用不存在', 
              know: true // 是否已知
            })
          }
        }).then(app => {
          return pagesDb.collection('pages').insertOne({
            key: req.body.key,
            name: req.body.name,
            ulid: req.body.ulid,
            prevUlid: app.lastPageUlid,
            nextUlid: '',
            childUlid: '',
            firstComponentUlid: '',
            lastComponentUlid: '',
            appUlid: req.body.appUlid,
          })
        })
        .then(() => {
            return res.status(200).json({
              code: 0,
              message: "ok",
              data: {},
            })
        }).catch((obj) => {
          if (obj.know) {
            res.status(200).json({
              code: obj.code,
              message: obj.message,
              data: {},
            })
          } else {
            res.status(200).json({
              code: 200200,
              message: "数据库出错",
              data: obj,
            })
          }
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
  // 检验参数
  // 是否有权限
  // 删除
  // if () {}
  if(rules.required(req.body.appUlid) && req.body.pageUlid) {
    if (req.session.user.applications.includes(req.body.appUlid)) {
      appsDb.collection('apps').findOne({ulid: req.body.appUlid}).then(app => {
        if (app) {
          return pagesDb.collection('pages').findOne({ulid: req.body.pageUlid})
        } else {
          return Promise.reject({
            code: 400000,
            message: '应用不存在',
            know: true,
          })
        }
      }).then((page) => {
        if (page) {
          // 修改2个
          // 删除1个
          return pagesDb.collection('pages').bulkWrite({
            updateOne: {
              filter: {ulid: page.prevUlid},
              update: {nextUlid: page.nextUlid}
            },
            updateOne: {
              filter: {ulid: page.nextUlid},
              update: {prevUlid: page.prevUlid}
            },
            deleteOne: {
              filter: {ulid: pageUlid}
            }
          })
        } else {
          return Promise.reject({
            code: 500000,
            message: '页面不存在',
            know: true,
          })
        }
      }).then(() => {
        return res.status(200).json({
          code: 0,
          message: '',
          data: {}
        })
      }).catch(obj => {
        if (obj.know) {
          res.status(200).json({
            code: obj.code,
            message: obj.message,
            data: {},
          })
        } else {
          res.status(200).json({
            code: 200200,
            message: "数据库出错",
            data: obj,
          })
        }
      })
    } else {
      resParamsError(res)
    }
  } else {
    resParamsError(res)
  }

})

module.exports = router;
