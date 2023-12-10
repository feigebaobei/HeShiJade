var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
let {appsDb, componentsDb, lowcodeDb} = require('../mongodb');
const { rules } = require('../helper');
let clog = console.log
const { errorCode } = require('../helper/errorCode');

router.use(bodyParser.json())

router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  // res.status(200).json({
  //     code: 0,
  //     message: '',
  //     data: {}
  // })
  // 校验参数
  // 从相应表中取数据
  new Promise((s, j) => {
    if (rules.required(req.query.pageUlid) && rules.required(req.query.env)) {
      s()
    } else {
      j()
    }
  }).then(() => {
    let p
    switch (req.query.env) {
      case 'dev':
        p = lowcodeDb.collection('components_dev').find({
          pageUlid: req.query.pageUlid
        }).toArray().catch(() => {
          return Promise.reject(200010)
        })
        break
      case 'test':
        p = lowcodeDb.collection('components_test').find({
          pageUlid: req.query.pageUlid
        }).toArray().catch(() => {
          return Promise.reject(200010)
        })
        break
      case 'pre':
        p = lowcodeDb.collection('components_pre').find({
          pageUlid: req.query.pageUlid
        }).toArray().catch(() => {
          return Promise.reject(200010)
        })
        break
      case 'prod':
        p = lowcodeDb.collection('components_prod').find({
          pageUlid: req.query.pageUlid
        }).toArray().catch(() => {
          return Promise.reject(200010)
        })
        break
      default:
        p = Promise.reject(100140)
        break
    }
  }).then((componentList) => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: componentList || []
    })
  }).catch(code => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})
.post(cors.corsWithOptions, (req, res) => {
  // 校验参数
  // 存到dev表中
  new Promise((s, j) => {
    if (rules.required(req.body.ulid) && 
    rules.required(req.body.type) && 
    rules.required(req.body.props) && 
    rules.required(req.body.behavior) && 
    rules.required(req.body.item) && 
    // rules.required(req.body.slot) && // 暂时不校验
    rules.required(req.body.appUlid) && 
    rules.required(req.body.pageUlid)
    ) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    let arr = [
      {
        insertOne: {
          document: {
            ulid: req.body.ulid,
            type: req.body.type,
            prevUlid: req.body.prevUlid,
            nextUlid: '',
            props: req.body.props,
            behavior: req.body.behavior,
            item: req.body.item,
            slot: req.body.slot,
            appUlid: req.body.appUlid,
            pageUlid: req.body.pageUlid,
          }
        }
      }
    ]
    if (req.body.prevUlid) {
      arr.unshift({
        updateOne: {
          filter: {ulid: req.body.prevUlid},
          update: {
            $set: {nextUlid: req.body.ulid}
          }
        }
      })
    }
    return lowcodeDb.collection('components_dev').bulkWrite(arr).catch(() => {
      return Promise.reject(200010)
    })
  }).then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  }).catch(code => {
    return res.code(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
  
  
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

router.route('/listByPage')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  let {user} = req.session
  clog('user', user)
  if (rules.required(req.query.pageUlid)) {
    let result = componentsDb.collection('components').find({
      pageUlid: req.query.pageUlid
    })
    result.toArray().then(r => {
      res.status(200).json({
        code: 0,
        message: '',
        data: r,
      })
    }).catch(error => {
      res.status(200).json({
        code: 200200,
        message: '数据库出错',
        data: error,
      })
    })
  } else {
    res.status(200).json({
      code: 100100,
      message: '请求参数错误',
      data: {},
    })
  }
})
.post(cors.corsWithOptions, (req, res) => {
  // res.send('post')
  // 先做成保存到数据库的。
  // 插入当前组件
  // 修改前组件
  // componentsDb.collection('components').insertOne({
  //   ulid: req.body.ulid,
  //   type: req.body.type,
  //   next: '',
  //   prev: req.body.prev,
  //   props: req.body.props,
  //   behavior: req.body.behavior,
  //   item: req.body.item,
  //   slot: req.body.slot,
  //   appUlid: req.body.appUlid,
  //   pageUlid: req.body.pageUlid,
  // }).then(() => {
  //   res.status(200).json({
  //     code: 0,
  //     message: 'ok',
  //     data: {},
  //   })
  // }).catch(error => {
  //   res.status(200).json({
  //     code: 200200,
  //     message: "保存时出错",
  //     data: error
  //   })
  // })
  // return 
  componentsDb.collection('components').bulkWrite([
    {
      updateOne: {
        filter: {ulid: req.body.prev},
        update: {
          $set: {next: req.body.ulid}
        }
      },
    },
    {
      insertOne: {
        document: {
          ulid: req.body.ulid,
          type: req.body.type,
          next: '',
          prev: req.body.prev,
          props: req.body.props,
          behavior: req.body.behavior,
          item: req.body.item,
          slot: req.body.slot,
          appUlid: req.body.appUlid,
          pageUlid: req.body.pageUlid,
        }
      }
    }
  ]).then((obj) => {
    res.status(200).json({
      code: 0,
      message: 'ok',
      data: {obj},
    })
  }).catch(error => {
    res.status(200).json({
      code: 200200,
      message: "保存时出错",
      data: error
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
