var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {appsDb, usersDb,
  lowcodeDb,
} = require('../mongodb');
const { rules } = require('../helper');
// let md5 = require('md5');
let clog = console.log

router.use(bodyParser.json())

// 操作应用列表
router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
// 取得应用列表
.get(cors.corsWithOptions, (req, res) => {
  if (true) {
    // usersDb.collection('users').findOne({acco/unt: req.})
    let curUser = {
      account: '123@qq.com',
      password: '123456',
      // passwordHash: md5('123456'),
      firstApplicationUlid: '',
    }
    // let appList = 
    lowcodeDb.collection('apps_dev').find({
      owner: curUser.account
    }).toArray().then(appList => {
      clog('applist', appList)
      return res.status(200).json({
        code: 0,
        message: '',
        data: appList,
      })
    }).catch(error => {
      return res.status(200).json({
        code: 2002002,
        message: '数据库出错',
        data: error
      })
    })
  } else {
    return res.status(403).json({
      code: 300000,
      message: '无权限',
      data: {}
    })
  }
})
// 创建应用
.post(cors.corsWithOptions, (req, res) => {
  let curUser = {
    account: '123@qq.com',
    password: '123456',
    // passwordHash: md5('123456'),
    firstApplicationUlid: '',
    lastApplicationUlid: '',
  }
  // 日后同单点登录系统完成
  if (true) {
    if (rules.required(req.body.key) && 
      rules.required(req.body.name) && 
      rules.required(req.body.ulid) && 
      rules.required(req.body.prevUlid) && 
      rules.isArray(req.body.collaborator)
    ) {
        // 保存应用
        let version = req.body.version || 0
        let collaborator = req.body.collaborator.slice(0, 4)
        
        let userP, appP
        if (!curUser.firstApplicationUlid) {
          userP = usersDb.collection('users').updateOne({account: curUser.account},
            {$set: {
              firstApplicationUlid: req.body.ulid,
              lastApplicationUlid: req.body.ulid,
            }})
        } else {
          userP = Promise.resolve()
        }
        appP = lowcodeDb.collection('apps_dev').insertOne({
          key: req.body.key,
          name: req.body.name,
          ulid: req.body.ulid,
          theme: req.body.theme,
          version,
          // owner: req.session.user.account,
          owner: curUser.account,
          collaborator: req.body.collaborator,
          firstPageUlid: '',
          lastPageUlid: '',
          prevUlid: req.body.prevUlid,
          nextUlid: '',
        })
        Promise.all([userP, appP])
        .then((app) => {
          return res.status(200).json({
            code: 0,
            message: "ok",
            data: app,
          })
        }).catch((error) => {
          res.status(200).json({
            code: 200200,
            message: "数据库出错",
            data: error,
          })
        })
        // // 修改用户表中的数据
        // // insertOne
        // // replaceOne
        // // updateOne
        // // updateMany
        // // deleteOne
        // // deleteMany
        // let objArr = req.body.collaborator.map(item => {
        //   return {
        //     updateOne: {
        //       filter: { account: item },
        //       update: { $addToSet: { applications: req.body.ulid }},
        //     }
        //   }
        // })
        // clog('boj', objArr)
        // let eUser = usersDb.collection('users').bulkWrite(objArr)
        // // todo 修改所有用户的applications
        // Promise.all([cApp, eUser])
        // .then(() => {
        //   return res.status(200).json({
        //     code: 0,
        //     message: "ok",
        //     data: {},
        //   })
        // }).catch((error) => {
        //   appsDb.collection('apps').deleteOne({ulid: req.body.ulid})
        //   usersDb.collection('users').updateOne({account: req.session.user.account}, {
        //     $set: {applications: req.session.user.applications}
        //   })
        //   res.status(200).json({
        //     code: 200200,
        //     message: "数据库出错",
        //     data: error,
        //   })
        // })
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

router.route('/detail')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  // res.send('put')
  appsDb.collection('apps').findOne({key: req.query.appKey}).then((app) => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: app
    })
  }).catch(() => {
    return res.status(200).json({
      code: 200200,
      message: "数据库出错",
      data: obj,
    })
  })
})
.post(cors.corsWithOptions, (req, res) => {
  res.send('post')
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

module.exports = router;
