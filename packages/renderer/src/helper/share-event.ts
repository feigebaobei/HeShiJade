// import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { A, S } from 'src/types/base';
// import {}

// @Injectable({
//   providedIn: 'root'
// })
export class ShareEventService {
  private subject = new Subject()
  constructor() {}
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
}

export default new ShareEventService()