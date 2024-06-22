const express = require('express');
const cors = require('./cors')
const router = express.Router();
const bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
const path = require('path')
let {appsDb, usersDb,
  lowcodeDb,
} = require('../mongodb');
const { rules, auth, sqlVersion, createAppEnvKey, createStepRecorder, compatibleArray, sleep, } = require('../helper');
const { errorCode } = require('../helper/errorCode');
const { DB, dbArr } = require('../helper/config')
const { logger } = require('../helper/log')

let clog = console.log

router.use(bodyParser.json())

// 操作应用列表
router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
// 取得应用列表
.get(cors.corsWithOptions, auth, (req, res) => {
  logger.info({method: 'get', originalUrl: req.originalUrl, params: req.query})
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
        data: appList,
      })
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).catch((code) => {
    logger.error({code})
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
    rules.exist(req.body.prevUlid) &&
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
    let pArr = []
    if (user.firstApplicationUlid) {
      pArr.push(lowcodeDb.collection('users').updateOne({ulid: req.session.user.ulid}, {$set: {firstApplicationUlid: req.body.ulid}}))
    }
      pArr.push(lowcodeDb.collection(DB.dev.appTable).bulkWrite([
        {
          updateOne: {
            filter: {ulid: req.body.prevUlid},
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
              version: req.body.version || 0,
              owner: user.ulid,
              collaborator: req.body.collaborator, // ulid[]
              firstPageUlid: '',
              lastPageUlid: '',
              prevUlid: req.body.prevUlid,
              nextUlid: '', // 创建都是加在最后
              remarks: '',
              activated: true, // 预留字段
            }
          }
        }
      ])
    )
    return Promise.all(pArr).catch(() => Promise.reject(200000))
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
// 删除指定应用
.delete(cors.corsWithOptions, (req, res) => { // 未做到原子性
  logger.info({method: 'delete', originalUrl: req.originalUrl, params: req.query})
  new Promise((s, j) => {
    if (rules.isArray(req.query.envs) && rules.required(req.query.appUlid)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    // 当前用户是否可删除
    return lowcodeDb.collection(DB.dev.appTable).find({owner: req.session.user.ulid}).toArray().then((appList) => {
      if (appList.some(app => app.ulid === req.query.appUlid)) {
        return true
      } else {
        return Promise.reject(400000)
      }
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).then(() => {
    // let envObj = dbArr.find(item => item.env === 'dev')
    // let envObj = DB.dev
    let pu = lowcodeDb.collection('users').findOne({ulid: req.session.user.ulid}).then((user) => {
      return user
    }).catch(() => Promise.reject(200010))
    let pa = lowcodeDb.collection(DB.dev.appTable).findOne({ulid: req.query.appUlid}).then((app) => {
      return app
    }).catch(() => Promise.reject(200010))
    return Promise.all([pu, pa]).then(([user, app]) => ({user, app}))
  }).then(({user, app}) => {
    // todo 整理key
    let stepRecorder = createStepRecorder(req.query.appUlid, 'delete', req.query.envs.includes('dev') ? (req.query.envs.length * 3 + 1) : (req.query.envs.length * 3))
    stepRecorder.create()
    let pArr = []
    req.query.envs.forEach(env => {
      let envObj = dbArr.find(item => item.env === env)
      if (env === 'dev') {
        if (user.firstApplicationUlid === req.query.appUlid) {
          pArr.push(lowcodeDb.collection('users').updateOne({ ulid: app.owner }, {$set: {firstApplicationUlid: app.nextUlid}}))
        }
        stepRecorder.add('user_update')
      }
      pArr.push(lowcodeDb.collection(envObj.appTable).deleteOne({ulid: req.query.appUlid}).then(() => {
        stepRecorder.add(`app_${env}`)
        return true
      }).catch(() => {
        return Promise.reject(200030)
      }))
      pArr.push(lowcodeDb.collection(envObj.pageTable).deleteMany({appUlid: req.query.appUlid}).then(() => {
        stepRecorder.add(`page_${env}`)
        return true
      }).catch(() => {
        return Promise.reject(200030)
      }))
      pArr.push(lowcodeDb.collection(envObj.componentTable).deleteMany({appUlid: req.query.appUlid}).then(() => {
        stepRecorder.add(`component_${env}`)
        return true
      }).catch(() => {
        return Promise.reject(200030)
      }))
    })
    let pAll = Promise.all(pArr).then(() => {
      stepRecorder.updateStatus('finish')
      stepRecorder.delete()
    }).catch(() => {
      stepRecorder.updateStatus('error')
    })
    let pr = new Promise((_s, j) => {
      setTimeout(() => j(100000))
    }, 2000)
    return Promise.race([pAll, pr])
  }).then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  }).catch((code) => {
    clog(code)
    logger.info({code, originalUrl: req.originalUrl})
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})

router.route('/detail')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  // res.send('put')
  // 校验参数
  // 取出数据
  // 返回数据
  new Promise((s, j) => {
    if (rules.required(req.query.appKey) && rules.enum(req.query.env, ['dev', 'test', 'pre', 'prod'])) {
      s(true)
    } else {
      j(100144)
    }
  }).then(() => {
    let tableName = ''
    switch (req.query.env) {
      case 'dev':
        tableName = 'apps_dev'
        break;
      case 'test':
        tableName = 'apps_test'
        break
      case 'pre':
        tableName = 'apps_pre'
        break;
      case 'prod':
        tableName = 'apps_prod'
        break
    }
    return lowcodeDb.collection(tableName).findOne({key: req.query.appKey}).catch(() => {
      return Promise.reject(200010)
    })
  }).then((p) => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: p
    })
  }).catch((code) => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
  // appsDb.collection('apps').findOne({key: req.query.appKey}).then((app) => {
  //   return res.status(200).json({
  //     code: 0,
  //     message: '',
  //     data: app
  //   })
  // }).catch(() => {
  //   return res.status(200).json({
  //     code: 200200,
  //     message: "数据库出错",
  //     data: obj,
  //   })
  // })
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
    clog('rules.required(req.query.appUlid)', rules.required(req.query.appUlid))
    clog('rules.isArray(req.query.envs)', rules.isArray(req.query.envs))
    if (rules.required(req.query.appUlid) && rules.isArray(req.query.envs)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    let ps = []
    if (req.query.envs.includes(DB.dev.env)) {
      ps.push(sqlVersion(DB.dev.appTable, req.query.appUlid, DB.dev.env))
    }
    if (req.query.envs.includes(DB.test.env)) {
      ps.push(sqlVersion(DB.test.appTable, req.query.appUlid, DB.test.env))
    }
    if (req.query.envs.includes(DB.pre.env)) {
      ps.push(sqlVersion(DB.pre.appTable, req.query.appUlid, DB.pre.env))
    }
    if (req.query.envs.includes(DB.prod.env)) {
      ps.push(sqlVersion(DB.prod.appTable, req.query.appUlid, DB.prod.env))
    }
    return Promise.all(ps).then(arr => {
      return res.status(200).json({
        code: 0,
        message: '',
        data: arr.reduce((r, c) => {
          r = {
            ...r,
            ...c
          }
          return r
        }, {})
      })
    }).catch((error) => {
      clog('error', error)
      return Promise.reject(200010)
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
// 设置dev环境的版本
.post(cors.corsWithOptions, (req, res) => {
  res.send('post')
})
// 此方法只支持设置dev环境的版本号
.put(cors.corsWithOptions, (req, res) => {
  new Promise((s, j) => {
    if (rules.required(req.body.appUlid) && rules.isNumber(req.body.newVersion)) {
      return true
    } else {
      return j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection(DB.dev.appTable).findOne({ulid: req.body.appUlid}).then((app) => {
      if (app.version < req.body.newVersion) {
        return app
      } else {
        return Promise.reject(100144)
      }
    })
  }).then((app) => {
    return lowcodeDb.collection(DB.dev.appTable).updateOne({
      ulid: app.ulid
    }, {$set: {version: req.body.newVersion}}).catch(() => {
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
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

// 发布
router.route('/publish')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.send('get')
})
.post(
  cors.corsWithOptions, 
  (req, res) => {
  let fromEnv
  let toEnv
  const appUlid = req.body.appUlid
  const newVersion = req.body.newVersion
  let stepRecorder
  let toApp
  new Promise((s, j) => {
    if (rules.isEnv(req.body.fromEnv) &&
      rules.isEnv(req.body.toEnv) &&
      rules.required(appUlid)
      // rules.isNumber(newVersion)
    ) {
      let dbArr = Object.values(DB)
      fromEnv = dbArr.find(item => item.env === req.body.fromEnv)
      toEnv = dbArr.find(item => item.env === req.body.toEnv)
      if (!fromEnv || !toEnv) {
        j(100144)
      } else {
        if (fromEnv.env === 'dev' && !rules.isNumber(newVersion)) {
          j(100144)
        }
        if (fromEnv.value < toEnv.value) {
          s(true)
        } else {
          j(100144)
        }
      }
    } else {
      j(100100)
    }
  }).then(() => {
    // 设置dev环境的版本号
    let pfv
    if (fromEnv.env === 'dev') {
      pfv = lowcodeDb.collection(fromEnv.appTable).updateOne({ulid: appUlid}, {
        $set: {
          version: newVersion,
          remarks: req.body.remarks || ''
        }
      }).then(() => newVersion)
    } else {
      pfv = lowcodeDb.collection(fromEnv.appTable).findOne({ulid: appUlid}).then(app => app.version)
    }
    let ptv = lowcodeDb.collection(toEnv.appTable).findOne({ulid: appUlid}).then((app) => {
      toApp = app
      if (app) {
        return Promise.resolve(app.version)
      } else {
        return Promise.resolve(-1)
      }
    }).catch(() => {
      return Promise.reject(200010)
    })
    return Promise.all([pfv, ptv]).then(([fv, tv]) => {
      if (tv < fv) {
        return true
      } else {
        return Promise.reject(100144)
      }
    })
  }).then(() => {
    logger.info({originalUrl: req.originalUrl, params: req.body, method: 'post'})
    stepRecorder = createStepRecorder(appUlid, toEnv.env, 11)
    stepRecorder.create()
    return lowcodeDb.collection(fromEnv.appTable).findOne({ulid: appUlid}).then((app) => {
      stepRecorder.add('app_fromEnv_read')
      return app
    }).catch(() => Promise.reject(200010))
  }).then((app) => {
    let toDeletePageUlidArr = []
    let toDeleteComponentUlidArr = []
    // 读取目录环境的旧数据
    // 记录目录环境的旧数据为要删除的数据
    // 读取源环境的数据
    // 把源环境的数据写入目标环境
    // 最后开口
    // 删除目录环境的旧数据
    let pReadToPage = lowcodeDb.collection(toEnv.pageTable).find({appUlid: appUlid}).toArray().then((pageList) => {
      stepRecorder.add('page_toEnv_read')
      toDeletePageUlidArr = pageList.map(item => item.ulid)
    })
    let pReadToComponent = lowcodeDb.collection(toEnv.componentTable).find({appUlid: appUlid}).toArray().then((componentList) => {
      stepRecorder.add('component_toEnv_read')
      toDeleteComponentUlidArr = componentList.map(item => item.ulid)
    })
    let pReadFromPage = lowcodeDb.collection(fromEnv.pageTable).find({appUlid}).toArray().then((pageList) => {
      stepRecorder.add('page_fromEnv_read')
      logger.info({page_fromEnv_read: pageList.map(item => item.ulid)})
      return lowcodeDb.collection(toEnv.pageTable).insertMany(pageList.map(item => {
        delete item._id
        return item
      })).then(() => {
        stepRecorder.add('page_toEnv_write')
        return true
      }).catch((error) => {
        clog(error)
      })
    })
    let pReadFromComponent = lowcodeDb.collection(fromEnv.componentTable).find({appUlid}).toArray().then((componentList) => {
      stepRecorder.add('component_fromEnv_read')
      logger.info({component_toEnv_write: componentList.map(item => item.ulid)})
      return lowcodeDb.collection(toEnv.componentTable).insertMany(componentList.map(item => {
        delete item._id
        return item
      })).then(() => {
        stepRecorder.add('component_toEnv_write')
        return true
      }).catch((error) => {
      })
    })
    let pAll = Promise.all([pReadToPage, pReadToComponent, pReadFromPage, pReadFromComponent]).then(() => {
      // 使用bulkWrite去完成删除旧的添加新的，不使用update更新旧的。
      let arr = [
        {
          insertOne: {
            document: app
          }
        },
      ]
      if (toApp) {
        arr.unshift({deleteOne: {filter: {ulid: appUlid}}})
      }
      return lowcodeDb.collection(toEnv.appTable).bulkWrite(arr)
      .then(() => {
        stepRecorder.add('app_toEnv_write')
        stepRecorder.add('app_toEnv_delete')
        let p0 = lowcodeDb.collection(toEnv.pageTable).deleteMany({ulid: {$in: toDeletePageUlidArr}}).then(() => {
          stepRecorder.add('page_toEnv_delete')
        })
        let p1 =lowcodeDb.collection(toEnv.componentTable).deleteMany({ulid: {$in: toDeleteComponentUlidArr}}).then(() => {
          stepRecorder.add('component_toEnv_delete')
        })
        return Promise.all([p0, p1])
      }).catch(() => {
        Promise.reject(200030)
      })
    }).then(() => {
      stepRecorder.updateStatus('finish')
      stepRecorder.delete()
    }).catch((error) => {
      logger.info({error})
      stepRecorder.updateStatus('error')
    })
    let pr = new Promise((_s, j) => {
      setTimeout(() => {
        j(100000)
      }, 2000)
    })
    return Promise.race([pAll, pr])
    // return Promise.reject(100000)
  }).then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  }).catch((code) => {
    logger.info({code, originalUrl: req.originalUrl})
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
