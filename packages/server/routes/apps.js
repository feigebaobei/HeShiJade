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
  // 是否登录
  // 是否有权限（暂不做）
  // 取数据
  new Promise((s, j) => {
    if (req.session.isAuth) {
      s(true)
    } else {
      j(100130)
    }
  }).then(() => {
    return lowcodeDb.collection('apps_dev').find({
      owner: req.session.user.ulid
    }).toArray().then((appList) => {
      return res.status(200).json({
        code: 0,
        message: '',
        data: appList
      })
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).catch((code) => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
  
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
    return lowcodeDb.collection('users').findOne({ulid: req.session.user.ulid}).then((user) => {
      return user
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).then((user) => {
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
              collaborator: req.body.collaborator, // ulid[]
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

router.route('/versions')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  // 校验参数
  // 取出数据
  new Promise((s, j) => {
    if (rules.required(req.query.appUlid)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    // let tableName = ''
    let p // p0, p1, p2, p3
    switch (req.query.env) {
      case 'dev':
        // p0 = 
        p = lowcodeDb.collection('apps_dev').findOne({
          ulid: req.query.appUlid
        }).then((app) => {
          return {dev: app.version}
        }).catch(() => {
          return Promise.reject(300000)
        })
        // p = Promise.all([p0]).catch(() => {
        //   return Promise.reject(300000)
        // })
        break
      case 'test':
        p = lowcodeDb.collection('apps_test').findOne({
          ulid: req.query.appUlid
        }).then((app) => {
          return {test: app.version}
        }).catch(() => {
          return Promise.reject(300000)
        })
        break
      case 'pre':
        p = lowcodeDb.collection('apps_pre').findOne({
          ulid: req.query.appUlid
        }).then(() => {
          return {pre: app.version}
        }).catch(() => {
          return Promise.reject(300000)
        })
        break
      case 'prod':
        p = lowcodeDb.collection('apps_prod').findOne({
          ulid: req.query.appUlid
        }).then((app) => {
          return {prod: app.version}
        }).catch(() => {
          return Promise.reject(300000)
        })
        break
      default:
        let p0 = lowcodeDb.collection('apps_dev').findOne({
          ulid: req.query.appUlid
        })
        let p1 = lowcodeDb.collection('apps_test').findOne({
          ulid: req.query.appUlid
        }) // 有可能为null
        let p2 = lowcodeDb.collection('apps_pre').findOne({
          ulid: req.query.appUlid
        })
        let p3 = lowcodeDb.collection('apps_prod').findOne({
          ulid: req.query.appUlid
        })
        // 
        p = Promise.all([p0, p1, p2, p3]).then(([r0, r1, r2, r3]) => {
          clog(r0)
          clog(r1)
          clog(r2)
          clog(r3)
          return {
            dev: r0?.version,
            test: r1?.version,
            pre: r2?.version,
            prod: r3?.version,
          }
        }).catch((e) => {{
          clog(e)
          return Promise.reject(200010)
        }})
        break
    }
    return p
  }).then((obj) => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {
        dev: obj.dev,
        test: obj.test,
        pre: obj.pre,
        prod: obj.prod,
      }
    })
  }).catch((code) => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})
// 设置dev环境的版本
.post(cors.corsWithOptions, (req, res) => {
  // 校验参数
  // 检查是否大于当前版本号
  // 在dev环境创建新版本。即设置
  let newVersion = 0
  new Promise((s, j) => {
    if (rules.required(req.body.appUlid) && rules.required(req.body.newVersion)) {
      // if (req.
      // s(true)
      newVersion = Number(req.body.newVersion)
      if (newVersion) {
        s(true)
      } else {
        j(100144)
      }
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection('apps_dev').findOne({
      ulid: req.body.appUlid
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).then((app) => {
    if (app.version < newVersion) {
      return app
    } else {
      return Promise.reject(100144)
    }
  }).then((app) => {
    // let p0 = lowcodeDb.collection('apps_dev').updateMany({ulid: app.ulid}, {$set: {version: newVersion}})
    // // .catch(() => {
    // //   return Promise.reject(200020)
    // // })
    // let p1 = lowcodeDb.collection('pages_dev').updateMany({appUlid: app.ulid}, {$set: {version: newVersion}})
    // let p2 = lowcodeDb.collection('components_dev').updateMany({appUlid: app.ulid}, {$set})
    // return Promise.all([p0, p1, p2])
    return lowcodeDb.collection('apps_dev').updateOne({ulid: app.ulid}, {$set: {version: newVersion}}).catch(() => {
      return Promise.reject(200020)
    })
  }).then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  }).catch((code) => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})
// 发布
.put(cors.corsWithOptions, (req, res) => {
  // res.send('put')
  // 校验参数
  // 同步app/page/component
  // 删除旧数据
  // 应用、页面、组件都应该有版本号
  let newVersion = 0
  new Promise((s, j) => {
    if (rules.required(req.body.appUlid) && 
    rules.required(req.body.fromEnv) && 
    rules.required(req.body.version)
    ) {
      newVersion = Number(req.body.version)
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    // 比较大小
    let p
    switch (req.body.fromEnv) {
      case 'dev':
        lowcodeDb.collection('apps_dev').findOne({ulid: req.body.appUlid}).then(app => {
          if (app.version < newVersion) {
            p = Promise.resolve(true)
          } else {
            p = Promise.reject(100144)
          }
        })
        break
      case 'test':
        break
      case 'pre':
        break
      case 'prod':
        break
    }
    return p
  }).then(() => {
    // 删除现有数据
    let p, 
    p0, p1, p2
    switch (req.body.fromEnv) {
      case 'dev':
        // 应用
        // 取出dev环境的数据
        // 保存到test环境
        p0 = lowcodeDb.collection('apps_test').deleteMany({ulid: req.body.appUlid})
        p1 = lowcodeDb.collection('pages_test').deleteMany({appUlid: req.body.appUlid})
        p2 = lowcodeDb.collection('components_test').deleteMany({appUlid: req.body.appUlid})
        p = Promise.all([p0, p1, p2]).catch(() => Promise.reject(200030))
        // 页面
        // 取出dev环境的数据
        // 保存到test环境
        
        // 组件
        // 取出dev环境的数据
        // 保存到test环境
        break
      case 'test':
        break
      case 'pre':
        break
      case 'prod':
        break
    }
    return p
  }).then(() => {
    // 取出数据
    let p, 
    p0, p1, p2
    switch (req.body.fromEnv) {
      case 'dev':
        p0 = lowcodeDb.collection('apps_dev').findOne({ulid: req.body.appUlid})
        p1 = lowcodeDb.collection('pages_dev').find({appUlid: req.body.appUlid}).toArray()
        p2 = lowcodeDb.collection('components_dev').find({appUlid: req.body.appUlid}).toArray()
        p = Promise.all([p0, p1, p2]).catch(() => Promise.reject(200010))
        break
      case 'test':
        break
      case 'pre':
        break
      case 'prod':
        break
    }
    return p
  }).then(([app, pageList, componentList]) => {
    // 创建新数据
    let p, 
    p0, p1, p2
    switch (req.body.fromEnv) {
      case 'dev':
        p0 = lowcodeDb.collection('apps_test').insertOne({
          key: app.key,
          name: app.name,
          ulid: app.ulid,
          theme: app.theme,
          version: req.body.newVersion,
          owner: app.owner,
          collaborator: app.collaborator,
          firstPageUlid: app.firstPageUlid,
          lastPageUlid: app.lastPageUlid,
          prevUlid: app.prevUlid,
          nextUlid: app.nextUlid
        })
        p1 = lowcodeDb.collection('pages_test').insertMany(pageList.map(page => {
          return {
            key: page.key,
            name: page.name,
            ulid: page.ulid,
            prevUlid: page.prevUlid,
            nextUlid: page.nextUlid,
            childUlid: page.childUlid,
            firstComponentUlid: page.firstComponentUlid,
            lastComponentUlid: page.lastComponentUlid,
            appUlid: page.appUlid,
          }
        }))
        p2 = lowcodeDb.collection('components_test').insertMany(componentList.map(comp => {
          return {
            ulid: comp.ulid, 
            type: comp.type, 
            prevUlid: comp.prevUlid,
            nextUlid: comp.nextUlid,
            props: comp.props, 
            behavior: comp.behavior,
            item: comp.item,
            slot: comp.slot,
            appUlid: comp.appUlid,
            pageUlid: comp.pageUlid,
          }
        }))
        p = Promise.all([p0, p1, p2]).catch(() => Promise.reject(保存数据时出错))
        break
      case 'test':
        break
      case 'pre':
        break
      case 'prod':
        break
    }
    return p
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
      data: {}
    })
  })
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

module.exports = router;
