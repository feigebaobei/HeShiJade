import { HttpClient } from '@angular/common/http';
import { effect, Injectable } from '@angular/core';
import { Queue } from 'data-footstone'
import { createTree } from 'src/helper/tree'
import { PageService } from './page.service';
import { ENV, } from 'src/types/base';
import { EnvService } from './env.service';
import { asyncFn, createChildKey } from 'src/helper/index'
import { serviceUrl } from 'src/helper/config'
import { ShareSignal } from 'src/helper/shareSignal';
// type
import type { ResponseData, ULID } from 'src/types';
import type { Component,
  ComponentMountItems,
  ComponentMountSlots, } from 'src/types/component';
import type { Tree } from 'src/helper/tree';
import { pool } from 'src/helper/pool';
// import { trigger } from 'src/helper/utils';

let clog = console.log

// 使用当前页面ulid请求组件列表。保存在map中。
// 当页面改变时判断map中是否存在对应组件列表。若不存在，则执行no.1。否则null
// 输出组件列表

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private _map: Map<ULID, Tree<Component>>
  private _componentList: Component[]
  componentListS: ShareSignal<Component[]>
  constructor(
    private http: HttpClient,
    private pageService: PageService,
    private envService: EnvService,
  ) {
    this._map = new Map()
    this._componentList = []
    this.componentListS = new ShareSignal([])
    effect(() => {
      let curPage = this.pageService.curS.get()
      if (curPage) {
        pool.trigger(curPage.ulid, 'prePageLoad', undefined, undefined)
        asyncFn(() => {
          let arr: Component[] = this._map.get(curPage.ulid)?.root?.toArray() || []
          if (arr.length) {
            this.setList(arr)
            pool.trigger(curPage.ulid, 'postPageLoad', undefined, this)
            pool.registerComponentRender(curPage.ulid, arr.map(item => item.ulid))
          } else {
            this.reqList(curPage.ulid, this.envService.getCur())
            .then(() => {
              pool.trigger(curPage.ulid, 'postPageLoad', undefined, this)
              pool.registerComponentRender(curPage.ulid, this.getList().map(item => item.ulid))
            })
          }
        })  
      }
    })
  }
  reqList(pageUlid: ULID, env: ENV) {
    return this._reqComponentByPage(pageUlid, env).then(componentList => {
      let page = this.pageService.getCur()
      let curComp = componentList.find(item => item.ulid === page?.firstComponentUlid)
      let tree = createTree<Component>()
      if (curComp) {
        tree.mountRoot(curComp)
        let q = new Queue<{
          // position: 'next' | 'child'
          // slot?: S
          // component: Component
          // ulid: ULID
          component: Component
          mountMethod: 'next' | 'items' | 'slots'
        }>()
        let nextComp = componentList.find(item => item.ulid === curComp?.nextUlid)
        if (nextComp) {
          q.enqueue({
            // position: 'next',
            // component: nextComp,
            // ulid: curComp.ulid,
            component: nextComp,
            mountMethod: 'next',
          })
        }
        Object.entries(curComp.slots).forEach(([key, value]) => {
          let comp = componentList.find(item => item.ulid === value)
          if (comp) {
            q.enqueue({
              // position: 'child',
              // component: comp,
              // ulid: curComp!.ulid,
              // slot: key,
              component: comp,
              mountMethod: 'slots',
            })
          }
        })
        curComp.items.forEach((item) => {
          let comp = componentList.find(ele => ele.ulid === item['childUlid'])
          if (comp) {
            q.enqueue({
              component: comp,
              mountMethod: 'items',
            })
          }
        })
        let i = 0 // 为了开发时安全
        while (!q.isEmpty() && i < 100) {
          i++
          let cur = q.dequeue() // || curComp
          switch(cur.mountMethod) {
            case 'next':
              tree.mountNext(cur.component, cur.component.prevUlid)
              break
            case 'items':
              tree.mountChild(cur.component, cur.component.parentUlid,
                createChildKey('items', (cur.component.mount as ComponentMountItems).itemIndex, 'node')
                )
                break;
            case 'slots':
              tree.mountChild(cur.component, cur.component.parentUlid,
                createChildKey('slots', (cur.component.mount as ComponentMountSlots).slotKey, 'node')
                )
                break;
          }
          let nextComp = componentList.find(item => item.ulid === cur.component.nextUlid)
          if (nextComp) {
            q.enqueue({
              // position: 'next',
              // component: nextComp,
              // ulid: cur.component.ulid
              component: nextComp,
              mountMethod: 'next',
            })
          }
          Object.entries(cur.component.slots).forEach(([_key, value]) => {
            let comp = componentList.find(item => item.ulid === value)
            if (comp) {
              q.enqueue({
                // position: 'child',
                // slot: key,
                // component: comp,
                // ulid: cur.component.ulid
                component: comp,
                mountMethod: 'slots',
              })
            }
          })
          cur.component.items.forEach((item) => {
            let comp = componentList.find((ele) => ele.ulid === item['childUlid'])
            if (comp) {
              q.enqueue({
                component: comp,
                mountMethod: 'items',
              })
            }
          })
        }
        clog('tree', tree)
        this._map.set(page?.ulid || '', tree)
        this.setList(tree.root?.toArray() || [])
      } else {
        this._map.set(page?.ulid || '', tree)
        this.setList(tree.root?.toArray() || [])
      }
      return true
    })
  }
  private _reqComponentByPage(pageUlid: ULID, env: ENV): Promise<Component[]> {
    return new Promise((s, j) => {
      this.http.get<ResponseData>(`${serviceUrl()}/components/`, {
        params: {
          pageUlid,
          env,
        }
      }).subscribe((res) => {
        if (res.code === 0) {
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  getList() {
    return this._componentList
  }
  setList(p: Component[]) {
    this._componentList = p
    this.componentListS.set(this._componentList)
  }
  getTreeByKey(key = this.pageService.getCur()?.ulid || '') {
    return this._map.get(key)
  }
}
