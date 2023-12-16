// let required = (params) => {
//     return params !== undefined && params !== null
// }

let {instance} = require('./req')
let {auth} = require('./auth')

let rules = {
    required: (params) => {
        return params !== undefined && params !== null
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
    enum: (cur, arr) => {
        return arr.includes(cur)
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


module.exports = {
    // required,
    rules,
    // wrapCheck,
    resParamsError,
    instance,
    auth,
}