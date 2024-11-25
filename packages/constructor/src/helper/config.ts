import { A, S } from "src/types/base"
// import type { SsoClientParams } from "./sso-saml-client"
import type { Method, } from './axios'

// 日后使用环境变量判断
let ssoUrl = () => {
    let location = window.location
    let r: S
    switch (location.hostname) {
        case 'heshijade.com':
            r = `${location.protocol}//${location.hostname}:5020` // host包括接口号
            break;
        default:
            r = 'http://heshijade.com:5020' // host包括端口号
            // r = 'http://localhost:5020'
            break;
    }
    return r
}
let serviceUrl = () => {
    let location = window.location
    let r: S
    switch (location.hostname) {
        case 'heshijade.com':
            r = `${location.protocol}//${location.hostname}:5000` // host包括接口号
            break;
        default:
            // r = 'http://heshijade.com:5000' // host包括接口号
            r = 'http://localhost:5000'
            break;
    }
    return r
}
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
let debounceTime = 400
let layoutOptions = [
    {
      label: '川布局',
      value: 1,
      disabled: false,
    },
    // {
    //   label: '三布局',
    //   value: 11,
    //   disabled: true,
    // },
    {
      label: '井布局',
      value: 21,
      disabled: false,
    },
  ]
export {
    ssoUrl,
    serviceUrl,
    APPTOTALMAX,
    PAGETOTALMAXOFAPP,
    COMPONENTTOTALMAXOFPAGE,
    // ssoClientParams,
    ssoClientConfig,
    debounceTime,
    layoutOptions,
}