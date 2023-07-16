var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {appsDb} = require('../mongodb');
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

// // 注册
// router.route('/sign')
// .options(cors.corsWithOptions, (req, res) => {
//   res.sendStatus(200)
// })
// .post(cors.corsWithOptions, (req, res) => {
//   if (rules.email(req.body.account) && rules.required(req.body.password)) {
//     // 是否已经注册
//     usersDb.collection('users').findOne({
//       account: req.body.account
//     }).then((userInfo) => {
//       res.status(200).json({
//         code: 100100,
//         message: "该用户已经存在",
//         data: {},
//       })
//       return
//     })
//     // 创建新用户
//     let mdp = md5(req.body.password)
//     usersDb.collection('users').insertOne({
//       account: req.body.account,
//       password: mdp,
//     }).then(() => {
//       res.status(200).json({
//         code: 0,
//         message: "ok",
//         data: {},
//       })
//     }).catch((error) => {
//       res.status(200).json({
//         code: 200000,
//         message: "保存数据时出错",
//         data: error,
//       })
//     })
//   } else {
//     res.status(200).json({
//       code: 100100,
//       message: "请求参数错误",
//       data: {},
//     })
//   }
// })

// // 登录
// router.route('/login')
// .options(cors.corsWithOptions, (req, res) => {
//   res.sendStatus(200)
// })
// .get(cors.corsWithOptions, (req, res) => {
//   res.status(200).json({
//     code: 0,
//     message: '',
//     data: {}
//   })
// })
// .post(cors.corsWithOptions, async (req, res) => {
//   // clog('req', req.body)
//   if (rules.email(req.body.account) && rules.required(req.body.password)) {
//     let mdp = md5(req.body.password)
//     usersDb.collection('users').findOne({
//       account: req.body.account,
//       password: mdp,
//     }).then((user) => {
//       req.session.user = user
//       req.session.isAuth = true
//       // clog('user', req.session)
//       req.session.save()
//       res.status(200).json({
//         code: 0,
//         message: "ok",
//         // data: req.session,
//         data: {}
//       })
//     }).catch(error => {
//       res.status(200).json({
//         code: 200200,
//         message: "ok",
//         data: error,
//       })
//     })
//   } else {
//     res.status(200).json({
//       code: 100100,
//       message: "请求参数错误",
//       data: {},
//     })
//   }
// })
// .put(cors.corsWithOptions, (req, res) => {
//   res.send('put')
// })
// .delete(cors.corsWithOptions, (req, res) => {
//   res.send('delete')
// })

// // 登出
// router.route('/logout')
// .options(cors.corsWithOptions, (req, res) => {
//   res.sendStatus(200)
// })
// .get(cors.corsWithOptions, (req, res) => {
//   res.status(200).json({
//     code: 0,
//     message: '',
//     data: {}
//   })
// })
// .post(cors.corsWithOptions, (req, res) => {
//   let user = req.session.user // for test
//   clog('session', req.session)
//   req.session.destroy();
//   res.status(200).json({
//     code: 0,
//     message: "ok",
//     data: user,
//   })
// })
// .put(cors.corsWithOptions, (req, res) => {
//   res.send('put')
// })
// .delete(cors.corsWithOptions, (req, res) => {
//   res.send('delete')
// })
module.exports = router;
