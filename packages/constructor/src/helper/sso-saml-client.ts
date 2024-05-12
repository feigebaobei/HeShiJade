import { req } from './axios'
// type
import type { Method,RequestData,
    ResponseData, } from './axios'
import type { A, Ao, N, S } from "src/types/base"

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
let login = (obj: SsoClientParams) => {
    return req(opReqObj(obj.idp.url, obj.idp.method, obj.idp.data)).then((idpRes: ResponseData) => {
        return req(opReqObj(obj.sp.url, obj.sp.method, idpRes.data)).then((spRes) => {
            return {
                idpRes,
                spRes,
            }
        })
    })
}
export {
    login
}
export type {
    SsoClientParams
}