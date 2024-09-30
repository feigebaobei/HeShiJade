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

module.exports = {
    DB,
    dbArr: Array.from(Object.values(DB)),
    envs: Array.from(Object.keys(DB))
}