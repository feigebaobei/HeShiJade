// 日后使用环境变量判断
let ssoUrl = () => 'http://localhost:5020'
let serviceUrl = () => 'http://localhost:5000'
const APPTOTALMAX = 10
const PAGETOTALMAXOFAPP = 20
const COMPONENTTOTALMAXOFPAGE = 30
let ssoClientParams = () => {
    return {
        idp: {
            url: `${ssoUrl}/login`,
            method: 'post',
            data: {}
        },
        sp: {
            url: `${serviceUrl}/saml`,
            method: 'post'
        }
    }
}

export {
    ssoUrl,
    serviceUrl,
    APPTOTALMAX,
    PAGETOTALMAXOFAPP,
    COMPONENTTOTALMAXOFPAGE,
    ssoClientParams,
}