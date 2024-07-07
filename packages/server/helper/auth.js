const { errorCode } = require('./errorCode');
const { logger } = require('./log')
let clog = console.log

// 可以做成由码值控制的
let auth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        logger.error({method: '', originalUrl: req.originalUrl, session: req.session, cookies: req.cookies})
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