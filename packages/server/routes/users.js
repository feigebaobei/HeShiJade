var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {usersDb} = require('../mongodb')
let { rules, instance } = require('../helper/index')
let md5 = require('md5');
let clog = console.log


router.use(bodyParser.json())

router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
// 得到指定用户的信息。
// 默认是当前用户。
.get(cors.corsWithOptions, (req, res) => {
  // clog('req', req.session)
  res.status(200).json({
    code: 0,
    message: '',
    // data: req.session
    data: {}
  })
})
.post(cors.corsWithOptions, (req, res) => {
  res.status(200).json({
    code: 0,
    message: "ok",
    data: {},
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

// 注册
router.route('/sign')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.post(cors.corsWithOptions, (req, res) => {
  if (rules.email(req.body.account) && rules.required(req.body.password)) {
    // 是否已经注册
    usersDb.collection('users').findOne({
      account: req.body.account
    }).then((user) => {
      if (user) {
        return res.status(200).json({
          code: 100100,
          message: "该用户已经存在",
          data: '',
        })
      } else {
        // 创建新用户
        let mdp = md5(req.body.password)
        usersDb.collection('users').insertOne({
          account: req.body.account,
          password: mdp,
          // applications: [],
          firstApplicationUlid: '', // 第一个应用的ulid
          lastApplicationUlid: '', // 第一个应用的ulid
        }).then(() => {
          // usersDb.collection('users').findOne({
          //   account: req.body.account,
          //   password: mdp,
          // }).then(user => {
          //   req.session.user = user
          //   req.session.isAuth = true
          //   req.session.save()
          //   return res.status(200).json({
          //     code: 0,
          //     message: "ok",
          //     data: {},
          //   })
          // })
          return res.status(200).json({
            code: 0,
            message: 'ok',
            data: {}
            // data: {
            //   account: user.account,
            //   firstApplicationUlid: user.firstApplicationUlid,
            // }
          })
        }).catch((error) => {
          return res.status(200).json({
            code: 200000,
            message: "保存数据时出错",
            data: error,
          })
        })
      }
    })
  } else {
    return res.status(200).json({
      code: 100100,
      message: "请求参数错误",
      data: {},
    })
  }
})

// 登录
router.route('/login')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  return res.status(200).json({
    code: 0,
    message: '',
    data: {}
  })
})
.post(cors.corsWithOptions, 
  // async (req, res) => {
  // // clog('req', req.body)
  // if (rules.email(req.body.account) && rules.required(req.body.password)) {
  //   let mdp = md5(req.body.password)
  //   // clog('start', new Date().getTime())
  //   usersDb.collection('users').findOne({
  //     account: req.body.account,
  //     password: mdp,
  //   }).then((user) => {
  //     req.session.user = user
  //     req.session.isAuth = true
  //     req.session.save()
  //     if (user) {
  //       return res.status(200).json({
  //         code: 0,
  //         message: "ok",
  //         data: {
  //           account: user.account,
  //           // applications: user.applications || [],
  //           firstApplicationUlid: user.firstApplicationUlid,
  //           lastApplicationUlid: user.lastApplicationUlid,
  //         },
  //         // data: {}
  //       })
  //     } else {
  //       return res.status(200).json({
  //         code: 100000,
  //         message: '用户不存在',
  //         data: '',
  //       })
  //     }
  //   }).catch(error => {
  //     return res.status(200).json({
  //       code: 200200,
  //       message: "数据库出错",
  //       data: error,
  //     })
  //   })
  // } else {
  //   return res.status(200).json({
  //     code: 100100,
  //     message: "请求参数错误",
  //     data: {},
  //   })
  // }
  // }
  (req, res) => {
    instance({
      url: '/users/authUserInfo',
      data: {
        accessToken: req.body.accessToken,
        systemId: 1,
      },
      method: 'post',
    }).then(response => {
      clog('response', response)
      if (response.code === 0) {
        req.session.user = response.data
        req.session.isAuth = true
        req.session.save()
        res.status(200).json({
          code: 0,
          message: '登录成功',
          data: {}
        })
      } else {
        return Promise.reject(new Error(res.message || '验证用户失败'))
      }
    }).catch(error => {
      res.status(200).json({
        code: 1,
        message: error.message,
        data: {}
      })
    })
  }
)
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

// 登出
router.route('/logout')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  return res.status(200).json({
    code: 0,
    message: '',
    data: {}
  })
})
.post(cors.corsWithOptions, (req, res) => {
  let user = req.session.user // for test
  clog('session', req.session)
  res.clearCookie()
  req.session.destroy();
  return res.status(200).json({
    code: 0,
    message: "ok",
    data: user,
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})
module.exports = router;
