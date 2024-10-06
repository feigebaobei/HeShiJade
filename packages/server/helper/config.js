const DB = {
    dev: {
        env: 'dev',
        value: 10,
        appTable: 'apps_dev',
        pageTable: 'pages_dev',
        componentTable: 'components_dev',
        pluginTable: 'plugins',
    },
    test: {
        env: 'test',
        value: 20,
        appTable: 'apps_test',
        pageTable: 'pages_test',
        componentTable: 'components_test',
        pluginTable: 'plugins',
    },
    pre: {
        env: 'pre',
        value: 30,
        appTable: 'apps_pre',
        pageTable: 'pages_pre',
        componentTable: 'components_pre',
        pluginTable: 'plugins',
    },
    prod: {
        env: 'prod',
        value: 40,
        appTable: 'apps_prod',
        pageTable: 'pages_prod',
        componentTable: 'components_prod',
        pluginTable: 'plugins',
    },
}
const sizeObj = {
    // '1b': 1,
    '1b': 1, // 1byte
    '1kb': 1024,
    '1mb': 1048576,
    '1gb': 1073741824,
    // '1k': 1024,
    // '1m': 1048576,
    // '1g': 1073741824,
    // 'k': 1024,
    // 'm': 1048576,
    // 'g': 1073741824,
}
sizeObj['b'] = sizeObj['1b']
sizeObj['1k'] = sizeObj['k'] = sizeObj['1kb']
sizeObj['1m'] = sizeObj['m'] = sizeObj['1mb']
sizeObj['1g'] = sizeObj['g'] = sizeObj['1gb']

module.exports = {
    DB,
    dbArr: Array.from(Object.values(DB)),
    envs: Array.from(Object.keys(DB)),
    sizeObj,
}