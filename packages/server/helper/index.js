let {
    lowcodeDb,
} = require('../mongodb');
let {instance} = require('./req')
let { send } = require('./sendEmail')
let {auth} = require('./auth')
let { envs } = require('./config')
// const winston = require('winston')
const path = require('path')

// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'lc-server' },
//     transports: [
//       new winston.transports.File({filename: path.resolve(__dirname, '../log/second.log'), })
//     ]
//   })



let clog = console.log
let rules = {
    exist: (params) => {
        return params !== undefined && params !== null
    },
    // todo 修改使用它的地方
    required: (params) => {
        return params !== undefined && params !== null
    },
    unEmpty: (params) => {
        return rules.required(params) && params !== ''
    },
    email: (str) => {
        // 1234@qq.com
        let reg = /^.*@.*\.com/
        let r = reg.test(str) 
        console.log('r', r)
        return r
    },
    isArray: (p) => {
        return Array.isArray(p)
    },
    isVersion: () => {
        return true
    },
    isNumber: (n) => {
        return typeof n === 'number' && isFinite(n);
    },
    range: (cur, min, max, minFlag = true, maxFlag = true) => {
        let bool
        if (minFlag) {
            bool = min <= cur
        } else {
            bool = min < cur
        }
        if (bool) {
            if (maxFlag) {
                bool = cur <= max
            } else {
                bool = cur < max
            }
        } else {
            // null
        }
        return bool
    },
    // todo 参数优化为先arr，再cur
    enum: (cur, arr) => {
        return arr.includes(cur)
    },
    isEnv: (v) => {
        return rules.enum(v, envs)
    }
}
let resParamsError = (res) => {
    return res.status(200).json({
        code: 100100,
        message: "请求参数错误",
        data: {},
      })
}
let sqlVersion = (tableName, appUlid, key) => {
    return lowcodeDb.collection(tableName).findOne({
        ulid: appUlid
      }).then(app => {
        return {
          [`${key}`]: {
            version: app.version,
            remarks: app.remarks,
          }
        }
      }).catch(() => {
        return Promise.resolve({
            [`${key}`]: {}
        })
      })
}
let createAppEnvKey = (appUlid, env) => {
    return `${appUlid}_${env}`
}
let stepRecorderPrototype = Object.create({}, {
    create: {
        value: function() {
            this.updateStatus('doing')
            clog('this', this, this.key, {...this})
            return lowcodeDb.collection('temporary').insertOne({
                key: this.key,
                total: this.total,
                done: this.done,
                status: this.status,
            })
        }
    },
    add: {
        value: function(s) {
            this.done.push(s)
            return lowcodeDb.collection('temporary').updateOne({
                key: this.key,
            }, {
                $push: {
                    done: s
                }
            })
        }
    },
    delete: {
        value: function() {
            this.done.splice(0, this.done.length)
            return lowcodeDb.collection('temporary').deleteOne({key: this.key})
        }
    },
    updateStatus: {
        value: function (v) {
            this.status = v
        }
    },
    isFinish: {
        value: function () {
            return this.done.length === this.total
        }
    }
})
let createStepRecorder = (appUlid, env, total) => {
    let key = createAppEnvKey(appUlid, env)
    let t = Object.create(stepRecorderPrototype, {
        key: {
            // writable: false, // 默认就是不可写。
            value: key,
        },
        total: {
            value: total,
        },
        done: {
            value: [],
        },
        status: {
            writable: true,
            value: 'init', // init | doing | error | finish
        }
    })
    return t
}
// 获取数据类型
let getType = (o) => Object.prototype.toString.call(o).slice(8, -1)
let compatibleArray = (a) => Array.isArray(a) ? Array.from(a) : []
let compatibleCode = (p) => {
    let type = getType(p)
    let res
    switch (type) {
        case 'Number':
            res = p
            break;
        case 'Error':
            res = p.message
            break;
        default:
            res = '未知错误'
            break;
    }
    return res
}

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
//   };
// let log = (obj, level) => {
//     let date = new Date()
//     let [y, m, d, h, mn, s] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
//     logger.log({
//         level,
//         ms: date.getTime(),
//         timeForHuman: `${y}.${m+1}.${d} ${h}:${mn}:${s}`,
//         data: obj,
//     })
// }
let washApp = (appList, firstApplicationUlid) => {
    // 取出当前用户的全部应用（s1）和可以成链应用（s2）。删除存在于s1且不存在于s2的数据。
    // 返回脏数据
    let linkArr = []
    let curUlid = firstApplicationUlid
    let app = appList.find(item => item.ulid === curUlid)
    while (app) {
        linkArr.push(app.ulid)
        app = appList.find(item => item.ulid === app.nextUlid)
    }
    if (linkArr.length < appList.length) {
        return appList.filter(item => !linkArr.includes(item.ulid))
    } else {
        return []
    }
}
let washPage = (pageList, firstPageUlid) => {
    // 取出当前用户的全部应用（s1）和可以成链应用（s2）。删除存在于s1且不存在于s2的数据。
    // 返回脏数据
    let linkArr = []
    let curUlid = firstPageUlid
    let page = pageList.find(item => item.ulid === curUlid)
    while (page) {
        linkArr.push(page.ulid)
        page = pageList.find(item => item.ulid === page.nextUlid)
    }
    if (linkArr.length < pageList.length) {
        return pageList.filter(item => !linkArr.includes(item.ulid))
    } else {
        return []
    }
}
let washComponent = (componentList, firstComponentUlid) => {
    // 取出当前用户的全部应用（s1）和可以成链应用（s2）。删除存在于s1且不存在于s2的数据。
    // 返回脏数据
    let linkArr = []
    let curUlid = firstComponentUlid
    let app = componentList.find(item => item.ulid === curUlid)
    while (app) {
        linkArr.push(app.ulid)
        app = componentList.find(item => item.ulid === app.nextUlid)
    }
    if (linkArr.length < componentList.length) {
        return componentList.filter(item => !linkArr.includes(item.ulid))
    } else {
        return []
    }
}



module.exports = {
    // required,
    rules,
    // wrapCheck,
    resParamsError,
    instance,
    auth,
    sqlVersion,
    // ENVS,
    createAppEnvKey,
    createStepRecorder,
    compatibleArray,
    // log,
    compatibleCode,
    washApp,
    send,
    washPage,
    washComponent,
}