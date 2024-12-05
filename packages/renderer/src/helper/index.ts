import type { A, N, S, F } from 'src/types/base';
import type { ResponseData, ULID } from '../types';
import type { Observable } from 'rxjs';
// import { DoublyChain } from 'data-footstone';

let reqToPromise = (fn: Observable<ResponseData>): Promise<ResponseData> => {
    return new Promise((s, j) => {
      fn.subscribe((res: ResponseData) => {
        // if (res.code === 0) {
        //   s(res.data as T)
        // } else {
        //   j(new Error(res.message))
        // }
        s(res)
      })
    })
  }

// let createCompKey = (appUlid: ULID, pageUlid: ULID) => {
//   return `${appUlid}_${pageUlid}`
// }

// let arrToChain = <T extends {[k: S]: A}>(arr: T[], mainKey: S, nextKey: S, first?: S): DoublyChain<T> => {
//   let dc = new DoublyChain<T>()
//   let curKey: S | undefined = first
//   while (curKey) {
//     let ele = arr.find(item => item[mainKey] === curKey)
//     if (ele) {
//       dc.append(ele)
//       curKey = ele[nextKey]
//     } else {
//       curKey = undefined
//     }
//   }
//   return dc
// }
let {log: clog, dir: cdir} = console

let createChildKey = (prefix: 'items' | 'slots', key: S | N, type: '' | 'ulid' | 'node' | 'component' = '') => {
  return `${prefix}_${key}_${type}`
}
let asyncFn = (fn: F, timing: N = 0, ...p: A) => {
  return new Promise((s, j) => {
    setTimeout(() => {
      // fn(...p)
      s(p)
    }, timing)
  }).then((p: A) => {
    fn(...p)
  })
}
// 兼容的数组，常用于处理脏数据。
let compatibleArray = (a: A) => Array.isArray(a) ? Array.from(a) : []

export {
  reqToPromise,
  // createCompKey,
  // arrToChain,
  clog,
  cdir,
  createChildKey,
  asyncFn,
  compatibleArray,
}