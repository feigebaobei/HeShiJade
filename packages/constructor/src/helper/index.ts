import { ulid } from 'ulid';
import {componentDefaultConfigAll} from 'src/helper/component'

// type
import type { A, F, N, S, OA, B } from 'src/types/base';
import type { ResponseData, ULID } from '../types';
import type { Observable } from 'rxjs';
import type { Component, GridLayout} from 'src/types/component';
import type { App } from 'src/types/app';

interface LoopPropotype {
  launch: (...p: A[]) => Promise<A>
}
interface Loop extends LoopPropotype {
  pFn: () => Promise<A>
  bFn: (p: A) => B
  interval: N
}

let clog = console.log
// clog('clone', clone)

const VERSION = 0 // 按照圆周率的数值

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

// 获取数据类型
let getType = (o: A) => Object.prototype.toString.call(o).slice(8, -1) // 返回构造函数的名字 大写开头
// 深复制
let cloneDeep = (v: A): A => {
  let baseType = ['string', 'number', 'boolean', 'undefined', 'bigint', 'symbol']
  let res
  if (baseType.includes(typeof v)) {
      res = v
  } else { // null array object date set map function
      if (!v) {
          res = v
      } else {
          if (Array.isArray(v)) {
              res = v.map((item: A) => cloneDeep(item))
          } else {
              let t: A = {}
              Object.entries(v).forEach(([k, v]) => {
                let type = getType(v)
                switch (type) {
                  case 'Function':
                    t[k] = v
                    break;
                  case 'Set':
                    t[k] = new Set(Array.from(v as Set<A>).map(item => {
                      return cloneDeep(item)
                    }))
                    break;
                  case 'Map':
                    t[k] = new Map(Array.from(v as Map<A, A>).map(([k, v]) => ([cloneDeep(k), cloneDeep(v)])))
                    break;
                  case 'Date':
                    t[k] = new Date(v as unknown as Date)
                    break;
                  case 'Object':
                    t[k] = cloneDeep(v)
                    break;
                  default:
                    t[k] = v // 当发现新类型里再添加，先用引用处理。
                    break;
                }
              })
              res = t
          }
      }
  }
  return res
}
// cloneDeep = (v) => {
//   return structuredClone(v)
// }
// let cloneDeep = <T>(v: T): Promise<T> => {
//   return new Promise(resolve => { 
//     const { port1, port2 } = new MessageChannel() 
//     port2.onmessage = ev => resolve(ev.data)
//     port1.postMessage(v)
//   }) 
// }
let initComponentMeta = (
  category: S = '',
  appUlid: ULID = '', pageUlid: ULID = '',
  prevUlid: S = '', nextUlid: S = '', parentUlid: S = '',
  mount: Component['mount'] = {area: ''},
  gridLayout: GridLayout, // = {x: 4, y: 4, w: 4, h: 4}
): Component => {
  return {
    ulid: ulid(),
    type: category,
    prevUlid,
    nextUlid,
    parentUlid,
    mount,
    props: cloneDeep(componentDefaultConfigAll[category].props),
    behavior: cloneDeep(componentDefaultConfigAll[category].behavior),
    items: cloneDeep(componentDefaultConfigAll[category].items),
    slots: cloneDeep(componentDefaultConfigAll[category].slots),
    appUlid,
    pageUlid,
    gridLayout,
  }
}
let initPageMeta = (key: S = '', name: S = '',
  prevUlid: S = '', nextUlid: S = '', 
  appUlid: ULID = '') => {
  // let app = this.appService.getCurApp()
  return {
    key,
    name,
    ulid: ulid(),
    prevUlid,
    nextUlid,
    appUlid,
    childUlid: '',
    firstComponentUlid: '',
    // lastComponentUlid: '',
  }
}
let initAppMeta = (key: S = '', name: S = '', theme: S = '', owner: S = '', version:N = VERSION): App => {
  return {
    key,
    name,
    ulid: ulid(),
    theme,
    version,
    // owner: (this.userService.getUser()?.account as S),
    owner, // : (this.userService.getUser()?.profile.email as Email), // 考虑一下，email好还是id好。 // id好
    collaborator: [],
    firstPageUlid: '',
    prevUlid: '',
    nextUlid: '',
  }
}
let createChildKey = (prefix: 'items' | 'slots', key: S | N, type: '' | 'ulid' | 'node' | 'component' = '') => {
  return `${prefix}_${key}_${type}`
}

