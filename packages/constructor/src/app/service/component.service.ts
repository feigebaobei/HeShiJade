import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { DoublyChain } from 'data-footstone'
import { PageService } from './page.service';
// import { createCompKey } from 'src/helper/index'
import type { Component, Category } from '../../types/component'
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
  categoryList: Component[] // 这里应该使用组件种类的类型
  // curComponent: Component | null
  componentListByPage: Component[] // 应该使用组件的类型
  compSubject$: Subject<CompOrUn> // 组件的subject
  categorySubject$: Subject<CompOrUn> // 组件的subject
  curProps$: Subject<ComponentPropsMeta>
  _curCompUlid: S
  _curComponent: CompOrUn
  _curCategory: ComponentOrUn
  _map: Map<ULID, DoublyChain<Component>> // 日后改为4向的数据结构
  // _chain: DoublyChain<Component>
  constructor(private http: HttpClient, private pageService: PageService) {
    this.categoryList = []
    // 组件种类应该从前端取得，不应该从后端接口取得。
    // this.curComponent = null
    this.componentListByPage = []
    this.compSubject$ = new Subject<CompOrUn>()
    this.categorySubject$ = new Subject<ComponentOrUn>()
    this.curProps$ = new Subject() //
    this._curCompUlid = ''
    this._curComponent = undefined
    this._curCategory = undefined
    this._map = new Map()
  }
  initMap(pageUlidList: ULID[]) {
    pageUlidList.forEach(pu => {
      // this._map.set(createCompKey(appUlid, pu), new DoublyChain())
      this._map.set(pu, new DoublyChain())
    })
  }
  getCategoryList() {
    return new Promise<Category[]>((s, j) => {
      // 日后改为从组件库中引入
      // this.http.get<ResponseData>('http://localhost:5000/components/category', {
      //   withCredentials: true
      // }).subscribe(res => {
      //   if (res.code === 0) {
      //     this.categoryList = res.data
      //     // clog(this.categoryList)
      //     s(res.data)
      //   } else {
      //     j(new Error(res.message))
      //   }
      // })

      s([
        {
          name: 'button',
          type: 'Button',
          ulid: '12345asdfg'
        },
        {
            name: 'modal',
            type: 'Modal',
            ulid: '12345asdfg2'
        },
        {
            name: 'form',
            type: 'Form',
            ulid: '12345asdfge'
        },
        {
            name: 'table',
            type: 'Table',
            ulid: '12345asdfgs'
        },
        {
            name: 'input',
            type: 'Input',
            ulid: '12345asdfga'
        },
        {
            name: 'select',
            type: 'Select',
            ulid: '12345asdfgb'
        },
      ])
    })
    // return this.categoryList
  }
  // 请求指定页面的组件
  getCompListByPage() {
    return new Promise<Component[]>((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/components/listByPage', { // 日后改为接口重载
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          this.componentListByPage = res.data
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
          let has = this._map.has((obj['pageUlid']))
          if (has) {
            this._map.get((obj['pageUlid']))!.append(obj)
            // this._opCompList(res.data)
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
      clog('chain', this._map.get(pageUlid)?.toArray())
      return (this._map.get(pageUlid)?.toArray() as Component[])
    } else {
      return []
    }
  }
  _opCompList(_compList: Component[]) {
    let curPage = this.pageService.getCurPage()
    let nextComponentUlid = curPage?.firstComponentUlid
    while (nextComponentUlid) {
      let comp = _compList.find(item => item.ulid === nextComponentUlid)
      if (comp) {
        this.pushComp(comp)
        nextComponentUlid = comp.next
      } else {
        break
      }
    }
  }
  pushComp(component: Component) {
    let curPage = this.pageService.getCurPage()
    if (curPage) {
      let _chain = this._map.get(curPage.ulid)
      if (_chain) {
        _chain.append(component)
      } else {
        let dc = new DoublyChain<Component>()
        dc.append(component)
        this._map.set(curPage.ulid, dc)
      }
    }
  }
  // 要修正
  private _find(compUlid: S) {
    // return this._curComponent = this.categoryList.find(item => item.ulid === compUlid)
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
  curCategory() {
    return this._curCategory
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
  setCurCategory(categoryUlid?: ULID) {
    if (categoryUlid) {
      this._curCategory = this._findCategory(categoryUlid)
      this.categorySubject$.next(this._curCategory)
    } else {
      this._curCategory = undefined
      this.categorySubject$.next(this._curCategory)
    }
  }
}
