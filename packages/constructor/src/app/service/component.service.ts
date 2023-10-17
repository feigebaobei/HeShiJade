import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { DoublyChain } from 'data-footstone'
import { PageService } from './page.service';
// import { createCompKey } from 'src/helper/index'
import type { Component } from '../../types/component'
import type { ResponseData } from '../../types/index'
import type { S, Ao, ULID } from 'src/types/base';

let clog = console.log

type CompOrUn = Component | undefined

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  // 组件类型的类型不应该使用组件的类型
  categoryList: Component[] // 这里应该使用组件种类的类型
  // curComponent: Component | null
  componentListByPage: Component[] // 应该使用组件的类型
  compSubject$: Subject<CompOrUn>
  _curCompUlid: S
  _curComponent: CompOrUn
  _map: Map<ULID, DoublyChain<Component>> // 日后改为4向的数据结构
  // _chain: DoublyChain<Component>
  constructor(private http: HttpClient, private pageService: PageService) {
    this.categoryList = []
    // 组件种类应该从前端取得，不应该从后端接口取得。
    // this.curComponent = null
    this.componentListByPage = []
    this.compSubject$ = new Subject<CompOrUn>()
    this._curCompUlid = ''
    this._curComponent = undefined
    this._map = new Map()
  }
  initMap(pageUlidList: ULID[]) {
    pageUlidList.forEach(pu => {
      // this._map.set(createCompKey(appUlid, pu), new DoublyChain())
      this._map.set(pu, new DoublyChain())
    })
  }
  getCategoryList() {
    return new Promise<Component[]>((s, j) => {
      // 日后改为从组件库中引入
      this.http.get<ResponseData>('http://localhost:5000/components/category', {
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          this.categoryList = res.data
          // clog(this.categoryList)
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
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
  private _find(compUlid: S) {
    return this._curComponent = this.categoryList.find(item => item.ulid === compUlid)
  }
  curComponent() {
    return this._curComponent
  }
  setCurComponent(compUlid: S) {
    this.compSubject$.next(this._find(compUlid))
  }
}
