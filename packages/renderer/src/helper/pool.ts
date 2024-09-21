
import { Queue } from "data-footstone"
import type { ULID } from "src/types"
import type { A, F, S } from "src/types/base"
import type { Component } from "src/types/component"

let clog = console.log


class Pool {
    private ulidEventMap: Map<ULID, Map<S, Queue<F>>>
    private ulidComponentMap: Map<ULID, A>
    constructor() {
        this.ulidEventMap = new Map()
        this.ulidComponentMap = new Map()
    }
    registerEvent(ulid: ULID, event: S, fn: F) {
        if (!ulid || !event || !fn) {
            return
        }
        if (this.ulidEventMap.has(ulid)) {
            let q = this.ulidEventMap.get(ulid)!.get(event)
            if (q) {
                q.enqueue(fn)
            }
        } else {
            let q = new Queue()
            q.enqueue(fn)
            let m = new Map()
            m.set(event, q)
            this.ulidEventMap.set(ulid, m)
        }
    }
    getEventQueue(ulid: ULID, event: S) {
        let m = this.ulidEventMap.get(ulid)
        if (m) {
            let q = m.get(event)
            return q
        } else {
            return undefined
        }
        // if (event) {
        // } else {
        //     let m = this.ulidEventMap.get(ulid)
        //     return m
        // }
    }
    getEventArray(ulid: ULID, event: S) {
        let a = this.getEventQueue(ulid, event)
        if (a) {
            return a.toArray()
        } else {
            return []
        }
    }
    unRegisterEvent(ulid: ULID) {
        return this.ulidEventMap.delete(ulid)
    }
    registerComponentInstance(ulid: ULID, c: A) {
        this.ulidComponentMap.set(ulid, c)
    }
    getComponentInstance(ulid: ULID) {
        return this.ulidComponentMap.get(ulid)
    }
    unRegisterComponentInstance(ulid: ULID) {
        this.ulidComponentMap.delete(ulid)
    }
    register(ulid: ULID, componentInstance: A, behavior: Component['behavior'] ) {
        // 注册组件实例
        this.registerComponentInstance(ulid, componentInstance)
        // 注册事件
        behavior.forEach((b) => {
          let f = new Function('getComponentInstance', b.fnBody)
          pool.registerEvent(ulid, b.event, f)
        })
    }
    unRegister(ulid: ULID) {
        this.unRegisterComponentInstance(ulid)
        this.unRegisterEvent(ulid)
    }
}
let pool = new Pool()
let getComponentInstance = pool.getComponentInstance
export {
    Pool,
    pool,
    getComponentInstance,
}