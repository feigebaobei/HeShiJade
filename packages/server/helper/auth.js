let clog = console.log

// 可以做成由码值控制的
let auth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        clog('session', req.session)
        res.status(200).json({
            code: 1,
            message: '鉴权不通过',
            data: {}
        })
    }
}
module.exports = {
    auth
}