import { req } from './axios'
// type
import type { Method, RequestData,
    ResponseData, } from './axios'
import type { A, Oa, F, N, S } from "src/types/base"

interface SsoClientParams {
    idp: {
        url: S
        method: Method
        data: A
    }
    sp: {
        url: S
        method: Method
    }
}
interface SamlRes {
    idpRes: {
        code: N
        message: S
        data: A
    }
    spRes: {
        code: N
        message: S
        data: A
    }
}

let opReqObj = (url: S, method: Method, data?: A): RequestData => {
    let reqObj: A = {
        url,
        method,
    }
    switch(method) {
        case 'get': 
        case 'delete': 
            reqObj.params = data
            break;
        default:
            reqObj.data = data
            break;
    }
    return reqObj
}
let _login = (obj: SsoClientParams) => {
    return req(opReqObj(obj.idp.url, obj.idp.method, obj.idp.data)).then((idpRes: ResponseData) => {
        return req(opReqObj(obj.sp.url, obj.sp.method, idpRes.data)).then((spRes) => {
            return {
                idpRes,
                spRes,
            }
        })
    })
}

// 这样可以实现promise&cb，但是使用该方法时ts类型不对。
// type T = (obj: SsoClientParams) => Promise<SamlRes>
// type G = (obj: SsoClientParams, cb: F) => void
// let login: T | G = (obj, cb) => {
//     if (cb) {
//         _login(obj).then((SamlRes) => {
//             cb(SamlRes)
//         }).catch(() => {
//             console.log('str')
//         })
//         return undefined
//     } else {
//         return _login(obj)
//     }
// }
let login = _login

interface Idp {
    loginUrl: S
    signUrl: S
    loginMethod: Method
    signMethod: Method
    verificationUrl: S
    verificationMethod: Method
}
interface Sp {
    loginUrl: S
    loginMethod: Method
    signUrl: S
    signMethod: Method
    logoutUrl: S
    logoutMethod: Method
}
interface SsoClient<T = ResponseData> {
    idp: Idp
    sp: Sp
    loginIdp: (p: A) => Promise<T>
    loginSp: (p: A) => Promise<T>
    login: (p: A) => Promise<{idpRes: A, spRes: A}>
    logoutSp: (p?: A) => Promise<T>
    signIdp: (p: A) => Promise<T>
    sendVerification: (p: A) => Promise<ResponseData>
}
let obj = Object.create({}, {
    loginIdp: {
        value: function (data: A): Promise<ResponseData> {
            return req(opReqObj((this as unknown as SsoClient).idp.loginUrl, (this as unknown as SsoClient).idp.loginMethod, data))
        }
    },
    loginSp: {
        value: function (data: A): Promise<ResponseData> {
            return req(opReqObj((this as unknown as SsoClient).sp.loginUrl, (this as unknown as SsoClient).sp.loginMethod, data))
        }
    },
    login: {
        value: function (data: A): Promise<{idpRes: A, spRes: A}> {
            return (this as unknown as SsoClient).loginIdp(data).then((idpRes) => {
                if (idpRes.code === 0) {
                    return (this as unknown as SsoClient).loginSp(idpRes.data).then((spRes) => {
                        if (spRes) {
                            return {
                                idpRes,
                                spRes,
                            }
                        } else {
                            return Promise.reject()
                        }
                    })
                } else {
                    return Promise.reject()
                }
            })
        }
    },
    logoutSp: {
        value: function (data?: A): Promise<ResponseData> {
            return req(opReqObj((this as unknown as SsoClient).sp.logoutUrl, (this as unknown as SsoClient).sp.logoutMethod, data))
        }
    },
    signIdp: {
        value: function (data: A): Promise<ResponseData> {
            return req(opReqObj((this as unknown as SsoClient).idp.signUrl, (this as unknown as SsoClient).idp.signMethod, data))
        }
    },
    sendVerification: {
        value: function (data: A): Promise<ResponseData> {
            return req(opReqObj((this as unknown as SsoClient).idp.verificationUrl, (this as unknown as SsoClient).idp.verificationMethod, data))
        }
    }
})
let createSsoClient = (idp: Idp, sp: Sp): SsoClient => Object.create(obj, {
    idp: {
        value: {
            loginUrl: idp.loginUrl || '',
            signUrl: idp.signUrl || '',
            loginMethod: idp.loginMethod || '',
            signMethod: idp.signMethod || '',
            verificationUrl: idp.verificationUrl || '',
            verificationMethod: idp.verificationMethod || '',
        }
    },
    sp: {
        value: {
            loginUrl: sp.loginUrl || '',
            loginMethod: sp.loginMethod || '',
            signUrl: sp.signUrl || '',
            signMethod: sp.signMethod || '',
            logoutUrl: sp.logoutUrl || '',
            logoutMethod: sp.logoutMethod || '',
        }
    },
})


export {
    // login,
    createSsoClient,
}
export type {
    // SsoClientParams
    // createSsoClient
    SsoClient,
}