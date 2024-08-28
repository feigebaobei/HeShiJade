import { Subject } from 'rxjs';
// type
import type { A, S } from 'src/types/base';

let clog = console.log
type Cb = (payload: A) => void

export class ShareEventService {
  private subject = new Subject()
  private _map: Map<S, Set<Cb>>
  constructor() {
    this._map = new Map()
  }
  emit(eventName: S, payload: A) {
    this.subject.next({eventName, payload})
  }
  listen(eventName: S, cb: Cb) {
    if (this._map.has(eventName)) {
      this._map.get(eventName)?.add(cb)
    } else {
      let set = new Set<Cb>()
      set.add(cb)
      this._map.set(eventName, set)
    }
    this.subject.asObservable().subscribe((nextValue: A) => {
      let set = this._map.get(nextValue.eventName)
      if (set) {
        Array.from(set.values()).forEach(cb => {
          cb(nextValue.payload)
        })
      }
    })
  }
  clear() {
    this._map.clear()
  }
  unListenEventName(eventName: S) {
    this._map.delete(eventName)
  }
  unListenCb(eventName: S, cb: Cb) {
    this._map.get(eventName)?.delete(cb)
  }
  getEventName() {
    return Array.from(this._map.keys())
  }
}

export default new ShareEventService()