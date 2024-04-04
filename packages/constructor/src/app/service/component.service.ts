import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { DoublyChain } from 'data-footstone'
import { createTree } from 'src/helper/tree';
import { PageService } from './page.service';
import { AppService } from './app.service';
import { Queue } from "data-footstone"
// 数据
import {categoryList} from 'src/helper/category'
import { COMPONENTTOTALMAXOFPAGE } from 'src/helper/config'
// 类型
// import { createCompKey } from 'src/helper/index'
import type { Component, Category, 
  PropsValue, 
  BehaviorItemKey,
  ItemsMetaItem,
 } from '../../types/component'
import type { ResponseData } from '../../types/index'
// import type { ComponentPropsMeta } from '../../types/props'
import type { ConfigItemsCategoryType } from 'src/types/base'
import type { S, Ao, ULID, A,
  N,
  B,
  ConfigItem,
} from 'src/types/base';
import type { Tree } from 'src/helper/tree';


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
  mountComponent(comp: Component, ulid: ULID, position: 'next' | 'child', slot?: S): B {
    let tree = this._map.get(this.createTreeKey())
    if (tree) {
      let b: B
      switch(position) {
        case 'next':
          b = !!tree.mountNext(comp, ulid)
          break;
        case 'child':
          b = !!tree.mountChild(comp, ulid, slot!)
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
          // clog('_map', this._map)
          // let has = this._map.has((obj['pageUlid']))
          // if (has) {
          //   let d = this._map.get((obj['pageUlid']))
          //   d!.append(obj)
          //   clog(this._map.get((obj['pageUlid'])))
          //   let arr = this._map.get((obj['pageUlid']))!.toArray()
          //   this.componentListByCurPage$.next(arr)
          //   s(arr)
          // } else {
          //   this._opCompList(res.data)
          // }
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
            let q = new Queue<{position: S, slot?: S, component: Component, ulid: ULID}>()

            let nextComp = componentList.find(item => item.ulid === curComp!.nextUlid)
            if (nextComp) {
              q.enqueue({
                position: 'next',
                component: nextComp,
                ulid: curComp.ulid,
              })
            }
            let a = Object.entries(curComp.slots)
            a.forEach(([slot, ulid]) => {
              let t = componentList.find(item => item.ulid === ulid)
              if (t) {
                q.enqueue({
                  position: 'child',
                  slot: slot,
                  component: t,
                  ulid: curComp!.ulid,
                })
              }
            })
            let i = 0 // 为了开发时安全
            while (!q.isEmpty() && i < 100) {
              i++
              let cur = q.dequeue()
              switch (cur.position) {
                case 'next':
                  tree.mountNext(cur.component, cur.ulid)
                  break;
                case 'child':
                  tree.mountChild(cur.component, cur.ulid, cur.slot!)
                  break;
              }
              let nextComp = componentList.find(item => item.ulid === cur.component.nextUlid)
              if (nextComp) {
                q.enqueue({
                  position: 'next',
                  component: nextComp,
                  ulid: cur.component.ulid,
                })
              }
              Object.entries(cur.component.slots).forEach(([slot, ulid]) => {
                let t = componentList.find(item => item.ulid === ulid)
                if (t) {
                  q.enqueue({
                    position: 'child',
                    slot: slot,
                    component: t,
                    ulid: cur.component.ulid,
                  })
                }
              })
            }
          }
        }
        this._map.set(this.createTreeKey(), tree)
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
    // let res = undefined
    // if (pageUlid) {
    //   let cur = this._map.get(pageUlid)?.head
    //   while (cur) {
    //     if (cur.value.ulid === compUlid) {
    //       res = cur.value
    //       break
    //     }
    //     cur = cur.next
    //   }    
    // }
    // return res
    let pageUlid = this.pageService.getCurPage()?.ulid
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
  // setCurComponentCategory(index: N, value: ConfigItemsCategoryType) {
  //   let curComp = this.curComponent()
  //   if (curComp) {
  //     let t: ConfigItem = curComp.items[index]
  //     t.category = value
  //     this.http.put<ResponseData>('http://localhost:5000/components/items', {
  //       ulid: curComp.ulid,
  //       key: 'category',
  //       value: value,
  //     })
  //   }
  // }
  // setCurComponentLabel(index: N, value: S) {
  //   let curComp = this.curComponent()
  //   if (curComp) {
  //     let t: ConfigItem = curComp.items[index]
  //     t.label = value
  //     this.http.put<ResponseData>('http://localhost:5000/components/items', {
  //       ulid: curComp.ulid,
  //       key: 'label',
  //       value: value,
  //     })
  //   }
  // }
  // setCurComponentValue(index: N, value: S) {
  //   let curComp = this.curComponent()
  //   if (curComp) {
  //     let t: ConfigItem = curComp.items[index]
  //     t.value = value
  //     clog('vlue', value)
  //     this.http.put<ResponseData>('http://localhost:5000/components/items', {
  //       ulid: curComp.ulid,
  //       key: 'value',
  //       value: value,
  //       index: index,
  //     }, {
  //       withCredentials: true
  //     }).subscribe(res => {
  //       clog('res', res)
  //     })
  //   }
  // }
  // setCurComponentKey(index: N, value: S) {
  //   let curComp = this.curComponent()
  //   if (curComp) {
  //     let t: ConfigItem = curComp.items[index]
  //     t.key = value
  //     this.http.put<ResponseData>('http://localhost:5000/components/items', {
  //       ulid: curComp.ulid,
  //       key: 'key',
  //       value: value,
  //     }, {
  //       withCredentials: true
  //     })
  //   }
  // }
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
  // reqUpdateBehavior(type)
  // 删除组件
  delete(componentUlid: ULID) {
    // let dc = this._map.get(pageUlid)
    // if (dc) {
    //   let cur = dc.head
    //   let position = 0
    //   while (cur) {
    //     if (cur.value.ulid === componentUlid) {
    //       break
    //     }
    //     position++
    //     cur = cur.next
    //   }
    //   let compDeleted = dc.removeAt(position)
    //   this.componentListByCurPage$.next(dc.toArray())
    //   // 当删除最前面和最后面的组件时需要更新页面的数据
    //   this.pageService.deleteComponent(compDeleted)
    // }
    return this._map.get(this.createTreeKey())?.unmount(componentUlid)
    // let tree = 
    // if (tree) {
    //   // let c = tree.find(componentUlid)?.value
    //   tree.unmount(componentUlid)
    // }
  }
}
