
import { Queue } from "data-footstone"
import type { ULID } from "src/types"
import type { F, S } from "src/types/base"

class Pool {
    private _ulidMap: Map<ULID, Map<S, Queue<F>>>
    constructor() {
        this._ulidMap = new Map()
    }
    getQueue(ulid: ULID, event: S) {
        let m = this._ulidMap.get(ulid)
        if (m) {
            let q = m.get(event)
            return q
        } else {
            return undefined
        }
        // if (event) {
        // } else {
        //     let m = this._ulidMap.get(ulid)
        //     return m
        // }
    }
    bind(ulid: ULID, event: S, fn: F) {
        if (!ulid || !event || !fn) {
            return
        }
        if (this._ulidMap.has(ulid)) {
            let q = this._ulidMap.get(ulid)!.get(event)
            if (q) {
                q.enqueue(fn)
            }
        } else {
            let q = new Queue()
            q.enqueue(fn)
            let m = new Map()
            m.set(event, q)
            this._ulidMap.set(ulid, m)
        }
    }
    unbind(ulid: ULID) {
        return this._ulidMap.delete(ulid)
    }
}
// let getComponentInstance = () => {}
let pool = new Pool()
let getComponentInstance = (ulid: ULID) => {
    // pool.get(ulid)
}
export {
    Pool,
    pool,
    getComponentInstance,
}