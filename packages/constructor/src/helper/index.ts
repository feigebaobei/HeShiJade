import { ulid } from 'ulid';
import {componentDefaultConfigAll} from 'src/helper/component'
// type
import type { A, F, N, S } from 'src/types/base';
import type { ResponseData, ULID } from '../types';
import type { Observable } from 'rxjs';
import type { Component } from 'src/types/component';

let reqToPromise = <T>(fn: Observable<ResponseData>): Promise<T> => {
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

// 获取数据类型
let getType = (o: A) => Object.prototype.toString.call(o).slice(8, -1) // 返回构造函数的名字 大写开头
// 深复制对象
let cloneDeep: <T>(p: T, c: T) => T = (p: A, c: A) => {
  for (let k in p) {
    if (p.hasOwnProperty(k)) {
      if (typeof p[k] === 'object') {
        // c[k] = getType(p[k]) === 'Array' ? [] : {}
        c[k] = Array.isArray(p[k]) ? [] : {}
        cloneDeep(p[k], c[k])
      } else {
        c[k] = p[k]
      }
    }
  }
  return c
}
let createDebounceFn = (fn: F, t = 250, self?: A) => {
  var timer: N
  return (...rest: A[]) => {
    var context = self
    if (timer) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn.apply(context, rest)
    }, t)
  }
}
let initComponentMeta = (category: S, appUlid: ULID, pageUlid: ULID, prevUlid: S = '', nextUlid: S = ''): Component => {
  return {
    ulid: ulid(),
    type: category,
    prevUlid,
    nextUlid,
    props: componentDefaultConfigAll[category].props,
    behavior: componentDefaultConfigAll[category].behavior,
    items: componentDefaultConfigAll[category].items,
    slots: componentDefaultConfigAll[category].slots,
    appUlid,
    pageUlid,
  }
}


export {
  reqToPromise,
  cloneDeep,
  // createCompKey,
  createDebounceFn,
  initComponentMeta,
}