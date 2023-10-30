import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { DoublyChain } from 'data-footstone'
import { PageService } from './page.service';
// 数据
import {categoryList} from 'src/helper/category'
// import { createCompKey } from 'src/helper/index'
import type { Component, Category, PropsValue } from '../../types/component'
import type { ResponseData } from '../../types/index'
import type { ComponentPropsMeta } from '../../types/props'
import type { S, Ao, ULID } from 'src/types/base';

let clog = console.log

type CompOrUn = Component | undefined
type ComponentOrUn = Component | undefined

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

  constructor(private http: HttpClient, private pageService: PageService) {
    this.categoryList = categoryList
    // 组件种类应该从前端取得，不应该从后端接口取得。
    // this.componentListByPage = []
    this.compSubject$ = new Subject<CompOrUn>()
    // this.categorySubject$ = new Subject<ComponentOrUn>()
    this.componentListByCurPage$ = new Subject<Component[]>()
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
  // 可能用不到
  // initMap(pageUlidList: ULID[]) {
  //   pageUlidList.forEach(pageUlid => {
  //     this._map.set(pageUlid, new DoublyChain())
  //   })
  // }
  getCategoryList() {
    return new Promise<Category[]>((s, j) => {
      s(this.categoryList)
    })
  }
  // 请求指定页面的组件
  reqCompListByPage() {
    return new Promise<Component[]>((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/components/listByPage', { // 日后改为接口重载
        params: {
          pageUlid: String(this.pageService.getCurPage()?.ulid),
        },
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          let curPage = this.pageService.getCurPage()
          if (curPage) {
            let nextComponentUlid = curPage?.firstComponentUlid
            while (nextComponentUlid) {
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
              nextComponentUlid = comp?.next
            }
            clog('init', this._map)
            // this.componentListByCurPage$.next(res.data)
            let arr = this._map.get(curPage.ulid)!.toArray()
            // .toArray()
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
      this.http.get<ResponseData>('http://localhost:5000/components/listByPage', {
        params: {
          pageUlid
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
      this.http.post<ResponseData>('http://localhost:5000/components/listByPage', {
        ...obj,
      }, {
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          clog('_map', this._map)
          let has = this._map.has((obj['pageUlid']))
          if (has) {
            let d = this._map.get((obj['pageUlid']))
            d!.append(obj)
            clog('d', d)
            // this._opCompList(res.data)
            let arr = this._map.get((obj['pageUlid']))!.toArray()
            clog('sarr', arr, this._map)
            this.componentListByCurPage$.next(arr)
            s(this.getComponentByPage(this.pageService.getCurPage()?.ulid))
          } else {
            this._opCompList(res.data)
            // this._map.set(obj['pageUlid']) = new DoublyChain().append(obj)
            // j()
          }
        } else {
          j()
        }
      })
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
  // 把当前页面的组件按结构顺序排列
  // _opCompList(_compList: Component[]) {
  //   let curPage = this.pageService.getCurPage()
  //   let nextComponentUlid = curPage?.firstComponentUlid
  //   while (nextComponentUlid) {
  //     let comp = _compList.find(item => item.ulid === nextComponentUlid)
  //     if (comp) {
  //       // this.pushComp(comp)
  //       // let curPage = this.pageService.getCurPage()
  //       if (curPage) {
  //         let _chain = this._map.get(curPage.ulid)
  //         if (_chain) {
  //           _chain.append(comp)
  //         } else {
  //           let dc = new DoublyChain<Component>()
  //           dc.append(comp)
  //           this._map.set(curPage.ulid, dc)
  //         }
  //       }
  //       nextComponentUlid = comp.next
  //     } else {
  //       break
  //     }
  //   }
  // }
  private _opCompList(pageUlid: ULID) {
    let dc = this._map.get(pageUlid)
    if (!dc) {
      return this._resComponentListByPage(pageUlid).then((componentList: Component[]) => {
        let doubleChain = new DoublyChain<Component>()
        let curPage = this.pageService.getCurPage()
        let nextComponentUlid = curPage?.firstComponentUlid
        while (nextComponentUlid) {
          let component = componentList.find(item => item.ulid === nextComponentUlid)
          if (component) {
            doubleChain.append(component)
          }
          nextComponentUlid = component?.next
        }
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
    // return this._curCategory = 
    return this.categoryList.find(item => item.ulid === categoryUlid)
  }
  curComponent() {
    return this._curComponent
  }
  // curCategory() {
  //   return this._curCategory
  // }
  setCurComponent(compUlid?: S) {
    if (compUlid) {
      this._curComponent = this._find(compUlid)
      this.compSubject$.next(this._curComponent)
    } else {
      this._curComponent = undefined
      this.compSubject$.next(undefined)
    }
  }
  // setCurCategory(categoryUlid?: ULID) {
  //   if (categoryUlid) {
  //     this._curCategory = this._findCategory(categoryUlid)
  //     // this.categorySubject$.next(this._curCategory)
  //   } else {
  //     this._curCategory = undefined
  //     // this.categorySubject$.next(this._curCategory)
  //   }
  // }
  // 设置当前组件的prop
  setCurComponentProp(key: S, value: PropsValue) {
    // debugger
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
      let arr = this.getComponentByPage(curPage.ulid)
      // clog('new ', arr)
      this.componentListByCurPage$.next(arr)
    }
  }
}
