import type { ResponseData, ULID } from '../types';
import type { Observable } from 'rxjs';

// 因类型不以，无法使用此方法了。
let reqToPromise = (fn: Observable<ResponseData>) => {
    return new Promise((s, j) => {
      fn.subscribe(res => {
        if (res.code === 0) {
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }

// let createCompKey = (appUlid: ULID, pageUlid: ULID) => {
//   return `${appUlid}_${pageUlid}`
// }
  
export {
  reqToPromise,
  // createCompKey,
}