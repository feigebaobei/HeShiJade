import type { A, N, S, F } from 'src/types/base';
import type { ResponseData, ULID } from '../types';
import type { Observable } from 'rxjs';
import { Component } from 'src/types/component';
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
      s(p)
    }, timing)
  }).then((p: A) => {
    return Promise.resolve(fn(...p))
  })
}
// 兼容的数组，常用于处理脏数据。
let compatibleArray = (a: A) => Array.isArray(a) ? Array.from(a) : []
let isUndefined = (p: A) => p === undefined
let isNull = (p: A) => p === null
let getLoopEventParams = (loopIndex: N, thirdParams: A) => {
  if (loopIndex > -1) {
    return {
      value: thirdParams,
      loopIndex
    }
  } else {
    return thirdParams
  }
}
// 这个方法是从constructor复制过来再修改的。
let compatibleComponentData = (data: A[]): Component[] => {
  // template: Options<S, S>
  // =>
  // template: Partial<{
  //   label: S
  //   value: S | N | B
  //   valueType: 'string' | 'number' | 'boolean'
  //   disabled: B
  //   addButtonDisabled: B,
  //   miunsButtonDisabled: B
  // }>
  let newData = data.map(item => {
    if (Array.isArray(item.props.options)) {
      item.props.options.forEach((subItem: A) => {
        if (isUndefined(subItem.valueType)) { // valueType是必有字段
          switch(typeof subItem.value) {
            case 'string':
            default:
              subItem.valueType = 'string';
              break;
            case 'number':
              subItem.valueType = 'number';
              break;
            case 'boolean':
              subItem.valueType = 'boolean';
              break;
          }
        }
      })
    }
    return item as Component
  })
  // 处理其他字段再循环一次。
  return newData
}


export {
  reqToPromise,
  // createCompKey,
  // arrToChain,
  clog,
  cdir,
  createChildKey,
  asyncFn,
  compatibleArray,
  getLoopEventParams,
  isUndefined,
  isNull,
  compatibleComponentData,
}