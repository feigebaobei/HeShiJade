const { errorCode } = require('./errorCode');
let clog = console.log

// 可以做成由码值控制的
let auth = (req, res, next) => {
    // clog('req.session', req.session)
    if (req.session.isAuth) {
        next()
    } else {
        res.status(200).json({
            code: 100130,
            message: errorCode[100130],
            data: {},
        })
    }
}
module.exports = {
    auth
}