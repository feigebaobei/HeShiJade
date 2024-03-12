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
  // 校验参数
  // 从相应表中取数据
  new Promise((s, j) => {
    if (rules.required(req.query.pageUlid) && rules.required(req.query.env)) {
      s(true)
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
    return p
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
  // 创建+更新组件
  // 更新页面
  new Promise((s, j) => {
    if (rules.required(req.body.ulid) && 
    rules.required(req.body.type) && 
    rules.required(req.body.props) && 
    rules.required(req.body.behavior) && 
    rules.required(req.body.items) && 
    // rules.required(req.body.slot) && // 暂时不校验
    rules.required(req.body.appUlid) && 
    rules.required(req.body.pageUlid)
    ) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection('pages_dev').findOne({ulid: req.body.pageUlid}).catch(() => {
      return Promise.reject(300000)
    })
  }).then((curPage) => {
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
            items: req.body.item,
            slots: req.body.slot,
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
    let updateObj = {}
    if (curPage.lastComponentUlid) {
      updateObj = {
        $set: {
          lastComponentUlid: req.body.ulid
        }
      }
    } else {
      updateObj = {
        $set: {
          firstComponentUlid: req.body.ulid,
          lastComponentUlid: req.body.ulid,
        }
      }
    }
    let p1 = lowcodeDb.collection('components_dev').bulkWrite(arr)
    let p2 = lowcodeDb.collection('pages_dev').updateOne({
      ulid: req.body.pageUlid
    }, updateObj)
    return Promise.all([p1, p2]).catch(() => {
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
// 更新组件
.put(cors.corsWithOptions, (req, res) => {
  // 校验参数
  // 更新数据
  // 返回值
  new Promise((s, j) => {
    // props     ulid,type,key,value,
    // behavior  ulid,type,index,key,value,
    if (rules.required(req.body.ulid) && rules.required(req.body.type)) {
      switch (req.body.type) {
        case 'props':
          if (rules.required(req.body.key) && rules.required(req.body.value)) {
            s(true)
          } else {
            j(100100)
          }
          break;
        case 'behavior':
          if (rules.isNumber(req.body.index) && rules.required(req.body.key) && rules.required(req.body.value)) {
            s(true)
          } else {
            j(100100)
          }
          break;
        case 'slots':
          break;
      }
    } else {
      j(100100)
    }
  }).then(() => {
    let k = ''
    switch(req.body.type) {
      case 'props':
        k = `props.${req.body.key}`
        break;
      case 'behavior':
        k = `behavior.groups.${req.body.index}.${req.body.key}`
        break;
    }
    let updateObj = {
      [k]: req.body.value
    }
    clog('updateObj', updateObj)
    return lowcodeDb.collection('components_dev').updateOne({ulid: req.body.ulid}, {$set: 
      // {
      //   [`props.${req.body.key}`]: req.body.value
      // }
      updateObj
    }).catch(() => {
      return Promise.reject(200020)
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
.delete(cors.corsWithOptions, (req, res) => {
  // 校验参数：必填+存在
  // 处理页面级数据
  // 处理组件级数据
  let component, page
  // 检查必填项
  new Promise((s, j) => {
    if (rules.required(req.query.ulid)) {
      s(true)
    } else {
      j(100100)
    }
  })
  // 找到要删除的组件
  .then(() => {
    return lowcodeDb.collection('components_dev').findOne({ulid: req.query.ulid}).then((comp) => {
      component = comp
      return true
    }).catch(() => {
      return Promise.reject(200010)
    })
  })
  // 找到要删除的页面
  .then(() => {
    return lowcodeDb.collection('pages_dev').findOne({ulid: component.pageUlid}).then((p) => {
      page = p
      return true
    }).catch(() => {
      return Promise.reject(2000101)
    })
  })
  // 删除组件及页面
  .then(() => {
    let arr = [lowcodeDb.collection('components_dev').deleteOne({ulid: component.ulid})]
    if (component.prevUlid) { // 前面有组件
      // lowcodeDb.collection('page')
      // tested
      if (component.nextUlid === '') { // 后面无组件
        let p1 = lowcodeDb.collection('pages_dev').updateOne({ulid: page.ulid}, {$set: {lastComponentUlid: component.prevUlid}})
        let p2 = lowcodeDb.collection('components_dev').updateOne({ulid: component.prevUlid}, {$set: {nextUlid: ''}})
        arr.push(p1, p2)
      } else { // 后面有组件 等效于 它在中间
        // page不变
        // tested
        let p1 = lowcodeDb.collection('components_dev').updateOne({ulid: component.prevUlid}, {$set: {nextUlid: component.nextUlid}})
        let p2 = lowcodeDb.collection('components_dev').updateOne({ulid: component.nextUlid}, {$set: {prevUlid: component.prevUlid}})
        arr.push(p1, p2)
      }
    } else { // 前面没有组件
      // tested
      if (component.nextUlid === '') { // 等效于 page.firstComponentUlid === page.lastComponentUlid // 只有一个组件
        let p1 = lowcodeDb.collection('pages_dev').updateOne({ulid: page.ulid}, {$set: {
          firstComponentUlid: '',
          lastComponentUlid: '',
        }})
        arr.push(p1)
      } else {
        // tested
        let p1 = lowcodeDb.collection('components_dev').updateOne({ulid: component.nextUlid}, {$set: {prevUlid: ''}})
        let p2 = lowcodeDb.collection('pages_dev').updateOne({ulid: page.ulid}, {$set: {firstComponentUlid: component.nextUlid}})
        arr.push(p1, p2)
      }
    }
    return Promise.all(arr).catch(() => {
      return Promise.reject(200020)
    })
  })
  // 返回结果
  .then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {},
    })
  }).catch((code) => {
    clog('da', code)
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
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
