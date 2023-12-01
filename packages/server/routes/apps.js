var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {appsDb, usersDb,
  lowcodeDb,
} = require('../mongodb');
const { rules, auth, } = require('../helper');
const { errorCode } = require('../helper/errorCode');

// let md5 = require('md5');
let clog = console.log

router.use(bodyParser.json())

// 操作应用列表
router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
// 取得应用列表
.get(cors.corsWithOptions, auth, (req, res) => {
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
      // clog('applist', appList)
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
  // 检查参数
  // 取session.user
  // 为user设置first/last
  // 创建应用
  new Promise((s, j) => {
    if (rules.required(req.body.key) &&
    rules.required(req.body.name) &&
    rules.required(req.body.ulid) &&
    rules.required(req.body.prevUlid) &&
    rules.required(req.body.collaborator)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    if (req.session.isAuth) {
      return 
    } else {
      return Promise.reject(100130)
    }
  }).then(() => {
    clog('req', req.session.user)
    return lowcodeDb.collection('users').findOne({ulid: req.session.user.ulid}).then((user) => {
      return user
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).then((user) => {
    clog(user)
    // 是否有应用
    if (user.firstApplicationUlid) {
      let p1 = lowcodeDb.collection('users').updateOne({
        ulid: user.ulid
      }, {
        $set: { lastApplicationUlid: req.body.ulid }
      })
      let p2 = lowcodeDb.collection('apps_dev').bulkWrite([
        {
          updateOne: {
            filter: {ulid: req.body.prevUlid},
            update: {
              $set: {nextUlid: req.body.ulid},
            },
          },
        },
        {
          insertOne: {
            document: {
              key: req.body.key,
              name: req.body.name,
              ulid: req.body.ulid,
              theme: req.body.theme,
              version: req.body.version || 0, // todo 只增加
              owner: user.ulid,
              collaborator: req.body.collaborator,
              firstPageUlid: '',
              lastPageUlid: '',
              prevUlid: req.body.prevUlid,
              nextUlid: '',
            }
          },
        }
      ])
      return Promise.all([p1, p2]).then(([r1, r2]) => {
        return [r1, r2]
      }).catch((e) => {
        clog('sdfsdf', e)
        return Promise.reject(200000)
      })
    } else {
      // 设置最后一个应用
      // 创建应用
      let p1 = lowcodeDb.collection('users').updateOne({
        ulid: req.session.user.ulid
      }, {
        $set: {
          firstApplicationUlid: req.body.ulid,
          lastApplicationUlid: req.body.ulid
        }
      })
      let p2 = lowcodeDb.collection('apps_dev').insertOne({
        key: req.body.key,
        name: req.body.name,
        ulid: req.body.ulid,
        theme: req.body.theme,
        version: 0,
        owner: user.ulid,
        collaborator: req.body.collaborator,
        firstPageUlid: '',
        lastPageUlid: '',
        prevUlid: '',
        nextUlid: '',
      })
      return Promise.all([p1, p2]).then(([r1, r2]) => {
        return [r1, r2]
      }).catch((e) => {
        clog('234234', e)
        return Promise.reject(200000)
      })
    }
  }).then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  }).catch(code => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {},
    })
  })
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
