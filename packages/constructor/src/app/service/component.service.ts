import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { DoublyChain } from 'data-footstone'
import { createTree } from 'src/helper/tree';
import { PageService } from './page.service';
import { AppService } from './app.service';
import { Queue } from "data-footstone"
import { createChildKey } from 'src/helper/index'
// 数据
import {categoryList} from 'src/helper/category'
import { COMPONENTTOTALMAXOFPAGE } from 'src/helper/config'
// 类型
// import { createCompKey } from 'src/helper/index'
import type { Component, Category, 
  PropsValue, 
  BehaviorItemKey,
  ItemsMetaItem,
  ComponentMountItems,
  ComponentMountSlots,
 } from '../../types/component'
import type { ResponseData } from '../../types/index'
// import type { ComponentPropsMeta } from '../../types/props'
import type { ConfigItemsCategoryType } from 'src/types/base'
import type { S, Ao, ULID, A,
  N,
  B,
  ConfigItem,
} from 'src/types/base';
import type { Tree, Node } from 'src/helper/tree';


let clog = console.log

type CompOrUn = Component | undefined
type ComponentOrUn = Component | undefined
type UpdateType = 'props' | 'behavior' | 'slot' | 'plugin'

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  // 组件类型的类型不应该使用组件的类型
  private categoryList: Category[] // 这里应该使用组件种类的类型
  // componentListByPage: Component[] // 应该使用组件的类型 // 考虑是否可删除
  curComponent$: Subject<CompOrUn> // 组件的subject
  // categorySubject$: Subject<CompOrUn> // 组件的subject
  componentListByCurPage$: Subject<Component[]> // 当前页面的组件
  _curCompUlid: S
  _curComponent: CompOrUn
  // _curCategory: ComponentOrUn
  // _map: Map<ULID, DoublyChain<Component>> // 日后改为4向的数据结构
  _map: Map<S, Tree<Component>> // key: appUlid+pageUlid+componentUlid
  // ulid是pageUlid
  componentProps$: Subject<Component['props']>

  constructor(
    private http: HttpClient,
    private pageService: PageService,
    private appService: AppService,

  ) {
    this.categoryList = categoryList
    // 组件种类应该从前端取得，不应该从后端接口取得。
    // this.componentListByPage = []
    this.curComponent$ = new Subject<CompOrUn>()
    // this.categorySubject$ = new Subject<ComponentOrUn>()
    this.componentListByCurPage$ = new Subject<Component[]>()
    this.componentProps$ = new Subject<Component['props']>()
    this._curCompUlid = ''
    this._curComponent = undefined
    // this._curCategory = undefined
    this._map = new Map()
    // 当页面改变时更新组件列表
    this.pageService.pageSubject$.subscribe(curPage => {
      let pageUlid = curPage?.ulid
      if (pageUlid) {
        this._opCompList(pageUlid)
        .then((arr) => {
          this.componentListByCurPage$.next(arr)
        })
      }
    })
  }
  getCategoryList() {
    return new Promise<Category[]>((s, j) => {
      s(this.categoryList)
    })
  }
  _resComponentListByPage(pageUlid: ULID) {
    return new Promise<Component[]>((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/components', {
        params: {
          pageUlid,
          env: 'dev',
        },
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  // 作为哪种节点返回
  private mountPosition(comp: Component): N {
    let n = 0
    if (comp.prevUlid && !comp.nextUlid) {
      n = 2
    } else if (!comp.prevUlid && comp.nextUlid) {
      n = 1
    } else if (comp.prevUlid && comp.nextUlid) {
      n = 2
    } else {
      switch (comp.mount.area) {
        case '':
        default:
          n = 0
          break;
        case 'slots':
          n = 4
          break;
        case 'items':
          n = 3
          break;
      }
    }
    return n
  }
  // mountComponent(comp: Component, ulid: ULID, position: 'next' | 'slots' | 'items', key: S = '', itemsKey: S = ''): B {
  mountComponent(comp: Component,): B {
    let tree = this._map.get(this.createTreeKey())
    if (tree) {
      let b: B = false // 是否挂载成功
      let node: Node<Component> | undefined
      switch(this.mountPosition(comp)) {
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
        case 3: // items
          // b = !!tree.mountChild(comp, comp.parentUlid, `items_${(comp.mount as ComponentMountItems).itemIndex}Ulid`)
          b = !!tree.mountChild(comp, comp.parentUlid, 
            createChildKey('items', (comp.mount as ComponentMountItems).itemIndex, 'node')
            )
          // createChildKey
          node = tree.find(comp.parentUlid)
          if (node) {
            node.value.items[(comp.mount as ComponentMountItems).itemIndex]['childUlid'] = comp.ulid
          }
          break;
        case 4: // slots
          b = !!tree.mountChild(comp, comp.parentUlid, 
            createChildKey('slots', (comp.mount as ComponentMountSlots).slotKey, 'node')
            )
          node = tree.find(comp.parentUlid)
          if (node) {
            node.value.slots[`slots_${(comp.mount as ComponentMountSlots).slotKey}Ulid`] = comp.ulid
          }
          break;
      }
      return b
    } else {
      return false
    }
  }
  // 创建组件
  reqPostCompListByPage(obj: Component) {
    return new Promise<B>((s, j) => {
      this.http.post<ResponseData>('http://localhost:5000/components', {
        ...obj,
      }, {
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          s(true)
        } else {
          j()
        }
      })
    })
  }
  reqDeleteComponent(ulid: ULID) {
    return new Promise<B>((s, j) => {
      this.http.delete<ResponseData>('http://localhost:5000/components', {
          params: {
            ulid
          },
          withCredentials: true
        }).subscribe(res => {
          if (res.code === 0) {
            clog('删除成功')
            s(true)
          } else {
            j()
          }
        })
    })
  }
  // for dev
  // 只在本地保存，不改变远端数据
  postCompListByPageForLocal(obj: Component){
    // return 
    new Promise((s, j) => {
      let has = this._map.has(obj['pageUlid'])
      if (has) {
        // let d = this._map.get(obj.pageUlid)
        // d!.append(obj)
        // let arr = this._map.get(obj.pageUlid)!.toArray()
        // this.componentListByCurPage$.next(arr)
        // s(arr)

      } else {
        j()
      }
    })
  }
  // 重排序
  // putCompListByPage(obj: Ao) {}
  // getComponentByPage(pageUlid?: ULID): Component[] {
  //   if (pageUlid) {
  //     clog('getComponentByPage', this._map.get(pageUlid)?.toArray())
  //     return (this._map.get(pageUlid)?.toArray() as Component[])
  //   } else {
  //     return []
  //   }
  // }
  createTreeKey() {
    let app = this.appService.getCurApp()
    let page = this.pageService.getCurPage()
    return `${app?.ulid}_${page?.ulid}_`
  }
  private _opCompList(pageUlid: ULID) {
    let dc = this._map.get(this.createTreeKey())
    if (!dc) {
      return this._resComponentListByPage(pageUlid).then((componentList: Component[]) => {
        let curPage = this.pageService.getCurPage()
        let curComponentUlid = curPage?.firstComponentUlid
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
            curComp.items.forEach((item) => {
              let t = componentList.find(ele => ele.ulid === item['childUlid'])
              if (t) {
                q.enqueue({
                  component: t,
                  mountMethod: 'items',
                })
              }
            })
            let i = 0 // 为了开发时安全
            while (!q.isEmpty() && i < 100) {
              i++
              let cur = q.dequeue()
              // clog('q', q)
              switch (cur.mountMethod) {
                case 'next':
                  tree.mountNext(cur.component, cur.component.prevUlid)
                  break;
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
              cur.component.items.forEach((item) => {
                let t = componentList.find(subItem => subItem.ulid === item['childUlid'])
                if (t) {
                  q.enqueue({
                    component: t,
                    mountMethod: 'items',
                  })
                }
              })
            }
          }
        }
        this._map.set(this.createTreeKey(), tree)
        // clog('tree', tree)
        return Promise.resolve(tree.root?.toArray() || [])
      })
    } else {
      // return Promise.resolve(this._map.get(pageUlid)?.toArray() || [])
      return Promise.resolve(this._map.get(this.createTreeKey())?.root?.toArray() || [])
    }
  }
  // 在当前页面中查找
  private _find(compUlid: S): CompOrUn {
    // let pageUlid = this.pageService.getCurPage()?.ulid
    return this._map.get(this.createTreeKey())?.find(compUlid)?.value
  }
  private _findCategory(categoryUlid: ULID) {
    return this.categoryList.find(item => item.ulid === categoryUlid)
  }
  curComponent() {
    return this._curComponent
  }
  setCurComponent(compUlid?: S) {
    if (compUlid) {
      this._curComponent = this._find(compUlid)
      this.curComponent$.next(this._curComponent)
    } else {
      this._curComponent = undefined
      this.curComponent$.next(undefined)
    }
  }
  // 设置当前组件的prop
  setCurComponentProp(key: S, value: PropsValue) {
    // let curComp = this.curComponent()
    // let curPage = this.pageService.getCurPage()
    // if (curPage && curComp) {
    //   let cur = this._map.get(curPage.ulid)?.head
    //   while (cur) {
    //     if (cur.value.ulid === curComp.ulid) {
    //       cur.value.props[key] = value
    //       break
    //     }
    //     cur = cur.next
    //   }
    //   if (cur) {
    //     this.curComponent$.next(cur.value)
    //     this.componentListByCurPage$.next(this._map.get(curPage.ulid)?.toArray() || [])
    //   }
    // }
    if (this._curComponent) {
      this._curComponent.props[key] = value
    }
  }
  // todo 应该删除一个设置prop的方法
  // 直接改变属性
  setComponentProp(key: S, value: PropsValue) {
    let curComp: CompOrUn = this.curComponent()
    if (curComp) {
      curComp.props[key] = value
    }
  }
  
  setComponentsBehavior(
    // type: UpdateType, 
    index: N, key: BehaviorItemKey, value: S) {
    let curComp: CompOrUn = this.curComponent()
    if(curComp) {
      // let arr = curComp.behavior.groups
      let arr = curComp.behavior
      arr[index][key] = value
    }
  }
  // setItemsOfCurComponent(index: N, key: S, value: A) {
  // todo 可优化key的类型
  setItemsOfCurComponent(index: N, key: 'category' | 'label' | 'key' | 'value' | 'options', value: A) {
    // clog('setItemsOfCurComponent', index, key, value)
    let curComp = this.curComponent()
    if (curComp) {
      curComp.items[index][key] = value
    }
  }
  addItemsOfCurComponent(obj: ItemsMetaItem) {
    let curComp = this.curComponent()
    if (curComp) {
      curComp.items.push(obj)
    }
  }
  reqChangeItems(index: N, key: S, value: A) {
    this.http.put<ResponseData>('http://localhost:5000/components/items', {
      ulid: this.curComponent()?.ulid,
      index,
      key,
      value,
    }, {
      withCredentials: true
    })
    .subscribe(res => {
      clog('res', res)
    })
  }
  reqAddItems(obj: ItemsMetaItem) {
    this.http.post<ResponseData>('http://localhost:5000/components/items', {
      ulid: this.curComponent()?.ulid,
      value: obj
    }, {
      withCredentials: true
    }).subscribe(() => {})
  }
  removeItemsOfCurComponent(index: N) {
  }

  // 更新组件
  reqUpdateComponentProps(type: UpdateType, key: S, value: PropsValue) {
    return new Promise((s, j) => {
      this.http.put<ResponseData>('http://localhost:5000/components', {
        ulid: this.curComponent()?.ulid || '',
        type,
        key,
        value,
      }).subscribe((res) => {
        if (res.code === 0) {
          // res.data
          s(true)
        }
        j(res.message || '更新失败')
      })
    })
  }
  reqUpdateComponentBehavior(type: UpdateType, index: N, key: S, value: PropsValue) {
    return new Promise((s, j) => {
      this.http.put<ResponseData>('http://localhost:5000/components', {
        ulid: this.curComponent()?.ulid || '',
        type,
        index,
        key,
        value,
      }).subscribe((res) => {
        if (res.code === 0) {
          s(true)
        } else {
          j(res.message || '更新失败')
        }
      })
    })
  }
  // 删除组件
  delete(componentUlid: ULID) {
    return this._map.get(this.createTreeKey())?.unmount(componentUlid)
  }
  getTreeByKey(key = this.createTreeKey()): Tree<Component> | undefined {
    return this._map.get(key)
  }
  deleteComponentByPageUlid(pageUlid: ULID) {
    let app = this.appService.getCurApp()
    let key = `${app?.ulid}_${pageUlid}_`
    this._map.delete(key)
  }
}
