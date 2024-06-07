const DB = {
    dev: {
        env: 'dev',
        value: 10,
        appTable: 'apps_dev',
        pageTable: 'pages_dev',
        componentTable: 'components_dev',
    },
    test: {
        env: 'test',
        value: 20,
        appTable: 'apps_test',
        pageTable: 'pages_test',
        componentTable: 'components_test',
    },
    pre: {
        env: 'pre',
        value: 30,
        appTable: 'apps_pre',
        pageTable: 'pages_pre',
        componentTable: 'components_pre',
    },
    prod: {
        env: 'prod',
        value: 40,
        appTable: 'apps_prod',
        pageTable: 'pages_prod',
        componentTable: 'components_prod',
    },
}

module.exports = {
    DB,
    dbArr: Object.values(DB),
}