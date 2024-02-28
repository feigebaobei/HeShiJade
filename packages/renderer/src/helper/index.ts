import { A, S } from 'src/types/base';
import type { ResponseData, ULID } from '../types';
import type { Observable } from 'rxjs';
import { DoublyChain } from 'data-footstone';
import shareEvent from './share-event';

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

export {
  reqToPromise,
  // createCompKey,
  arrToChain,
  shareEvent,
}