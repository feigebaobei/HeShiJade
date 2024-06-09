let errorCode = {
    0: '成功',
    100000: '已开始执行长耗时任务',
    100100: '未传递必传参数', // 要求字段必传
    100110: '数据不匹配', 
    100114: 'token不匹配', 
    100120: '用户已经存在', // 不能多次注册 
    100130: '用户已经登出',
    100140: '数据解析出错',
    100144: '数据不合法',
    100150: '数据类型出错',
    100154: 'refreshToken过期了',
    100160: '用户不存在',
    100170: '登出失败',
    100200: 'sso返回错误信息',
    200000: '保存数据时出错', 
    200010: '取数据时出错',
    200020: '更新数据时出错',
    200030: '删除数据时出错',
    200040: '数据正在迁移，不能执行其他操作。',
    200050: '迁移数据时出错',
    300000: '无对应数据',
    400000: '该用户无权限操作',
    // 500000: '服务器内部错误',
}

// export {
//     errorCode
// }
module.exports = {errorCode};


// module.exports = {
//     // required,
//     rules,
//     // wrapCheck,
//     resParamsError,
//     instance,
//     auth,
// }