var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {appsDb, usersDb} = require('../mongodb');
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
    let result = appsDb.collection('apps').find({ members: {$elemMatch: {$eq: user.account}} })
    result.toArray().then(r => {
      return res.status(200).json({
          code: 0,
          message: '',
          data: r
      })
    }).catch(error => {
      return res.status(200).json({
        code: 200200,
        message: "数据库出错",
        data: error,
      })
    })
  } else {
    return res.status(401).json({
      code: 300000,
      message: '用户未登录',
      data: {}
    })
  }
})
.post(cors.corsWithOptions, (req, res) => {
  if (req.session.isAuth) {
    if (rules.required(req.body.key) && 
      rules.required(req.body.name) && 
      rules.required(req.body.ulid) && 
      rules.isArray(req.body.members)
    ) {
        // 保存应用
        let version = req.body.version || 0
        let members = req.body.members.slice(0, 4)
        // let cApp = appsDb.collection('apps').insertOne({
        //     key: req.body.key,
        //     name: req.body.name,
        //     ulid: req.body.ulid,
        //     theme: req.body.theme,
        //     version,
        //     owner: req.session.user.account,
        //     members: req.body.members.slice(0, 4), // 最多有4个人。可优化为配置项。
        //     firstPageUlid: '',
        //     prevUlid: req.session.user.applications[req.session.user.applications.length - 1] || '',
        //     nextUlid: '',
        // })
        let lastAppUlid = req.session.user.applications[req.session.user.applications.length - 1]
        let appObj = [
          {
            updateOne: {
              filter: {ulid: lastAppUlid},
              update: {
                $set: {nextUlid: req.body.ulid}
              }
            }
          },
          {
            insertOne: {
              document: {
                key: req.body.key,
                name: req.body.name,
                ulid: req.body.ulid,
                theme: req.body.theme,
                version,
                owner: req.body.owner,
                members,
                firstPageUlid: '',
                prevUlid: lastAppUlid,
                nextUlid: ''
              }
            }
          }
        ]
        let cApp = appsDb.collection('apps').bulkWrite(appObj)
        // 修改用户表中的数据
        // let curUser = req.session.user
        // let eUser = usersDb.collection('users').updateOne({
        //   account: curUser.account,
        // }, {$push: {applications: req.body.ulid}})
        // insertOne
        // replaceOne
        // updateOne
        // updateMany
        // deleteOne
        // deleteMany
        let objArr = req.body.members.map(item => {
          return {
            updateOne: {
              filter: { account: item },
              update: { $addToSet: { applications: req.body.ulid }},
            }
          }
        })
        clog('boj', objArr)
        let eUser = usersDb.collection('users').bulkWrite(objArr)
        // todo 修改所有用户的applications
        Promise.all([cApp, eUser])
        .then(() => {
          return res.status(200).json({
            code: 0,
            message: "ok",
            data: {},
          })
        }).catch((error) => {
          appsDb.collection('apps').deleteOne({ulid: req.body.ulid})
          usersDb.collection('users').updateOne({account: req.session.user.account}, {
            $set: {applications: req.session.user.applications}
          })
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
  } else {
    res.status(401).json({
      code: 300000,
      message: '用户未登录',
      data: {}
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
