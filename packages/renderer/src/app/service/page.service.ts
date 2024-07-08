import { Injectable } from '@angular/core';
import { Page } from 'src/types/page';
import { HttpClient } from '@angular/common/http';
// import { arrToChain, reqToPromise } from 'src/helper';
import { Subject } from 'rxjs';
import { AppService } from './app.service';
import { EnvService } from './env.service';
// import { DoublyChain } from 'data-footstone';
import { createTree } from 'src/helper/tree';
import { serviceUrl } from 'src/helper/config'
// type
import type { ResponseData, ULID } from 'src/types'
import type { ENV } from 'src/types/base';
import type { Tree } from 'src/helper/tree';

// 根据appUlid+env请求页面
// 根据app的第一个页面的ulid把页面列表转化为双向链表。
// 向外输出页面列表
// 输出当前页面

let clog = console.log

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private _list: Page[]
  list$: Subject<Page[]>
  private _cur: Page | undefined
  cur$: Subject<Page | undefined>
  // private _map: Map<ULID, DoublyChain<Page>>
  private _map: Map<ULID, Tree<Page>>
  constructor(
    private http: HttpClient,
    private appService: AppService,
    private envService: EnvService,
  ) {
    this._list = []
    this.list$ = new Subject()
    this._cur = undefined
    this.cur$ = new Subject()
    this._map = new Map()
    // 当应用改变时请求对应的页面数据
    this.appService.curApp$.subscribe(curApp => {
      this.reqList(curApp.ulid, this.envService.getCur())
      // this.setCur()
    })
  }
  getList() {
    return this._list
  }
  setList(arr: Page[]) {
    this._list = arr
    this.list$.next(this._list)
  }
  reqList(appUlid: ULID, env: ENV) {
    return this._reqList(appUlid, env).then((pageList: Page[]) => {
      return pageList
    }).then(pageList => {
      let app = this.appService.getCurApp()
      // let dc = arrToChain(pageList, 'ulid', 'nextUlid', app?.firstPageUlid)
      // this._map.set(app?.ulid || '', dc)
      // this.setList(dc.toArray())
      // return true
      if (app) {
        let tree = createTree<Page>()
        let curUlid = app.firstPageUlid
        if (curUlid) {
          let curPage = pageList.find(item => item.ulid === curUlid)
          if (curPage) {
            tree.mountRoot(curPage)
            let i = 0  
            while (curPage && i < 100) { // 为了安全
              let nextPage = pageList.find(item => item.ulid === curPage?.nextUlid)
              if (nextPage) {
                tree.mountNext(nextPage, curPage.ulid)
              }
              curPage = nextPage
            }
          }
        }
        // clog('tree', tree)
        this._map.set(app.ulid || '', tree)
        this.setList(tree.root?.toArray() || [])
      }
    })
  }
  // 请求页面列表
  private _reqList(appUlid: ULID, env: ENV): Promise<Page[]> {
    return new Promise((s, j) => {
      this.http.get<ResponseData>(`${serviceUrl()}/pages, {
        params: {
          appUlid,
          env,
        },
        withCredentials: true
      }).subscribe((res) => {
        if (res.code === 0) {
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  // 根据pageUlid设置当前页面
  setCur(pageUlid?: ULID) {
    this._cur = this.getPage(pageUlid)
    this.cur$.next(this._cur)
  }
  getCur() {
    return this._cur
  }
  getPage(pageUlid?: ULID) {
    return this._list.find(page => page.ulid === pageUlid)
  }
  getPageList(appUlid?: ULID): Page[] {
    appUlid = appUlid || String(this.appService.getCurApp()?.ulid)
    // return this._map.get(appUlid)?.toArray() || []
    return this._map.get(appUlid)?.root?.toArray() || []
  }
}
