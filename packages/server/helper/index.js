let {
    lowcodeDb,
  } = require('../mongodb');
  
// let required = (params) => {
//     return params !== undefined && params !== null
// }

let {instance} = require('./req')
let {auth} = require('./auth')
// let ENVS = ['dev', 'test', 'pre', 'prod']
// let ENVS = [
//     {
//         name: 'dev',
//         value: 10,
//         appTable: 'apps_dev',
//         pageTable: 'pages_dev',
//         componentTable: 'components_dev',
//     },
//     {
//         name: 'test',
//         value: 20,
//         appTable: 'apps_test',
//         pageTable: 'pages_test',
//         componentTable: 'components_test',
//     },
//     {
//         name: 'pre',
//         value: 30,
//         appTable: 'apps_pre',
//         pageTable: 'pages_pre',
//         componentTable: 'components_pre',
//     },
//     {
//         name: 'prod',
//         value: 40,
//         appTable: 'apps_prod',
//         pageTable: 'pages_prod',
//         componentTable: 'components_prod',
//     },
// ]



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
        this.enum(v, ENVS.map(item => item.name))
    }
}
// let wrapCheck = (condition, res) => {
//     return new Promise((s, j) => {
//         if (condition) {
//             s()
//         } else {
//             return res.status(200).json({
//                 code: 100100,
//                 message: "请求参数错误",
//                 data: {},
//               })
//         }
//     })
// }
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


module.exports = {
    // required,
    rules,
    // wrapCheck,
    resParamsError,
    instance,
    auth,
    sqlVersion,
    // ENVS,
}