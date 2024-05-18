import { A } from "src/types/base"
// import type { SsoClientParams } from "./sso-saml-client"
import type { Method, } from './axios'

// 日后使用环境变量判断
let ssoUrl = () => 'http://localhost:5020'
let serviceUrl = () => 'http://localhost:5000'
const APPTOTALMAX = 10
const PAGETOTALMAXOFAPP = 20
const COMPONENTTOTALMAXOFPAGE = 30
// let ssoClientParams = (idpData: A): SsoClientParams => {
//     return {
//         idp: {
//             url: `${ssoUrl()}/users/saml`,
//             method: 'post',
//             data: idpData,
//         },
//         sp: {
//             url: `${serviceUrl()}/users/saml`,
//             method: 'post'
//         }
//     }
// }
let ssoClientConfig = {
    idp: {
        loginUrl: `${ssoUrl()}/users/login`,
        signUrl: `${ssoUrl()}/users/sign`,
        loginMethod: 'post' as Method,
        signMethod: 'post' as Method,
        verificationUrl: `${ssoUrl()}/users/verification`,
        verificationMethod: 'post' as Method,
    },
    sp: {
        loginUrl: `${serviceUrl()}/users/login`,
        loginMethod: 'post' as Method,
        signUrl: `${serviceUrl()}/users/sign`,
        signMethod: 'post' as Method,
        logoutUrl: `${serviceUrl()}/users/logout`,
        logoutMethod: 'delete' as Method,
    },
}

export {
    ssoUrl,
    serviceUrl,
    APPTOTALMAX,
    PAGETOTALMAXOFAPP,
    COMPONENTTOTALMAXOFPAGE,
    // ssoClientParams,
    ssoClientConfig,
}