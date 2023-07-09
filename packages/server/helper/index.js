// let required = (params) => {
//     return params !== undefined && params !== null
// }
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
    }
}
module.exports = {
    // required,
    rules
}