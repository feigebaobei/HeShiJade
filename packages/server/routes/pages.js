var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
// const fsPromises = require('fs/promises')
// const path = require('path')
let {pagesDb, appsDb, lowcodeDb} = require('../mongodb');
const { rules, resParamsError } = require('../helper');
const { errorCode } = require('../helper/errorCode');
// let md5 = require('md5');
const { logger } = require('../helper/log')
const { DB } = require('../helper/config')
let clog = console.log

router.use(bodyParser.json())

router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  new Promise((s, j) => {
    if (rules.required(req.query.appUlid) && rules.required(req.query.env)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    let p
    // 分别在4个库中查数据
    switch (req.query.env) {
      case 'dev':
        p = lowcodeDb.collection('pages_dev').find({
          appUlid: req.query.appUlid
        }).toArray()
        .catch(() => {
          return Promise.reject(200010)
        })
        break;
      case 'test':
        p = lowcodeDb.collection('pages_test').find({
          appUlid: req.query.appUlid
        }).toArray().catch(() => {
          return Promise.reject(200010)
        })
        break
      case 'pre':
        p = lowcodeDb.collection('pages_pre').find({
          appUlid: req.query.appUlid
        }).toArray().catch(() => {
          return Promise.reject(200010)
        })
        break
      case 'prod':
        p = lowcodeDb.collection('pages_prod').find({
          appUlid: req.query.appUlid
        }).toArray().catch(() => {
          return Promise.reject(200010)
        })
        break
      default:
        p = Promise.reject(100140)
        break;
    }
    return p
  }).then((pageList) => {
    return res.status(200).json({
      code: 0, 
      message: '',
      data: pageList
    })
  }).catch(code => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})
