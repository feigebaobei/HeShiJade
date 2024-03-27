import { A, O, S } from 'src/types/base';
import type { ResponseData, ULID } from '../types';
import type { Observable } from 'rxjs';
import { DoublyChain } from 'data-footstone';
import shareEvent from './share-event';


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

let arrToChain = <T extends {[k: S]: A}>(arr: T[], mainKey: S, nextKey: S, first?: S): DoublyChain<T> => {
  let dc = new DoublyChain<T>()
  let curKey: S | undefined = first
  while (curKey) {
    let ele = arr.find(item => item[mainKey] === curKey)
    if (ele) {
      dc.append(ele)
      curKey = ele[nextKey]
    } else {
      curKey = undefined
    }
  }
  return dc
}
let {log: clog, dir: cdir} = console



export {
  reqToPromise,
  // createCompKey,
  arrToChain,
  shareEvent,
  clog,
  cdir,
}