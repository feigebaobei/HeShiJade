// import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
// import * as all from './index';
// type
import type { A, S, F } from 'src/types/base';
import { compatibleArray } from './index';

let clog = console.log
type Cb = (payload: A) => void

// export class ShareEventService {
//   private subject = new Subject()
//   private _map: Map<S, Set<Cb>>
//   // private _emit: F
//   constructor() {
//     this._map = new Map()
//     // this._emit = all.createDebounceFn((nextValue: A) => {
//     //   let set = this._map.get(nextValue.eventName)
//     //   clog('set', set, nextValue.eventName)
//     //   if (set) {
//     //     Array.from(set.values()).forEach(cb => {
//     //       clog('cb', cb)
//     //       cb(nextValue.payload)
//     //     })
//     //   }
//     // })
//   }
//   emit(eventName: S, payload: A) {
//     clog('share-event emit', eventName, payload)
//     this.subject.next({eventName, payload})
//   }
//   listen(eventName: S, cb: Cb) {
//     if (this._map.has(eventName)) {
//       this._map.get(eventName)?.add(cb)
//     } else {
//       let set = new Set<Cb>()
//       set.add(cb)
//       this._map.set(eventName, set)
//     }
//     clog('listen', eventName)
//     this.subject.asObservable().subscribe((nextValue: A) => {
//     // this.subject.subscribe((nextValue: A) => {
//         let set = this._map.get(nextValue.eventName)
//         clog('set', set, nextValue.eventName)
//         if (set) {
//           Array.from(set.values()).forEach(cb => {
//             clog('cb', cb)
//             cb(nextValue.payload)
//           })
//         }
//     })
//   }
//   clear() {
//     this._map.clear()
//   }
//   unListenEventName(eventName: S) {
//     this._map.delete(eventName)
//   }
//   unListenCb(eventName: S, cb: Cb) {
//     this._map.get(eventName)?.delete(cb)
//   }
//   getEventName() {
//     return Array.from(this._map.keys())
//   }
// }

export class ShareEventService {
  private _map: Map<S, Set<Cb>>
  constructor() {
    this._map = new Map()
  }
  on(eventName: S, cb: Cb) {
    let set = this.getCb(eventName)
    if (set) {
      set.add(cb)
    } else {
      this._map.set(eventName, new Set([cb]))
    }
  }
  listen(eventName: S, cb: Cb) { // todo 请使用on
    this.on(eventName, cb)
  }
  off(eventName: S, cb?: Cb) {
    let set = this.getCb(eventName)
    if (set) {
      if (cb) {
        set.delete(cb)
      } else {
        this._map.delete(eventName)
      }
    }
  }
  unListenEventName(eventName: S) { // todo 请使用off
    this.off(eventName)
  }
  unListenCb(eventName: S, cb: Cb) { // todo 请使用off
    this.off(eventName, cb)
  }
  emit(eventName: S, payload: A) {
    let set = this.getCb(eventName)
    if (set) {
      let arr = [...set]
      arr.forEach(cb => {
          cb(payload)
        })
    }
  }
  private getCb(eventName: S) {
    return this._map.get(eventName)
  }
}
export default new ShareEventService()