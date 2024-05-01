import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, } from 'rxjs';
// import { DoublyChain } from 'data-footstone'
import { createTree } from 'src/helper/tree';
import { ulid } from 'ulid';
import { reqToPromise } from 'src/helper';
import { AppService } from './app.service';
import { serviceUrl } from 'src/helper/config';
// import { ComponentService } from './component.service';
import type { ResponseData } from 'src/types';
import type { App } from 'src/types/app';
import type { Page } from 'src/types/page';
import type { S, ULID } from 'src/types/base';
import type { Tree } from 'src/helper/tree';
import type { Component } from 'src/types/component';

let clog = console.log

type PageOrUn = Page | undefined
interface AddData {
  key: S
  name: S
}

@Injectable({
  providedIn: 'root'
})
export class PageService {
  _pageList: Page[]
  _find: (p: ULID, appUlid?: ULID) => PageOrUn
  pageSubject$: Subject<PageOrUn>
  _curPage: PageOrUn
  pageList$: Subject<Page[]>
  private _map: Map<ULID, Tree<Page>>
  constructor(
    private http: HttpClient,
    private appService: AppService,
    // private componentService: ComponentService
  ) {
    this._pageList = []
    this.pageSubject$ = new Subject<PageOrUn>()
    this._find = (pageUlid: ULID, appUlid?: ULID) => {
      appUlid = appUlid || String(this.appService.getCurApp()?.ulid)
      // return this._map.get(appUlid)?.toArray().find(item => item.ulid === pageUlid)
      return this._map.get(appUlid)?.find(pageUlid)?.value
    }
    this.pageList$ = new Subject<Page[]>()
    this._map = new Map()
  }
  storePageList(app: App, pagsList: Page[]) {
    let tree = createTree<Page>()
    let curPageUlid = app.firstPageUlid
    if (curPageUlid) {
      let curPage = pagsList.find(item => item.ulid === curPageUlid)
      if (curPage) {
        tree.mountRoot(curPage)
        while(curPage) {
          let nextPage = pagsList.find(item => item.ulid === curPage?.nextUlid)
          if (nextPage) {
            tree.mountNext(nextPage, curPage.ulid)
          }
          curPage = nextPage
        }
        this._map.set(app.ulid, tree)
      }
    }
  }
  // 把无序页面列表排序为有序
  // 返回指定应用的有序页面列表
  // 05.15+ delete
  private _opPageList(appUlid: ULID) {
    let dc = this._map.get(appUlid)
    if (!dc) {
      return this.reqPageList(appUlid).then((pageList: Page[]) => {
        // todo 应该兼容子页面
        let tree = createTree<Page>()
        let app = this.appService.getCurApp()
        let curPageUlid = app?.firstPageUlid
        if (curPageUlid) {
          let curPage = pageList.find(item => item.ulid === curPageUlid)
          if (curPage) {
            tree.mountRoot(curPage)
            while(curPage) {
              let nextPage = pageList.find(item => item.ulid === curPage!.nextUlid)
              if (nextPage) {
                tree.mountNext(nextPage, curPage.ulid)
              }
              curPage = nextPage
            }
            this._map.set(appUlid, tree)
            this.pageList$.next(tree.root!.toArray())
          } else {
            this.pageList$.next([])
          }
        } else {
          this.pageList$.next([])
        }
      })
    } else {
      return Promise.resolve(this._map.get(appUlid)?.root?.toArray() || [])
    }
  }
  reqPageList(appUlid: ULID) {
    clog(12345, `${serviceUrl()}/pages`)
    return new Promise<Page[]>((s, j) => {
      this.http.get<ResponseData>(`${serviceUrl()}/pages`, {
        params: {
          appUlid,
          env: 'dev'
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
  getPageList(appUlid?: ULID): Promise<Page[]> {
    // clog('getPageList', appUlid)
    let appUlid2 = appUlid || String(this.appService.getCurApp()?.ulid)
    let pageTree = this._map.get(appUlid2)
    if (pageTree) {
      return Promise.resolve(pageTree.root?.toArray() || [])
    } else {
      return this.reqPageList(appUlid2).then((pageList: Page[]) => {
        return this.appService.getAppList().then(appList => {
          let app = appList.find(item => item.ulid === appUlid2)
          if (app) {
            this.storePageList(app, pageList)
            return true
          } else {
            return Promise.reject('无此应用')
          }
        })
      }).then(() => {
        return Promise.resolve(this._map.get(appUlid2)?.root?.toArray() || [])
      }).catch(error => {
        return Promise.reject(error)
      })
    }
  }
  getCurPage() {
    return this._curPage
  }
  setCurPage(p: Page | ULID): void {
    if (typeof p === 'string') {
      this._curPage = this._find(p)
    } else if (typeof p === 'object') {
      this._curPage = p
    }
    this.pageSubject$.next(this._curPage)
  }
  // 重铸
  recast() {
  }
  // 若在断网、弱网环境下应该缓存请求到ls中，在强网时再依次请求。
  // add(data: AddData) {
  add(page: Page) {
    let app = this.appService.getCurApp()
    if (app) {
      // let u: ULID = ulid()
      let appUlid = app.ulid
      let pageDc = this._map.get(appUlid)
      let pageObj = page
      if (this._pageList) {
        pageDc?.mountNext(pageObj, pageObj.prevUlid)
      } else {
        pageDc?.mountRoot(pageObj)
      }
    }
  }
  reqPostPage(data: AddData, pageUlid: ULID) {
    return new Promise((s, j) => {
      let app = this.appService.getCurApp()
      if (app) {
        // let u: ULID = ulid()
        let u: ULID = pageUlid
        let appUlid = app.ulid
        this.http.post<ResponseData>(`${serviceUrl()}/pages`, {
          key: data.key,
          name: data.name,
          ulid: u,
          appUlid,
        }, {
          withCredentials: true,
        }).subscribe(res => {
          if (res.code === 0) {
            s(true)
          } else {
            j()
          }
        })
      } else {
        j(new Error('无此应用'))
      }
    })
  }
  // 计划不支持lastComponentUlid了。
  deleteComponent(component: Component) {
    let pageTree = this._map.get(component.appUlid)
    if (pageTree) {
      let cur = pageTree.root
      while (cur) {
        if (cur.value.firstComponentUlid === component.ulid) {
          cur.value.firstComponentUlid = ''
        }
        cur = cur.next
      }
    }
  }
  deletePageByUlid(ulid: ULID) {
    // 在页面树中删除
    let appUlid = String(this.appService.getCurApp()?.ulid)
    let tree = this._map.get(appUlid)
    tree?.unmount(ulid)
    this.pageList$.next(tree?.root?.toArray() || [])
    // 在应用树中删除
    this.appService.deletePageByUlid(ulid)
  }
  reqDeletePage(ulid: ULID) {
    return new Promise((s, j) => {
      this.http.delete<ResponseData>(`${serviceUrl()}/pages`, {
        params: {
          ulid
        },
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          s(true)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
}
