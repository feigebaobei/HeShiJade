// for delete 2024/12.01+
import { A, S } from 'src/types/base';

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
  // listen(eventName: S, cb: Cb) { // todo 请使用on
  //   this.on(eventName, cb)
  // }
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
  // unListenEventName(eventName: S) { // todo 请使用off
  //   this.off(eventName)
  // }
  // unListenCb(eventName: S, cb: Cb) { // todo 请使用off
  //   this.off(eventName, cb)
  // }
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