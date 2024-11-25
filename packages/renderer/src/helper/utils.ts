import { req, } from "./req"
import { pool, 
    // getComponentInstance
 } from "./pool"
import type { ULID } from "src/types"
import type { A, S } from "src/types/base"

// let getComponentInstance = pool.getComponentInstance
let clog = console.log

class PromiseControllable<T = unknown> {
    resolve: (value: T) => void
    reject: (value?: T) => void
    promise: Promise<T>
    constructor () {
      this.resolve = () => {}
      this.reject = () => {}
      this.promise = new Promise((s, j) => {
        this.resolve = s
        this.reject = j
      })
    }
}

// let trigger = (ulid: ULID, eventName: S, thirdParams: A, self?: A) => {
//     let fnArr = pool.getEventArray(ulid, eventName)
//     fnArr.forEach(f => {
//         f.bind(self)
//         f(utils, pool.getPluginFn, thirdParams,)
//     })
// }

// let utils = {
//     req,
//     // getComponentInstance,
//     // trigger,
//     PromiseControllable,
// }
export {
    // utils,
    req,
    // getComponentInstance,  //: pool.getComponentInstance,
    // trigger,
    pool,
    PromiseControllable,
}