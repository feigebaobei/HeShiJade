// type
import type { A, S, ULID, } from 'src/types/base';

let clog = console.log
type Cb = (payload: A) => void

// export 
class ShareEventService {
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
    return () => this.off(eventName, cb)
  }
  off(eventName: S, cb?: Cb) {
    let set = this.getCb(eventName)
    if (set) {
      if (cb) {
        set.delete(cb)
      } else {
        set.clear()
        this._map.delete(eventName)
      }
    }
  }
  emit(eventName: S, payload?: A) {
    let set = this.getCb(eventName)
    if (set) {
      set.forEach(cb => cb(payload))
    }
  }
  private getCb(eventName: S) {
    return this._map.get(eventName)
  }
}
let createEventName = (
  // 组件类型_组件的ulid_组件内的字段_动作
  componentType: S,
  ulid: ULID,
  componentField: S,
  behavior: S,
) => {
  return `${componentType}_${ulid}_${componentField}_${behavior}`
}
let shareEvent = new ShareEventService()
export {
  ShareEventService,
  createEventName,
  shareEvent,
}
export default shareEvent