// 经过检查。创建页面的接口运行正确。
.post(cors.corsWithOptions, (req, res) => {
  // 校验参数
  // 取出对应应用判断是否有权限。owner collaborator
  // 在dev环境创建页面 + 修改指定应用的lastPageUlid
  // 创建新页面+更新前页面+更新当前应用
  new Promise((s, j) => {
    if (rules.required(req.body.key) &&
    rules.required(req.body.name) &&
    rules.required(req.body.ulid) &&
    rules.required(req.body.appUlid)
    ) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection('apps_dev').findOne({ulid: req.body.appUlid}).catch(() => {
      return Promise.reject(300000)
    })
  }).then((curApp) => {
    if ([curApp.owner].concat(curApp.collaborator).some(ulid => ulid === req.session.user.ulid)) {
      return curApp
    } else {
      return Promise.reject(400000)
    }
  }).then((curApp) => {
    let opPageArr = [
      {
        insertOne: {
          document: {
            key: req.body.key,
            name: req.body.name,
            ulid: req.body.ulid,
            prevUlid: curApp.lastPageUlid,
            nextUlid: '',
            childUlid: '', // 子页面
            firstComponentUlid: '',
            lastComponentUlid: '',
            appUlid: req.body.appUlid,
            behavior: [],
          }
        }
      }
    ]
    let updateObj = {}
    // 更新应用的最后一个页面的ulid。
    if (curApp.lastPageUlid) {
      opPageArr.unshift({
        updateOne: {
          filter: {ulid: curApp.lastPageUlid},
          update: {
            $set: {nextUlid: req.body.ulid}
          }
        }
      })
      updateObj = {
        $set: {
          lastPageUlid: req.body.ulid,
        }
      }
    } else {
      updateObj = {
        $set: {
          firstPageUlid: req.body.ulid,
          lastPageUlid: req.body.ulid
        }
      }
    }
    let pPage = lowcodeDb.collection('pages_dev').bulkWrite(opPageArr)
    let pApp = lowcodeDb.collection('apps_dev').updateOne({
      ulid: curApp.ulid
    }, updateObj)
    return Promise.all([pPage, pApp]).catch(() => {
      return Promise.reject(200000)
    })
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
.put(cors.corsWithOptions, (req, res) => {
  // meta     ulid,type,key,value
  // behavior ulid,type,key,value,index
  new Promise((s, j) => {
    if (rules.required(req.body.ulid) && 
      rules.required(req.body.type) && 
      rules.required(req.body.key) && 
      rules.required(req.body.value)) {
      switch (req.body.type) {
        case 'meta':
          s(true)
          break;
        case 'behavior':
          if (Math.sign(req.body.index) > -1) {
            s(true)
          } else {
            j(100100)
          }
          break;
      }
    } else {
      j(100100)
    }
  }).then(() => {
    let updateObj = {}
    switch(req.body.type) {
      case 'meta':
        updateObj[`${req.body.key}`] = req.body.value
        break;
      case 'behavior':
        updateObj[`behavior.${req.body.index}.${req.body.key}`] = req.body.value
        break;
    }
    return lowcodeDb.collection(DB.dev.pageTable).updateOne({
      ulid: req.body.ulid
    }, {
      $set: updateObj,
      // $set: {[req.body.key]: req.body.value}
    })
  }).then(() => {
    res.status(200).json({
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
  // res.send('delete')
  // 检验参数
  // 是否有权限
  // 删除
  // if () {}
  let page, app
  new Promise((s, j) => {
    if (rules.required(req.query.ulid)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    logger.info({method: 'delete', originalUrl: req.originalUrl, ulid: req.query.ulid})
    return lowcodeDb.collection('pages_dev').findOne({ulid: req.query.ulid}).then((p) => {
      page = p
      return true
    }).catch(() => {
      return Promise.reject(2000010)
    })
  }).then(() => {
    return lowcodeDb.collection('apps_dev').findOne({ulid: page.appUlid}).then((p) => {
      app = p
      return true
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).then(() => {
    // 处理应用的数据
    let pApp
    // 当删除第一个页面时
    if (page.ulid === app.firstPageUlid) {
      let setObj
      // 当只有一个页面时。
      if (app.firstPageUlid === app.lastPageUlid) { // 删除最后一个页面，应该清空app中的页面数据。
        setObj = {
          firstPageUlid: '',
          lastPageUlid: '',
        }
      } else {
        setObj = {
          firstPageUlid: page.nextUlid,
        }
      }
      let appUpdateObj = {
        $set: setObj,
      }
      pApp = lowcodeDb.collection('apps_dev').updateOne({
        ulid: app.ulid
      }, appUpdateObj)
    } else if (page.ulid === app.lastPageUlid) {
      // 当删除最后一个页面时
      pApp = lowcodeDb.collection('apps_dev').updateOne({
        ulid: app.ulid
      }, { $set: { lastPageUlid: page.prevUlid } })
    } else {
      // 当删除中间的页面时
      pApp = Promise.resolve(true)
    }
    // 处理页面的数据
    let pageUpdateArr = []
    // 删除当前的。
    // 修改前一个
    // 修改后一个
    pageUpdateArr.push({
      deleteOne: {
        filter: {ulid: page.ulid},
      },
    })
    if (page.prevUlid) {
      pageUpdateArr.push({
        updateOne: {
          filter: {ulid: page.prevUlid},
          update: {
            $set: {nextUlid: page.nextUlid}
          }
        },
      })
    } else {
      pageUpdateArr.push({
        updateOne: {
          filter: {ulid: page.nextUlid},
          update: {
            $set: {prevUlid: ''}
          },
        },
      })
    }
    if (page.nextUlid) {
      pageUpdateArr.push({
        updateOne: {
          filter: {ulid: page.nextUlid},
          update: {
            $set: {prevUlid: page.prevUlid}
          },
        },
      })
    } else {
      pageUpdateArr.push({
        updateOne: {
          filter: {ulid: page.prevUlid},
          update: {
            $set: {nextUlid: ''}
          }
        },
      })
    }
    // 删除最后一个页面时，应用的lastPageUlid未修正。
    let pPage = lowcodeDb.collection('pages_dev').bulkWrite(pageUpdateArr)
    // 处理组件的数据
    let pComponent = lowcodeDb.collection('components_dev').deleteMany({pageUlid: page.ulid}).then(() => {
      return true
    }).catch((error) => {
      return Promise.reject(200030)
    })
    return Promise.all([pApp, pPage, pComponent]).catch((error) => {
      return Promise.reject(200030)
    })
  }).then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {},
    })
  }).catch((code) => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})

router.route('/behavior')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.post(cors.corsWithOptions, (req, res) => {
  return new Promise((s, j) => {
    if (req.body.ulid && req.body.behavior) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection(DB.dev.pageTable).updateOne({
      ulid: req.body.ulid,
    }, {
      $push: {
        behavior: req.body.behavior
      }
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
.put(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.delete(cors.corsWithOptions, (req, res) => {
  let index
  new Promise((s, j) => {
    if (rules.required(req.query.ulid) && rules.required(req.query.index)) {
      index = Number(req.query.index)
      if (rules.isNumber(index) && index > -1) {
        s(true)
      } else {
        j(100100)
      }
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection(DB.dev.pageTable).bulkWrite([
      {
        updateOne: {
          filter: {ulid: req.query.ulid},
          update: {
            $unset: {[`behavior.${req.query.index}`]: null},
          }
        }
      },
      {
        updateOne: {
          filter: {ulid: req.query.ulid},
          update: {
            $pull: {behavior: null}
          }
        }
      }
    ]).catch(() => {
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

module.exports = router;
