import { req } from './axios'
// type
import type { Method,RequestData,
    ResponseData, } from './axios'
import type { A, Ao, F, N, S } from "src/types/base"

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

let opReqObj = (url: S, method: Method, data: A): RequestData => {
    let reqObj: A = {
        url,
        method,
    }
    switch(method) {
        case 'get': 
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


export {
    login,
}
export type {
    SsoClientParams
}