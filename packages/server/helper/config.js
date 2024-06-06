const DB = {
    dev: {
        env: 'dev',
        appTable: 'apps_dev',
        pageTable: 'pages_dev',
        componentTable: 'components_dev',
    },
    test: {
        env: 'test',
        appTable: 'apps_test',
        pageTable: 'pages_test',
        componentTable: 'components_test',
    },
    pre: {
        env: 'pre',
        appTable: 'apps_pre',
        pageTable: 'pages_pre',
        componentTable: 'components_pre',
    },
    prod: {
        env: 'prod',
        appTable: 'apps_prod',
        pageTable: 'pages_prod',
        componentTable: 'components_prod',
    },
}

module.exports = {
    DB,
}