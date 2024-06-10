let {
    lowcodeDb,
} = require('../mongodb');
let {instance} = require('./req')
let {auth} = require('./auth')
let { envs } = require('./config')
const winston = require('winston')
const path = require('path')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'lc-server' },
    transports: [
      new winston.transports.File({filename: path.resolve(__dirname, '../log/second.log'), })
    ]
  })



let clog = console.log
let rules = {
    exist: (params) => {
        return params !== undefined && params !== null
    },
    // todo 修改使用它的地方
    required: (params) => {
        return params !== undefined && params !== null
        // return this.exist(params) && params !== ''
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

let compatibleArray = (a) => Array.isArray(a) ? Array.from(a) : []

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6
//   };
let log = (obj, level) => {
    let date = new Date()
    let [y, m, d, h, mn, s] = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
    logger.log({
        level,
        ms: date.getTime(),
        timeForHuman: `${y}.${m+1}.${d} ${h}:${mn}:${s}`,
        data: obj,
    })
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
    log,
}