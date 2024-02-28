var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {lowcodeDb} = require('../mongodb')
let { rules, instance } = require('../helper/index')
let md5 = require('md5');
const { errorCode } = require('../helper/errorCode');
let clog = console.log


router.use(bodyParser.json())

router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
// 得到指定用户的信息。
// 默认是当前用户。
.get(cors.corsWithOptions, (req, res) => {
  res.status(200).json({
    code: 0,
    message: '',
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
  // 校验参数
  // 请求sso注册，会得到token
  // 创建新用户
  // 返回token*2 + 种cookie
  new Promise((s, j) => {
    if (rules.required(req.body.account) && rules.required(req.body.password)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return instance({
      url: '/users/sign',
      method: 'post',
      data: {
        account: req.body.account,
        password: req.body.password,
      }
    }).then(response => {
      if (response.code === 0) {
        return response.data
      } else {
        return Promise.reject(100200)
      }
    }).catch(() => {
      return Promise.reject(100200)
    })
  }).then((result) => {
    return lowcodeDb.collection('users').insertOne({
      ulid: result.ulid,
      firstApplicationUlid: '',
      lastApplicationUlid: '',
    }).then(() => {
      let obj = {
        ulid: result.ulid,
        profile: result.profile,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        firstApplicationUlid: '',
        lastApplicationUlid: '',
      }
      req.session.user = obj
      req.session.isAuth = true
      req.session.save()
      return res.status(200).json({
        code: 0,
        message: '',
        data: obj
      })
    }).catch(() => {
      return Promise.reject(200000)
    })
  }).then(() => {
  }).catch((code) => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
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
.post(cors.corsWithOptions, (req, res) => {
  // check
  // 请求sso验证
  // 从lowcode库中取出user
  // 返回userInfo+token+种cookie
  new Promise((s, j) => {
    if (rules.required(req.body.account) && rules.required(req.body.password)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return instance({
      url: '/users/login',
      method: 'post',
      data: {
        account: req.body.account,
        password: req.body.password,
      },
    }).then((response) => {
      // clog('response', response)
      if (response.code === 0) {
        return response.data
      } else {
        return Promise.reject(100200)
      }
    }).catch(() => {
      return Promise.reject(100200)
    })
  }).then((obj) => {
    return lowcodeDb.collection('users').findOne({ulid: obj.ulid}).then(user => {
      if (user) {
        let result = {
          ulid: user.ulid,
          profile: obj.profile,
          accessToken: obj.accessToken,
          refreshToken: obj.refreshToken,
          firstApplicationUlid: user.firstApplicationUlid,
          lastApplicationUlid: user.lastApplicationUlid,
        }
        req.session.user = result
        req.session.isAuth = true
        req.session.save()
        return res.status(200).json({
          code: 0,
          message: '',
          data: result
        })
      } else {
        return Promise.reject(100160)
      }
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).catch((code) => {
    res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})
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
  // let user = req.session.user // for test
  // clog('session', req.session)
  res.clearCookie()
  req.session.destroy();
  return res.status(200).json({
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
module.exports = router;
