var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
let { componentsDb, lowcodeDb } = require('../mongodb');
const { rules, compatibleArray, washComponent, send, auth } = require('../helper');
const { errorCode } = require('../helper/errorCode');
const { DB, adminEmail } = require('../helper/config');
const { logger } = require('../helper/log')
let clog = console.log

router.use(bodyParser.json())

router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, auth, (req, res) => {
  // 校验参数
  // 从相应表中取数据
  let page
  new Promise((s, j) => {
    if (rules.required(req.query.pageUlid) && rules.required(req.query.env)) {
      s(true)
    } else {
      j()
    }
  }).then(() => {
    return lowcodeDb.collection(DB.dev.pageTable).findOne({ulid: req.query.pageUlid}).then((p) => {
      page = p
      return
    })
  }).then(() => {
    let p
    switch (req.query.env) {
      case 'dev':
        p = lowcodeDb.collection('components_dev').find({
          pageUlid: req.query.pageUlid
        }).toArray().then((componentList) => {
          let arr = washComponent(componentList, page.firstComponentUlid)
          if (arr.length) {
            send({
              to: adminEmail,
              subject: 'HeShiJade_脏数据',
              text: `这些组件：
${arr.map(item => item.ulid).join('\n')}
是脏数据`
            })
          }
          return componentList
        }).catch(() => {
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
// 创建组件
.post(cors.corsWithOptions, auth, (req, res) => {
  // 校验参数
  // 创建+更新组件
  // 更新页面
  // 检查必要参数
  let pPage, componentUpdateArr
  new Promise((s, j) => {
    if (rules.required(req.body.ulid) && 
      rules.required(req.body.type) && 
      rules.required(req.body.props) && 
      rules.required(req.body.behavior) && 
      rules.isArray(req.body.items) && 
      rules.required(req.body.slots) &&
      rules.required(req.body.mount) && 
      rules.required(req.body.appUlid) && 
      rules.required(req.body.gridLayout) && 
      rules.required(req.body.pageUlid)
    ) {
      s(true)
    } else {
      j(100100)
    }
  })
  // 操作页面和组件
  .then(() => {
    // let p2
    // 创建组件
    componentUpdateArr = [
      {
        insertOne: { // 插入一个组件
          document: {
            ulid: req.body.ulid,
            type: req.body.type,
            prevUlid: req.body.prevUlid,
            nextUlid: '',
            parentUlid: req.body.parentUlid,
            mount: req.body.mount,
            props: req.body.props,
            behavior: req.body.behavior,
            items: req.body.items,
            slots: req.body.slots,
            appUlid: req.body.appUlid,
            gridLayout: req.body.gridLayout,
            pageUlid: req.body.pageUlid,
          }
        }
      }
    ]
    // 更新前组件
    if (req.body.prevUlid) {
      componentUpdateArr.unshift({
        updateOne: {
          filter: {ulid: req.body.prevUlid},
          update: {
            $set: {nextUlid: req.body.ulid}
          }
        }
      })
    }
    // 更新后组件
    if (req.body.nextUlid) {
      componentUpdateArr.unshift({
        updateOne: {
          filter: {ulid: req.body.nextUlid},
          update: {
            $set: {prevUlid: req.body.ulid}
          }
        }
      })
    }
    // 更新父组件
    if (req.body.parentUlid) {
      return lowcodeDb.collection(DB.dev.componentTable).findOne({ulid: req.body.parentUlid}).then(parentComponent => {
        switch(req.body.mount.area) {
          // 不再这里挂载了
          // case 'items': // 已测试
          //   if (parentComponent.items[req.body.mount.itemIndex].childUlid) {
          //     // 当父组件的items[index]中存在子组件信息时，无操作。
          //   } else {
          //     componentUpdateArr.unshift({
          //       updateOne: {
          //         filter: {ulid: req.body.parentUlid},
          //         update: {
          //           $set: {
          //             [`items.${req.body.mount.itemIndex}.childUlid`]: req.body.ulid
          //           }
          //         }
          //       }
  
          //     })
          //     logger.info({componentUpdateArr})
          //   }
          //   break;
          case 'slots': // 已测试
            if (parentComponent.slots[req.body.mount.slotKey]) {
              // 当父组件的slots[slotKey]中存在子组件信息时，无操作。
            } else {
              componentUpdateArr.unshift({
                updateOne: {
                  filter: {ulid: req.body.parentUlid},
                  update: {
                    $set: {
                      [`slots.${req.body.mount.slotKey}`]: req.body.ulid
                    }
                  }
                }
              })
            }
            logger.info({componentUpdateArr})
            break;
        }
        return componentUpdateArr
      })
    } else {
      if (!req.body.prevUlid) {
        return pPage = lowcodeDb.collection(DB.dev.pageTable).updateOne({ulid: req.body.pageUlid}, {$set: {firstComponentUlid: req.body.ulid}}).catch((error) => {
          return Promise.reject(200020)
        })
      } else {
        return pPage = Promise.resolve()
      }
    }
  }).then(() => {
    let pComponent = lowcodeDb.collection(DB.dev.componentTable).bulkWrite(componentUpdateArr)
    return Promise.all([pComponent, pPage]).catch((error) => {
      logger.error({error})
      return Promise.reject(200000)
    })
  })
  // 返回值
  .then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  }).catch(code => {
    logger.info({code, originalUrl: req.originalUrl})
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})
// 更新组件
.put(cors.corsWithOptions, auth, (req, res) => {
  // 校验参数
  // 更新数据
  // 返回值
  new Promise((s, j) => {
    // props       ulid,type,key,value,
    // behavior    ulid,type,index,key,value,
    // gridLayout  ulid,type,key,value,
    // slots       ulid,type,key,value,
    // mount       ulid,type,key,value,
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
          if (rules.isNumber(req.body.index) && rules.required(req.body.key)) {
            s(true)
          } else {
            j(100100)
          }
          break;
        case 'gridLayout':
          if (rules.required(req.body.key) && rules.required(req.body.value)) {
            s(true)
          } else {
            j(100100)
          }
          break;
        case 'slots':
          if (rules.required(req.body.key)) {
            s(true)
          } else {
            j(100100)
          }
          break;
        case 'mount':
          if (rules.required(req.body.key) && rules.required(req.body.value)) {
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
    let k = ''
    switch(req.body.type) {
      case 'props':
        k = `props.${req.body.key}`
        break;
      case 'behavior':
        k = `behavior.${req.body.index}.${req.body.key}`
        break;
      case 'gridLayout':
        k = `gridLayout.${req.body.key}`
        break;
      case 'slots':
        k = `slots.${req.body.key}`
        break
      case 'mount':
        k = `mount.${req.body.key}`
        break;
    }
    let updateObj = {
      [k]: req.body.value
    }
    return lowcodeDb.collection(DB.dev.componentTable).updateOne({ulid: req.body.ulid}, {$set: 
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
// 删除组件
// 后端不知道链式关系，需要前端传来子组件ulid.
// 做接口重载
// ulid: ULID        // 删除一个组件
// children: ULID[]  // 删除多个组件
.delete(cors.corsWithOptions, auth, (req, res) => {
  // 校验参数：必填+存在
  // 处理页面级数据
  // 处理组件级数据
  // 检查必填项
  let {ulid, childrenUlid} = req.query
  new Promise((s, j) => {
    if (rules.unEmpty(ulid)) {
      if (childrenUlid) {
        if (Array.isArray(childrenUlid)) {} else {
          childrenUlid = [childrenUlid]
        }
      } else {
        childrenUlid = []
      }
      s(true)
    } else if (rules.required(childrenUlid)) {
      if (Array.isArray(childrenUlid)) {} else {
        childrenUlid = [childrenUlid]
      }
      s(false)
    } else {
      j(100100)
    }
  }).then((b) => {
    if (b) { // 删除一个组件，且处理链式关系。
      let arr = []
      // 得到当前组件
      return lowcodeDb.collection(DB.dev.componentTable).findOne({ulid})
      .then((curComponent) => {
        // 是否有前组件
        if (curComponent.prevUlid) {
          arr.push(lowcodeDb.collection(DB.dev.componentTable).updateOne({ulid: curComponent.prevUlid}, {$set: {nextUlid: curComponent.nextUlid}}))
          if (curComponent.nextUlid) {
            arr.push(lowcodeDb.collection(DB.dev.componentTable).updateOne({ulid: curComponent.nextUlid}, {$set: {prevUlid: curComponent.prevUlid}}))
          }
        } else {
          if (curComponent.parentUlid) {
            if (curComponent.nextUlid) {
              arr.push(lowcodeDb.collection(DB.dev.componentTable).updateOne({ulid: curComponent.parentUlid}, {
                $set: {
                  [`slots.${curComponent.mount.slotKey}`]: curComponent.nextUlid,
                }
              }))
            } else {
              arr.push(lowcodeDb.collection(DB.dev.componentTable).updateOne({ulid: curComponent.parentUlid}, {
                $unset: {
                  [`slots.${curComponent.mount.slotKey}`]: null
                }
              }))
            }
          } else {
            arr.push(lowcodeDb.collection(DB.dev.pageTable).updateOne({ulid: curComponent.pageUlid}, {
              $set: {
                firstComponentUlid: curComponent.nextUlid
              }
            }))
          }
          if (curComponent.nextUlid) {
            arr.push(lowcodeDb.collection(DB.dev.componentTable).updateOne({ulid: curComponent.nextUlid}, {
              // prevUlid: curComponent.prevUlid
              $set: {
                prevUlid: ''
              }
            }))
          }
        }
        arr.push(lowcodeDb.collection(DB.dev.componentTable).deleteMany({ulid: {$in: [ulid, ...childrenUlid]}}))
        return Promise.all(arr).catch((error) => {
          return Promise.reject(200020)
        })
      })
      .catch((error) => {
        return Promise.reject(200010)
      })
    } else { // 删除多个组件，且不处理链式关系。
      return lowcodeDb.collection(DB.dev.componentTable).deleteMany({ulid: {$in: childrenUlid}}).catch(() => {
        return Promise.reject(200030)
      })
    }
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

router.route('/listByPage')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
  // let {user} = req.session
  // clog('user', user)
  // if (rules.required(req.query.pageUlid)) {
  //   let result = componentsDb.collection('components').find({
  //     pageUlid: req.query.pageUlid
  //   })
  //   result.toArray().then(r => {
  //     res.status(200).json({
  //       code: 0,
  //       message: '',
  //       data: r,
  //     })
  //   }).catch(error => {
  //     res.status(200).json({
  //       code: 200200,
  //       message: '数据库出错',
  //       data: error,
  //     })
  //   })
  // } else {
  //   res.status(200).json({
  //     code: 100100,
  //     message: '请求参数错误',
  //     data: {},
  //   })
  // }
})
.post(cors.corsWithOptions, auth, (req, res) => {
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

router.route('/props')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.send('get')
})
.post(cors.corsWithOptions, (req, res) => {
  res.send('post')
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, auth, (req, res) => {
  // ulid: 组件ulid
  // key:  key
  // 检查参数
  // 删除数据
  new Promise((s, j) => {
    if (rules.required(req.query.ulid) && rules.required(req.query.key)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection(DB.dev.componentTable).bulkWrite([
      {
        updateOne: {
          filter: {ulid: req.query.ulid},
          update: {
            $unset: {[`props.${req.query.key}`]: null}
          }
        },
      },
    ]).catch(() => {
      return Promise.reject(200020)
    })
  }).then(() => {
    res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  }).catch((code) => {
    res.status(200).json({
      code: 0,
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
  res.send('get')
})
.post(cors.corsWithOptions, auth, (req, res) => {
  new Promise((s, j) => {
    if (rules.required(req.body.ulid) && rules.required(req.body.value)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection(DB.dev.componentTable).updateOne({ulid: req.body.ulid}, {$push: {
      // event: req.body.value.event,
      // fnBody: req.body.value.fnBody,
      behavior: req.body.value
    }}).catch(error => {
      return Promise.reject(200020)
    })
  }).then(() => {
    res.status(200).json({
      code: 0,
      message: '',
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
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, auth, (req, res) => {
  // res.send('delete')
  let index = -1
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
    return lowcodeDb.collection(DB.dev.componentTable).bulkWrite([
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
    res.status(200).json({
      code: 0,
      message: '',
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

router.route('/items')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.send('get')
})
.post(cors.corsWithOptions, auth, (req, res) => {
  // 检验参数
  // 取出相关组件
  // 增加items
  new Promise((s, j) => {
    if (rules.required(req.body.ulid) &&
      rules.required(req.body.value)
    ) {
      s(true)
    } else {
      j(100100)
    }
  })
  .then(() => {
    return lowcodeDb.collection('components_dev').updateOne({ulid: req.body.ulid}, {$push: {
      items: req.body.value
    }}).catch(error => {
      clog(error)
      return Promise.reject(200020)
    })
  })
  .then(() => {
    res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  })
  .catch((code) => {
    res.status(200).json({
      code,
      message: errorCode[code],
      data: {},
    })
  })
})
.put(cors.corsWithOptions, auth, (req, res) => {
  // 校验参数
  // 修改数据
  // 返回结果
  new Promise((s, j) => {
    if (rules.required(req.body.ulid) &&
    rules.isNumber(req.body.index) &&
    rules.required(req.body.key) &&
    rules.required(req.body.value)
    ) {
      s(true)
    } else {
      j(100100)
    }
  })
  .then(() => {
    return lowcodeDb.collection('components_dev').updateOne({ulid: req.body.ulid}, {$set: {
      [`items.${req.body.index}.${req.body.key}`]: req.body.value
    }}).catch(() => {
      return Promise.reject(200020)
    })
  })
  .then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  })
  .catch((code) => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {},
    })
  })
})
.delete(cors.corsWithOptions, auth, (req, res) => {
  // ulid, index
  let index = -1
  new Promise((s, j) => {
    if (rules.required(req.query.ulid) &&
      rules.required(req.query.index)
    ) {
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
    return lowcodeDb.collection(DB.dev.componentTable).bulkWrite([
      {
        updateOne: {
          filter: {ulid: req.query.ulid},
          update: {
            $unset: {[`items.${req.query.index}`]: null},
          },
        },
      },
      {
        updateOne: {
          filter: {ulid: req.query.ulid},
          update: {
            $pull: {items: null}
          },
        },
      },
    ])
    .catch(() => {
      return Promise.reject(200020)
    })
  })
  .then(() => {
    return res.status(200).json({
      code: 0,
      message: '',
      data: {}
    })
  })
  .catch((code) => {
    return res.status(200).json({
      code,
      message: errorCode[code],
      data: {},
    })
  })
})

router.route('/slots')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.send('get')
})
.post(cors.corsWithOptions, (req, res) => {
  res.send('post')
})
.put(cors.corsWithOptions, auth, (req, res) => {
  new Promise((s, j) => {
    if (rules.required(req.body.ulid) &&
      rules.required(req.body.oldSlotKey) && 
      rules.required(req.body.newSlotKey)
    ) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection(DB.dev.componentTable).findOne({ulid: req.body.ulid}).catch(() => {
      return Promise.reject(200010)
    })
  }).then((component) => {
    return lowcodeDb.collection(DB.dev.componentTable).bulkWrite([
      {
        updateOne: {
          filter: {ulid: req.body.ulid},
          update: {
            $unset: {[`slots.${req.body.oldSlotKey}`]: null}
          }
        }
      },
      {
        updateOne: {
          filter: {ulid: req.body.ulid},
          update: {
            $set: {[`slots.${req.body.newSlotKey}`]: component.slots[req.body.oldSlotKey]}
          }
        }
      }
    ]).catch(() => {
      return Promise.reject(200020)
    })
  }).then(() => {
    res.status(200).json({
      code: 0,
      message: '',
      data: {},
    })
  }).catch((code) => {
      res.status(200).json({
        code,
        message: errorCode[code],
        data: {},
      })
  })
})
.delete(cors.corsWithOptions, auth, (req, res) => {
  // ulid,slotKey
  new Promise((s, j) => {
    if (rules.unEmpty(req.query.ulid) && rules.unEmpty(req.query.slotKey)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return lowcodeDb.collection(DB.dev.componentTable).findOne({ulid: req.query.ulid}).catch(() => {
      return Promise.reject(200010)
    })
  }).then((curComponent) => {
    let [slotkeyIndexStr, slotKeyItemId] = req.query.slotKey.split('_')
    let slotkeyIndex = Number(slotkeyIndexStr)
    let slots = curComponent.slots
    Object.entries(slots).forEach(([k, ulid]) => {
      let [indexStr, idOrField] = k.split('_')
      let indexNum = Number(indexStr)
      if (indexNum >= slotkeyIndex) {
        delete slots[`${indexNum}_${idOrField}`]
        if (indexNum > slotkeyIndex) {
          slots[`${indexNum - 1}_${idOrField}`] = ulid
        }
      }
    })
    return lowcodeDb.collection(DB.dev.componentTable).updateOne({ulid: req.query.ulid}, {
      $set: {slots}
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
      data: {},
    })
  })
})

router.route('/batch')

module.exports = router;
