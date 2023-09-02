import type { ResponseData } from '../types';
import type { Observable } from 'rxjs';
let reqToPromise = (fn: Observable<ResponseData>) => {
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

export {
    reqToPromise
}