// 方法重载
// // 先签名，就是定义类型
// function cleanout(value: number, myName: string): Message
// function cleanout(value: MessageType, readRecordCount: number): Message[]
// // 再实现，
let cleanoutApp = (p: A) : App => {
  let initApp = initAppMeta()
  // 只取需要变动的字段。
  initApp.key = p.key
  initApp.name = p.name
  initApp.ulid = p.ulid
  initApp.theme = p.theme
  // 使用版本号
  initApp.owner = p.owner
  initApp.collaborator = p.collaborator
  initApp.firstPageUlid = p.firstPageUlid
  initApp.prevUlid = p.prevUlid
  initApp.nextUlid = p.nextUlid
  return initApp
}
let cleanoutPage = (p: A) => {
  let initPage = initPageMeta()
  initPage.key = p.key
  initPage.name = p.name
  initPage.ulid = p.ulid
  initPage.prevUlid = p.prevUlid
  initPage.nextUlid = p.nextUlid
  initPage.appUlid = p.appUlid
  initPage.childUlid = p.childUlid
  initPage.firstComponentUlid = p.firstComponentUlid
  // initPage.lastComponentUlid = p.lastComponentUlid
  return initPage
}
// let cleanoutComponent = (p: A) => {
//   let initComponent = initComponentMeta()
//   initComponent.ulid = p.ulid
//   initComponent.type = p.type
//   initComponent.prevUlid = p.prevUlid
//   initComponent.nextUlid = p.nextUlid
//   initComponent.parentUlid = p.parentUlid
//   initComponent.mount = p.mount
//   initComponent.props = p.props
//   initComponent.behavior = p.behavior
//   initComponent.items = p.items
//   initComponent.slots = p.slots
//   initComponent.appUlid = p.appUlid
//   initComponent.pageUlid = p.pageUlid
//   return initComponent
// }
let sleep = (n: N = 0) => {
  return new Promise((s) => {
    setTimeout(() => {s(true)}, n)
  })
}

let loopPropotype = Object.create({}, {
  launch: {
    value: function (...p: A[]) {
      return this.pFn(...p).then((r: A) => {
        if (this.bFn(r)) { // 若满足条件则继承，否则返回结果。
          return sleep(this.interval).then(() => {
            return this.launch(...p)
          })
        } else {
          return r
        }
      })
    }
  }
})
let createLoop = (pFn: F, bFn: F, i: N = 0): Loop => {
  return Object.create(loopPropotype, {
    pFn: {
      value: pFn
    },
    bFn: {
      value: bFn
    },
    interval: {
      value: i
    },
  })
}

// 处理为一个类
// let wrapReq = () => {
//   let http = new HttpClient()
//   return new Promise((s, j) => {
//     http
//   })
// }
let createDebounceFn = (fn: F, t = 250, self?: A) => {
  let timer: N
  return (...rest: A[]) => {
    let context = self
    if (timer) {
      clearTimeout(timer)
      timer = 0
    // } else {
    }
    timer = window.setTimeout(() => {
      fn.apply(context, rest)
      clearTimeout(timer)
      timer = 0
    }, t)
  }
}
let copy = (str: S): Promise<void> | Promise<boolean> => {
  let p
  if (window.isSecureContext && navigator.clipboard) {
    p = navigator.clipboard.writeText(str)
  } else {
    let ele = document.createElement('textarea')
    let styles = ele.style
    styles.position = 'fixed'
    styles.zIndex = '0'
    styles.left = '-500px'
    styles.top = '-500px'
    ele.value = str
    document.body.appendChild(ele)
    ele.focus()
    ele.select()
    let result = document.execCommand('copy')
    ele.remove()
    p = Promise.resolve(true)
  }
  return p
}
// 兼容的数组，常用于处理脏数据。
let compatibleArray = (a: A) => Array.isArray(a) ? Array.from(a) : []
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

export {
  VERSION,
  reqToPromise,
  cloneDeep,
  // createCompKey,
  createDebounceFn,
  initComponentMeta,
  initPageMeta,
  initAppMeta,
  createChildKey,
  cleanoutApp,
  cleanoutPage,
  // cleanoutComponent,
  createLoop,
  // wrapReq,
  sleep,
  copy,
  compatibleArray,
  asyncFn,
}
export type {
  Loop
}