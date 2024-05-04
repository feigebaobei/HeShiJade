const pino = require('pino')
const path = require('path')

let logger = pino({
    name: 'logname',
}, pino.destination(path.resolve(`${__dirname}`, `../log/access.log`)))

// console.log('logger', logger)

module.exports = {
    pino,
    // logger,
    logger,
}