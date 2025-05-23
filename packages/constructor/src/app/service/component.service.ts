import { Injectable } from '@angular/core';
import { createTree } from 'src/helper/tree';
import { PageService } from './page.service';
import { AppService } from './app.service';
import { Queue } from "data-footstone"
import { compatibleArray, createChildKey } from 'src/helper/index'
import { shareEvent, creatEventName} from 'src/helper/share-event';
// 数据
import {categoryList} from 'src/helper/category'
import { serviceUrl } from 'src/helper/config';
import { ReqService } from './req.service';
import { ShareSignal } from 'src/helper/shareSignal';
// 类型
import type { Component, Category, 
  PropsValue, 
  BehaviorItemKey,
  ItemsMetaItem,
  ComponentMountSlots,
  BehaviorMetaItem,
 } from '../../types/component'
import type { S,
  ULID, A,
  N,
  B,
} from 'src/types/base';
import type { PropsTransfer } from 'src/types/component'
import type { Tree, Node } from 'src/helper/tree';
import type { Page } from 'src/types/page';


let clog = console.log

type CompOrUn = Component | undefined
type ComponentOrUn = Component | undefined
type UpdateType = 'props' | 'behavior' | 'slots' | 'plugin' | 'gridLayout' | 'mount'

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  // 组件类型的类型不应该使用组件的类型
  private categoryList: Category[] // 这里应该使用组件种类的类型
  curComponentS: ShareSignal<CompOrUn>
  _curCompUlid: S
  _curComponent: CompOrUn
  private _map: Map<ULID, Tree<Component>> // key: appUlid+pageUlid+componentUlid 后来改为pageUlid
  propsS: ShareSignal<PropsTransfer | undefined>

  constructor(
    private pageService: PageService,
    private appService: AppService,
    private reqService: ReqService,
  ) {
    this.categoryList = categoryList
    // 组件种类应该从前端取得，不应该从后端接口取得。
    this.curComponentS = new ShareSignal<CompOrUn>(undefined)
    this._curCompUlid = ''
    this._curComponent = undefined
    this._map = new Map()
    this.propsS = new ShareSignal<PropsTransfer | undefined>(undefined)
  }
  getCategoryList() {
    return new Promise<Category[]>((s, j) => {
      s(this.categoryList)
    })
  }
  getComponentList(page: Page, hard = false): Promise<Component[]>{
    let tree = this._map.get(page.ulid)
    if (hard) {
      return Promise.resolve(tree?.root?.toArray() || [])
    }
    if (tree) {
      return Promise.resolve(tree.root?.toArray() || [])
    } else {
      return this.reqComponentListByPage(page.ulid).then((componentList) => {
        let tree = this.opCompList(page, componentList)
        return Promise.resolve(tree.root?.toArray() || [])
      })
    }
  }
  reqComponentListByPage(pageUlid: ULID): Promise<Component[]> {
    return this.reqService.req(`${serviceUrl()}/components`, 'get', {pageUlid, env: 'dev'}).then((res) => res.data)
  }
  // 把组件组装成树，再做映射。
  opCompList(page: Page, componentList: Component[]): Tree<Component> {
    let curComponentUlid = page.firstComponentUlid
    let tree = createTree<Component>()
    if (curComponentUlid) {
      let curComp = componentList.find(item => item.ulid === curComponentUlid)
      if (curComp) {
        tree.mountRoot(curComp)
        let q = new Queue<{
          component: Component
          mountMethod: 'next' | 'items' | 'slots' // 用不到'prev'
        }>()

        let nextComp = componentList.find(item => item.ulid === curComp!.nextUlid)
        if (nextComp) {
          q.enqueue({
            component: nextComp,
            mountMethod: 'next',
          })
        }
        Object.entries(curComp.slots).forEach(([_slotKey, ulid]) => {
          let t = componentList.find(item => item.ulid === ulid)
          if (t) {
            q.enqueue({
              component: t,
              mountMethod: 'slots',
            })
          }
        })
        while (!q.isEmpty()) {
          let cur = q.dequeue()
          switch (cur.mountMethod) {
            case 'next':
              tree.mountNext(cur.component, cur.component.prevUlid)
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
              component: nextComp,
              mountMethod: 'next',
            })
          }
          Object.entries(cur.component.slots).forEach(([_slot, ulid]) => {
            let t = componentList.find(item => item.ulid === ulid)
            if (t) {
              q.enqueue({
                component: t,
                mountMethod: 'slots',
              })
            }
          })
        }
      }
    }
    console.dir(tree)
    this._map.set(page.ulid, tree)
    return tree
  }
  // 作为哪种节点返回
  private mountPosition(comp: Component): N {
    // 0 根组件
    // 1 前组件
    // 2 后组件
    // 3 items组件 不使用此情况了
    // 4 slots组件
    // 当前不支持在中间创建组件
    let n: N = 0
    if (!comp.prevUlid && !comp.nextUlid) {
      n = 0
    } else if (!comp.prevUlid && comp.nextUlid) {
      n = 1
    } else if (comp.prevUlid && !comp.nextUlid) {
      n = 2
    }
    return n
  }
  mountComponent(comp: Component,): B {
    let pageUlid = comp.pageUlid
    let tree = this._map.get(pageUlid)
    if (tree) {
      let b: B = false // 是否挂载成功
      let node: Node<Component> | undefined
      switch(this.mountPosition(comp)) {
        case 0:
          tree.mountRoot(comp)
          break
        case 1: // prev
          b = !!tree.mountPrev(comp, comp.parentUlid)
          node = tree.find(comp.prevUlid)
          if (node) {
            node.value.nextUlid = comp.ulid
          }
          node = tree.find(comp.nextUlid)
          if (node) {
            node.value.prevUlid = comp.ulid
          }
          break;
        case 2: // next
          b = !!tree.mountNext(comp, comp.prevUlid)
          node = tree.find(comp.prevUlid)
          if (node) {
            node.value.nextUlid = comp.ulid
          }
          node = tree.find(comp.nextUlid)
          if (node) {
            node.value.prevUlid = comp.ulid
          }
          break;
        case 4: // slots
          let curNode = tree.mountChild(comp, comp.parentUlid, 
            createChildKey('slots', (comp.mount as ComponentMountSlots).slotKey, 'node')
            )
          b = !!curNode
          break;
      }
      return b
    } else {
      return false
    }
  }
  // 创建组件
  reqCreateComponent(obj: Component) {
    return this.reqService.req(`${serviceUrl()}/components`, 'post', obj).then(() => true)
  }
  // 删除指定组件及其子组件
  reqDeleteComponent(ulid?: ULID, childrenUlid: ULID[] = []) {
    return this.reqService.req(`${serviceUrl()}/components`, 'delete', {
      ulid, childrenUlid,
    })
  }
  postCompListByPageForLocal(obj: Component){
    return new Promise((s, j) => {
      let has = this._map.has(obj['pageUlid'])
      if (has) {
      } else {
        j()
      }
    })
  }
  // 在当前页面中查找
  private _find(pageUlid: ULID, compUlid: ULID): CompOrUn {
    return this._map.get(pageUlid)?.find(compUlid)?.value
  }
  curComponent() {
    return this._curComponent
  }
  setCurComponent(pageUlid: ULID, compUlid?: ULID) {
    if (compUlid) {
      this._curComponent = this._find(pageUlid, compUlid)
      this.curComponentS.set(this._curComponent)
    } else {
      this._curComponent = undefined
      this.curComponentS.set(undefined)
    }
  }
  // 改变属性
  setProps(key: S, value: A, isEmit: B = true) {
    let curComp: CompOrUn = this.curComponent()
    if (curComp) {
      curComp.props[key] = value
      if (isEmit) {
        shareEvent.emit(creatEventName(curComp.type, curComp.ulid, 'props', 'update'), {key, value})
      }
    }
  }
  setComponentsBehavior( index: N, key: BehaviorItemKey, value: S ) {
    let curComp: CompOrUn = this.curComponent()
    if(curComp) {
      let arr = curComp.behavior
      arr[index][key] = value
    }
  }
  addBehaviorOfCurComponent(obj: BehaviorMetaItem) {
    let curComp = this.curComponent()
    if (curComp) {
      curComp.behavior.push(obj)
    }
  }
  removeBehaviorOfCurComponent(pageUlid: ULID, componentUlid: ULID, index: N) {
    let tree = this._map.get(pageUlid)
    if (tree) {
      let component = tree.find(componentUlid)
      component?.value.behavior.splice(index, 1)
    }
  }
  reqAddBehavior(value: BehaviorMetaItem) {
    return this.reqService.req(`${serviceUrl()}/components/behavior`, 'post', {
      ulid: this.curComponent()?.ulid,
      value,
    })
  }
  reqRemoveBehavior(componentUlid: ULID, index: N) {
    return this.reqService.req(`${serviceUrl()}/components/behavior`, 'delete', {
      ulid: componentUlid,
      index,
    })
  }
  setItems(index: N, key: S, value: A) {
    let curComp = this.curComponent()
    if (curComp) {
      curComp.items[index][key] = value
      shareEvent.emit(creatEventName(curComp.type, curComp.ulid, 'items', 'update'), {key, value, index})
    }
  }
  addItems(obj: ItemsMetaItem) {
    let curComp = this.curComponent()
    if (curComp) {
      curComp.items.push(obj)
      shareEvent.emit(creatEventName(curComp.type, curComp.ulid, 'items', 'add'), obj)
    }
  }
  addSlots(key: S, value: S) {
    let curComp = this.curComponent()
    if (curComp) {
      curComp.slots[key] = value
    }
  }
  removeSlots(key: S) {
    let curComp = this.curComponent()
    if (curComp) {
      delete curComp.slots[key]
    }
  }
  reqChangeItems(index: N, key: S, value: A) {
    return this.reqService.req(`${serviceUrl()}/components/items`, 'put', {
      ulid: this.curComponent()?.ulid,
      index,
      key,
      value,})
  }
  reqAddItems(obj: ItemsMetaItem) {
    return this.reqService.req(`${serviceUrl()}/components/items`, 'post', {ulid: this.curComponent()?.ulid, value: obj})
  }
  // 删除当前组件的item
  removeItems(pageUlid: ULID, componentUlid: ULID, index: N) {
    let tree = this._map.get(pageUlid)
    let component = tree?.find(componentUlid)?.value
    if (component) {
      let [item] = component.items.splice(index, 1)
      shareEvent.emit(creatEventName(component.type, component.ulid, 'items', 'remove'), {item, index}) // 触发事件
    }
  }
  // 更新组件
  reqUpdateComponent(type: UpdateType, key: S, value: PropsValue, componentUlid: ULID = this.curComponent()?.ulid || '',) {
    return this.reqService.req(`${serviceUrl()}/components`, 'put', {
      ulid: componentUlid,
      type,
      key,
      value,
    }).then(() => true)
  }
  reqRemoveItems(componentUlid: ULID, itemsIndex: N) {
    return this.reqService.req(`${serviceUrl()}/components/items`, 'delete', {
      ulid: componentUlid,
      index: itemsIndex,
    })
  }
  reqUpdateComponentBehavior(type: UpdateType, index: N, key: S, value: PropsValue) {
    return this.reqService.req(`${serviceUrl()}/components`, 'put', {
      ulid: this.curComponent()?.ulid || '',
      type,
      index,
      key,
      value,
    }).then(() => true)
  }
  reqAddSlots(key: S, value: S = '') {
    let curComp = this.curComponent()
    if (curComp) {
      let ulid = curComp.ulid
      let type = 'slots'
      return this.reqService.req(`${serviceUrl()}/components`, 'put', {
        ulid,
        type,
        key,
        value,
      }).then(() => true)
    } else {
      return Promise.reject('无选中组件')
    }
  }
  // 服务端会处理slots内的所有字段及其值
  reqRemoveSlots(slotKey: S) {
    let curComp = this.curComponent()
    if (curComp) {
      return this.reqService.req(`${serviceUrl()}/components/slots`, 'delete', {
        ulid: curComp.ulid,
        slotKey,
      })
    } else {
      return Promise.reject('无选中组件')
    }
  }
  getTree(key: ULID): Tree<Component> | undefined {
    return this._map.get(key)
  }
  // 删除组件
  // 其子节点会被浏览器的垃圾回收机制回收。
  deleteComponentByUlid(pageUlid: ULID, componentUlid: ULID) {
    return this._map.get(pageUlid)?.unmount(componentUlid)
  }
  deleteComponentByPageUlid(pageUlid: ULID) {
    this._map.delete(pageUlid)
  }
  // 得到当前组件的后代组件，不含当前组件
  getChildrenComponent(pageUlid: ULID, componentUlid: ULID) {
    let tree = this.getTree(pageUlid)
    let childrenComponent = tree?.find(componentUlid)?.allChildren() || []
    return childrenComponent
  }
  // 得到后组件
  getNextAllComponent(pageUlid: ULID, componentUlid: ULID): Component[] {
    let tree = this.getTree(pageUlid)
    return compatibleArray(tree?.find(componentUlid)?.toArray()!) // .map(component => component.ulid)
  }
  reqUpdateComponentSlotkey(ulid: ULID, newSlotKey: S, oldSlotKey: S) {
    return this.reqService.req(`${serviceUrl()}/components/slots`, 'put', {
      ulid, newSlotKey, oldSlotKey
    })
  }
}
