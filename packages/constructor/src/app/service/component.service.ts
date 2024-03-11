import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { DoublyChain } from 'data-footstone'
import { PageService } from './page.service';
// 数据
import {categoryList} from 'src/helper/category'
import { COMPONENTTOTALMAXOFPAGE } from 'src/helper/config'
// 类型
// import { createCompKey } from 'src/helper/index'
import type { Component, Category, 
  PropsValue, 
  BehaviorItemKey } from '../../types/component'
// import type { BehaviorItemKey } from 'src/types/behavior'
// import type { ComponentItem,
//   ComponentItemInput,
//   ComponentItemNumber,
//   ComponentItemSelect,
//   ComponentItemSwitch, } from 'src/types/items';
import type { ResponseData } from '../../types/index'
// import type { ComponentPropsMeta } from '../../types/props'
import type { ConfigItemKeys, CategoryType } from 'src/types/base'
import type { S, Ao, ULID, A,
  N,
B,
 } from 'src/types/base';

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
  compSubject$: Subject<CompOrUn> // 组件的subject
  // categorySubject$: Subject<CompOrUn> // 组件的subject
  componentListByCurPage$: Subject<Component[]> // 当前页面的组件
  _curCompUlid: S
  _curComponent: CompOrUn
  // _curCategory: ComponentOrUn
  _map: Map<ULID, DoublyChain<Component>> // 日后改为4向的数据结构
  // ulid是pageUlid
  componentProps$: Subject<Component['props']>

  constructor(private http: HttpClient, private pageService: PageService) {
    this.categoryList = categoryList
    // 组件种类应该从前端取得，不应该从后端接口取得。
    // this.componentListByPage = []
    this.compSubject$ = new Subject<CompOrUn>()
    // this.categorySubject$ = new Subject<ComponentOrUn>()
    this.componentListByCurPage$ = new Subject<Component[]>()
    this.componentProps$ = new Subject<Component['props']>()
    this._curCompUlid = ''
    this._curComponent = undefined
    // this._curCategory = undefined
    this._map = new Map()
    this.pageService.pageSubject$.subscribe(curPage => {
      let pageUlid = curPage?.ulid
      if (pageUlid) {
        this._opCompList(pageUlid).then((arr) => {
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
  // 请求指定页面的组件
  reqCompListByPage() {
    return new Promise<Component[]>((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/components', {
        params: {
          pageUlid: String(this.pageService.getCurPage()?.ulid),
          env: 'dev',
        },
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          let curPage = this.pageService.getCurPage()
          if (curPage) {
            let nextComponentUlid = curPage?.firstComponentUlid
            let threshold: null | N = 0
            while (nextComponentUlid && threshold < COMPONENTTOTALMAXOFPAGE) {
              let comp = (res.data as Component[] || []).find((item: Component) => item.ulid === nextComponentUlid)
              if (comp) {
                let dc = this._map.get(String(curPage?.ulid))
                if (dc) {
                  dc.append(comp)
                } else {
                  let t = new DoublyChain<Component>()
                  t.append(comp)
                  this._map.set(String(curPage?.ulid), t)
                }
              }
              nextComponentUlid = comp?.nextUlid
              threshold++
            }
            clog('threshold', threshold)
            threshold = null
            let arr = this._map.get(curPage.ulid)!.toArray()
            this.componentListByCurPage$.next(arr)
          }
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
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
  // 创建组件
  postCompListByPage(obj: Component) {
    return new Promise<Component[]>((s, j) => {
      this.http.post<ResponseData>('http://localhost:5000/components', {
        ...obj,
      }, {
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          // clog('_map', this._map)
          let has = this._map.has((obj['pageUlid']))
          if (has) {
            let d = this._map.get((obj['pageUlid']))
            d!.append(obj)
            clog(this._map.get((obj['pageUlid'])))
            let arr = this._map.get((obj['pageUlid']))!.toArray()
            this.componentListByCurPage$.next(arr)
            s(arr)
          } else {
            this._opCompList(res.data)
          }
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
        let d = this._map.get(obj.pageUlid)
        d!.append(obj)
        let arr = this._map.get(obj.pageUlid)!.toArray()
        this.componentListByCurPage$.next(arr)
        s(arr)
      } else {
        j()
      }
    })
  }
  // 重排序
  // putCompListByPage(obj: Ao) {}
  getComponentByPage(pageUlid?: ULID): Component[] {
    if (pageUlid) {
      clog('getComponentByPage', this._map.get(pageUlid)?.toArray())
      return (this._map.get(pageUlid)?.toArray() as Component[])
    } else {
      return []
    }
  }
  private _opCompList(pageUlid: ULID) {
    let dc = this._map.get(pageUlid)
    if (!dc) {
      return this._resComponentListByPage(pageUlid).then((componentList: Component[]) => {
        let doubleChain = new DoublyChain<Component>()
        let curPage = this.pageService.getCurPage()
        let nextComponentUlid = curPage?.firstComponentUlid
        let threshold: null | N = 0
        while (nextComponentUlid && threshold < COMPONENTTOTALMAXOFPAGE) {
          let component = componentList.find(item => item.ulid === nextComponentUlid)
          if (component) {
            doubleChain.append(component)
          }
          nextComponentUlid = component?.nextUlid
          threshold++
        }
        clog('threshold', threshold)
        threshold = null
        this._map.set(pageUlid, doubleChain)
        return doubleChain.toArray()
      })
    } else {
      return Promise.resolve(this._map.get(pageUlid)?.toArray() || [])
    }
  }
  // 在当前页面中查找
  private _find(compUlid: S): CompOrUn {
    let pageUlid = this.pageService.getCurPage()?.ulid
    let res = undefined
    if (pageUlid) {
      let cur = this._map.get(pageUlid)?.head
      while (cur) {
        if (cur.value.ulid === compUlid) {
          res = cur.value
          break
        }
        cur = cur.next
      }    
    }
    return res
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
      this.compSubject$.next(this._curComponent)
    } else {
      this._curComponent = undefined
      this.compSubject$.next(undefined)
    }
  }
  // 设置当前组件的prop
  setCurComponentProp(key: S, value: PropsValue) {
    let curComp = this.curComponent()
    let curPage = this.pageService.getCurPage()
    if (curPage && curComp) {
      let cur = this._map.get(curPage.ulid)?.head
      while (cur) {
        if (cur.value.ulid === curComp.ulid) {
          cur.value.props[key] = value
          break
        }
        cur = cur.next
      }
      if (cur) {
        this.compSubject$.next(cur.value)
        this.componentListByCurPage$.next(this._map.get(curPage.ulid)?.toArray() || [])
      }
    }
  }
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


  // setCurComponentItem(key: S, k: keyof ComponentItem, v: A) {
  // setCurComponentItem(key: S, k: 'category' | 'key' | 'label' | 'value' | 'checked', v: A) {
  // setCurComponentItem(key: S, k: keyof ComponentItemInput
  //   | keyof ComponentItemNumber
  //   | keyof ComponentItemSelect
  //   | keyof ComponentItemSwitch, v: A) {
  //   // todo v 有些暴力
  //   let curComp = this.curComponent()
  //   if (curComp) {
  //     let obj = curComp.items.groups.find(item => item.key === key)
  //     if (obj) {
  //       switch (obj.category) {
  //         case 'input':
  //           obj[(k as keyof ComponentItemInput)] = v
  //           break;
  //         case 'number':
  //           switch (k) {
  //             case 'category':
  //               obj[k] = v
  //               break;
  //             case 'key':
  //               obj[k] = v
  //               break;
  //             case 'label':
  //               obj[k] = v
  //               break;
  //             case 'value':
  //               obj[k] = v
  //               break
  //           }
  //           break;
  //         case 'select':
  //           obj[(k as keyof ComponentItemSelect)] = v
  //           break;
  //         case 'switch':
  //           switch (k) {
  //             case 'category':
  //               obj[k] = v
  //               break;
  //             case 'key':
  //               obj[k] = v
  //               break;
  //             case 'label':
  //               obj[k] = v
  //               break;
  //             case 'checked':
  //               obj[k] = v
  //               break;
  //           }
  //           break
  //       }
  //     }
  //   }
  //   // 此方法可证明，不用更新列表，就能更新列表中的特定元素的特定属性。
  // }
  setCurComponentItem(index: N,
    //  key: ConfigItemKeys, 
    //  value: CategoryType
    key: 'category' | 'value' | 'key' | 'label',
     value: 'input' | 'textarea' | 'select' | 'number' | 'switch'
     ) {
    let curComp = this.curComponent()
    if (curComp) {
      curComp.items[index][key] = value
      // let obj = curComp.items.find(item => item.key === key)
      // if (obj) {
      //   obj[key] = value
      // }
    }
  }
  // setCurComponentItem(key: S, k: S, v: A) {
  //   let curComp = this.curComponent()
  //   if (curComp) {
  //     let obj = curComp.item.groups.find(item => item.key === key)
  //     if (obj) {
  //       switch (obj.category) {
  //         case 'input':
  //           this.setItemInput(obj, k, v)
  //           break;
  //         case 'switch':
  //           this.setItemSwitch(obj, k, v)
  //           break;
  //       }
  //     }
  //   }
  // }
  // setItemInput(obj: A, k: S, v: A) {
  //   obj[k] = v
  // }
  // setItemSwitch(k: S, field: 'label' | 'checked', v: S | B) {
  //   // obj[k] = v
  //   let curComp = this.curComponent()
  //   if (curComp) {
  //     let obj = curComp.item.groups.find(item => item.key === k)
  //     if (obj) {
  //       // (obj as ComponentItemSwitch)[k] = v
  //       (obj as ComponentItemSwitch)[field] = v
  //     }
  //   }
  // }

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
  delete(componentUlid: ULID, pageUlid: ULID) {
    let dc = this._map.get(pageUlid)
    if (dc) {
      let cur = dc.head
      let position = 0
      while (cur) {
        if (cur.value.ulid === componentUlid) {
          break
        }
        position++
        cur = cur.next
      }
      let compDeleted = dc.removeAt(position)
      this.componentListByCurPage$.next(dc.toArray())
      // 当删除最前面和最后面的组件时需要更新页面的数据
      this.pageService.deleteComponent(compDeleted)
    }
  }
}
