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

// 登录
router.route('/login')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.post(cors.corsWithOptions, (req, res) => {
  // 校验
  clog('req', req.body)
  new Promise((s, j) => {
    if (req.body) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection('users').findOne({
      ulid: req.body.ulid
    }).then((user) => {
      return user
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).then((user) => {
    req.session.user = {
      ...req.body,
      ...user,
    }
    req.session.isAuth = true
    req.session.save()
    return res.status(200).json({
      code: 0,
      message: '',
      data: {...user}
    })
  }).catch((code) => {
    clog('code', code)
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.delete(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
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
    }).then(() => {
      let obj = {
        ulid: result.ulid,
        profile: result.profile,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        firstApplicationUlid: '',
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
  res.send('post')
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  new Promise((s, j) => {
    res.clearCookie('user', {path: '/'})
    req.session.destroy((error) => {
      if (error) {
        j(100170)
      } else {
        s(true)
      }
    })
  }).then(() => {
    res.status(200).json({
      code: 0,
      message: 'ok',
      data: {}
    })
  }).catch((code) => {
    res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})

// // 更新token
// // todo delete 2025.07.01+
// router.route('/refreshToken')
// .options(cors.corsWithOptions, (req, res) => {
//   res.sendStatus(200)
// })
// .get(cors.corsWithOptions, (req, res) => {
//   res.send('get')
// })
// .post(cors.corsWithOptions, (req, res) => {
//   res.send('post')
// })
// .put(cors.corsWithOptions, (req, res) => {
//   // 校验参数
//   // 是否已登录
//   // at/rt是否有效
//   // 向sso请求新token
//   // 更新session中的数据
//   // 返回数据
//   new Promise((s, j) => {
//     // clog('req\n\n\n\n', req.body)
//     if (rules.required(req.body.accessToken) && rules.required(req.body.refreshToken)) {
//       s(true)
//     } else {
//       j(100100)
//     }
//   }).then(() => {
//     if (req.session.isAuth) {
//       return true
//     } else {
//       return Promise.reject(100130)
//     }
//   })
//   .then(() => {
//     return instance({
//       url: '/users/refreshToken',
//       method: 'put',
//       data: {
//         accessToken: req.body.accessToken,
//         refreshToken: req.body.refreshToken,
//       }
//     }).then((response) => {
//       if (response.code === 0) {
//         req.session.user.accessToken = response.data.accessToken
//         req.session.user.refreshToken = response.data.refreshToken
//         return {
//           accessToken: response.data.accessToken,
//           refreshToken: response.data.refreshToken,
//         }
//       } else {
//         // clog('response', response)
//         return Promise.reject(100200)
//       }
//     })
//   }).then((instData) => {
//     res.status(200).json({
//       code: 0,
//       message: '',
//       data: {
//         accessToken: instData.accessToken,
//         refreshToken: instData.refreshToken,
//       }
//     })
//   }).catch((code) => {
//     res.status(200).json({
//       code,
//       message: errorCode[code],
//       data: {},
//     })
//   })
// })
// .delete(cors.corsWithOptions, (req, res) => {
//   res.send('delete')
// })

router.route('/saml')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.send('get')
})
.post(cors.corsWithOptions, (req, res) => {
  // 验证数据是否正确
  // 放入session
  // 种cookie
  // res.send('post')
  new Promise((s, j) => {
    // 验证
    s(true)
  }).then(() => {
    // req.body // saml
    return lowcodeDb.collection('users').findOne({
      ulid: req.body.ulid
    }).then(user => {
      return user
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).then((user) => {
    req.session.user = {
      ...req.body,
      ...user,
    }
    req.session.isAuth = true
    req.session.save()
    return res.status(200).json({
      code: 0,
      message: '',
      data: user,
    })
  }).catch((code) => {
    return res.status(200).json({
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
module.exports = router;
