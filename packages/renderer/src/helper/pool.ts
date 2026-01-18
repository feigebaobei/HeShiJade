
import { Queue } from "data-footstone"
import * as utils from "./utils"
import { PromiseControllable, } from "./utils"
import { getLoopEventParams } from "src/helper";
import { Component, Directive } from "@angular/core";
import type { ULID } from "src/types"
import type { A, F, O, Oa, S, B, N, } from "src/types/base"
import type { Component as Comp } from "src/types/component"
import type { componentInstanceData } from "src/types/component";

let clog = console.log
type PageUlid = ULID
type ComponentUlid = ULID


class Pool {
    private ulidEventMap: Map<ULID, Map<S, Queue<F>>>
    private ulidComponentMap: Map<ULID, A>
    private pluginMap: Map<S, Oa>
    private rendereredMap: Map<PageUlid, Map<ComponentUlid, PromiseControllable<B>>>
    constructor() {
        this.ulidEventMap = new Map()
        this.ulidComponentMap = new Map()
        this.pluginMap = new Map()
        this.rendereredMap = new Map()
    }
    registerEvent(ulid: ULID, event: S, fn: F) {
        if (!ulid || !event || !fn) {
            return
        }
        if (this.ulidEventMap.has(ulid)) {
            let m = this.ulidEventMap.get(ulid)!
            let q = m?.get(event)
            if (q) {
                q.enqueue(fn)
            } else {
                let q = new Queue<Function>()
                q.enqueue(fn)
                m.set(event, q)
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
    register(ulid: ULID, componentInstance: A, behavior: Comp['behavior'] ) {
        // 注册组件实例
        this.registerComponentInstance(ulid, componentInstance)
        // 注册事件
        behavior.forEach((b) => {
          // 可以使用入参
          // 也可以使用方法体前缀
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
    // 记录页面内的组件是否渲染出视图。
    // Map<pageUlid, Map<componentUlid: Promise<B>>>
    // Map<componentUlid: Promise<B>>
    trigger(ulid: ULID, eventName: S, thirdParams: A, self?: A) {
        let fnArr = this.getEventArray(ulid, eventName)
        fnArr.forEach(f => {
            f.bind(self)
            // clog(f)
            f(utils, pool.getPluginFn(), thirdParams,)
        })
    }
    registerComponentRender(pageUlid: ULID, componentUlidList: ULID[]) {
        let m = new Map<ComponentUlid, PromiseControllable<B>>()
        // clog('componentUlidList', pageUlid, componentUlidList)
        componentUlidList.forEach(componentUlid => {
            // clog('componentUlid', componentUlid)
            m.set(componentUlid, new PromiseControllable())
        })
        this.rendereredMap.set(pageUlid, m)
        let pArr = Array.from(m.values()).map(pc => pc.promise)
        // clog('pArr', pArr)
        Promise.all(pArr).then(() => {
            // clog('then', pArr)
            this.trigger(pageUlid, 'postPageRender', undefined, undefined)
            this.unRegisterComponentRender(pageUlid)
        })
    }
    resolveComponentRender(pageUlid: ULID, componentUlid: ULID) {
        let componentMap = this.rendereredMap.get(pageUlid)
        componentMap?.get(componentUlid)?.resolve(true)
    }
    unRegisterComponentRender(pageUlid: ULID) {
        this.rendereredMap.delete(pageUlid)
    }
}
let pool = new Pool()
// let getComponentInstance = '' // pool.getComponentInstance.bind(pool)

// @Directive()
@Component({
    template: ''
})
class CompBase {
    data!: componentInstanceData
    loopIndex!: N
    pool: Pool
    getLoopEventParams: typeof getLoopEventParams
    constructor() {
        this.pool = pool
        this.getLoopEventParams = getLoopEventParams
    }
    setProps(o: O) {
        Object.entries(o).forEach(([k, v]) => {
            this.data.props[k] = v
        })
    }
    ngOnChanges() {
        this.pool.trigger(this.data.ulid, 'postComponentNgOnChanges', this.getLoopEventParams(this.loopIndex, undefined), this)
    }
    ngOnInit() {
        this.pool.register(this.data.ulid, this, this.data.behavior)
        this.pool.trigger(this.data.ulid, 'postComponentNgOnInit', this.getLoopEventParams(this.loopIndex, undefined), this)
    }
    ngDoCheck() {
        this.pool.trigger(this.data.ulid, 'postComponentNgDoCheck', this.getLoopEventParams(this.loopIndex, undefined), this)
    }
    ngAfterViewInit() {
        this.pool.trigger(this.data.ulid, 'postComponentNgAfterViewInit', this.getLoopEventParams(this.loopIndex, undefined), this)
        this.pool.resolveComponentRender(this.data.pageUlid, this.data.ulid)
    }
    ngOnDestroy() {
        this.pool.trigger(this.data.ulid, 'postComponentNgOnDestroy', this.getLoopEventParams(this.loopIndex, undefined), this)
        this.pool.unRegister(this.data.ulid)
    }
}
export {
    Pool,
    pool,
    CompBase,
    // getComponentInstance,
}