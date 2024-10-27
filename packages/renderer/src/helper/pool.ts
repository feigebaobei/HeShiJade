
import { Queue } from "data-footstone"
import type { ULID } from "src/types"
import type { A, F, O, Oa, S } from "src/types/base"
import type { Component } from "src/types/component"

let clog = console.log


class Pool {
    private ulidEventMap: Map<ULID, Map<S, Queue<F>>>
    private ulidComponentMap: Map<ULID, A>
    private pluginMap: Map<S, Oa>
    constructor() {
        this.ulidEventMap = new Map()
        this.ulidComponentMap = new Map()
        this.pluginMap = new Map()
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
          // 可以使用入参
          // 也可以使用方法体前缀
        //   let f = new Function('getComponentInstance', 'plugins', 'thirdParams', b.fnBody)
          let f = new Function('utils', 'plugins', 'thirdParams', b.fnBody)
          pool.registerEvent(ulid, b.event, f)
        })
    }
    unRegister(ulid: ULID) {
        this.unRegisterComponentInstance(ulid)
        this.unRegisterEvent(ulid)
    }
    registerPlugin(k: S, v: Oa) {
        this.pluginMap.set(k, v)
    }
    getPlugin(k: S) {
        return this.pluginMap.get(k)
        // {
        //     profile
        //     hooks
        //     fnx
        // }
    }
    unRegisterPlugin(k: S) {
        this.pluginMap.delete(k)
    }
    getPluginFn() {
        let o: Oa = {}
        Array.from(this.pluginMap.keys()).forEach((k) => {
            o[k] = this.getPluginFnByKey(k)
        })
        return o
    }
    // 使用 plugins.$key.fnx
    getPluginFnByKey(k: S) {
        let o = this.getPlugin(k)
        if (o) {
            let t: Oa = {}
            Object.entries(o).forEach(([k, v]) => {
                if (!['profile', 'hooks'].includes(k)) {
                    t[k] = v
                }
            })
            return t
        } else {
            return undefined
        }
    }
    runHooks(hookFn: S, pluginKey?: S) {
        if (pluginKey) {
            let pluginObj = this.getPluginFnByKey(pluginKey)
            if (pluginObj) {
                pluginObj['hooks'][hookFn] && pluginObj['hooks'][hookFn]()
            }
        } else {
            Array.from(this.pluginMap.values()).forEach((pluginObj) => {
                pluginObj['hooks'][hookFn] && pluginObj['hooks'][hookFn]()
            })
        }
    }
    // setProps(obj) {
    //     this[key] = 
    // }
}
let pool = new Pool()
let getComponentInstance = pool.getComponentInstance
export {
    Pool,
    pool,
    getComponentInstance,
}