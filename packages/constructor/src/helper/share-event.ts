// type
import type { A, S, } from 'src/types/base';

let clog = console.log
type Cb = (payload: A) => void

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
  emit(eventName: S, payload?: A) {
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