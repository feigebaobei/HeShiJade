import { Subject } from 'rxjs';
// type
import type { A, S } from 'src/types/base';

let clog = console.log

export class ShareEventService {
  private subject = new Subject()
  constructor() {
    
  }
  emit(eventName: S, payload: A) {
    this.subject.next({eventName, payload})
  }
  listen(eventName: S, cb: (payload: A) => void) {
    this.subject.asObservable().subscribe((nextValue: A) => {
      if (nextValue.eventName === eventName) {
        cb(nextValue.payload)
      }
    })
  }
  unlisten(eventName: S, cb?: (payload: A) => void) {
    this.subject.asObservable().subscribe
  }
}

export default new ShareEventService()