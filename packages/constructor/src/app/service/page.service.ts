import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, } from 'rxjs';
// import { DoublyChain } from 'data-footstone'
import { createTree } from 'src/helper/tree';
import { ulid } from 'ulid';
import { reqToPromise } from 'src/helper';
import { AppService } from './app.service';
import type { ResponseData } from 'src/types';
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
  // _chain: DoublyChain<Page> // 有_map，应该删除它。
  pageList$: Subject<Page[]>
  // private _map: Map<ULID, DoublyChain<Page>>
  private _map: Map<ULID, Tree<Page>>
  constructor(
    private http: HttpClient,
    private appService: AppService,
  ) {
    this._pageList = [] // 无顺序
    this.pageSubject$ = new Subject<PageOrUn>()
    this._find = (pageUlid: ULID, appUlid?: ULID) => {
      appUlid = appUlid || String(this.appService.getCurApp()?.ulid)
      // return this._map.get(appUlid)?.toArray().find(item => item.ulid === pageUlid)
      return this._map.get(appUlid)?.find(pageUlid)?.value
    }
    // this._chain = new DoublyChain<Page>() // 有_map，应该删除它。
    this.pageList$ = new Subject<Page[]>()
    this._map = new Map()
    // 当当前应用改变时请求页面列表
    this.appService.appSubject$.subscribe(curApp => {
      let appUlid = curApp?.ulid
      if (appUlid) {
        this._opPageList(appUlid)
        // .then((arr) => {
        //   this.pageList$.next(arr)
        // })
      }
    })
  }
  // 把无序页面列表排序为有序
  // 返回指定应用的有序页面列表
  private _opPageList(appUlid: ULID) {
    let dc = this._map.get(appUlid)
    if (!dc) {
      return this._reqPageList(appUlid).then((pageList: Page[]) => {
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
              // clog('nextPage',nextPage, curPage.ulid)
              if (nextPage) {
                tree.mountNext(nextPage, curPage.ulid)
              }
              curPage = nextPage
            }
            this._map.set(appUlid, tree)
            // clog('tree page', tree)
            this.pageList$.next(tree.root!.toArray())
          } else {
            this.pageList$.next([])
          }
        } else {
          this.pageList$.next([])
        }
      })
    } else {
      // return Promise.resolve(this._map.get(appUlid)?.toArray() || [])
      return Promise.resolve(this._map.get(appUlid)?.root?.toArray() || [])
    }
  }
  _reqPageList(appUlid: ULID) {
    return new Promise<Page[]>((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/pages', {
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
  // 获取pageList
  // getPageList(appUlid?: ULID): Page[] {
  //   appUlid = appUlid || (this.appService.getCurApp()?.ulid || '')
  //   return this._map.get(appUlid)?.toArray() || []
  // }
  // setPageList() {
  //   this.pageList$.next(this._pageList)
  // }
  // 对外不暴露set pageList的方法
  getCurPage() {
    return this._curPage
  }
  setCurPage(pageUlid: ULID) {
    this._curPage = this._find(pageUlid)
    this.pageSubject$.next(this._curPage)
  }
  // 重铸
  recast() {
    // let app = this.appService.getCurApp()
    // let appUlid = app?.ulid || ''
    // // let dc = new DoublyChain<Page>()
    // let p: Promise<Page[]>
    // if (appUlid) {
    //   p = this._reqPageList(appUlid).then((pageList: Page[]) => {
    //     let nextPageUlid = app?.firstPageUlid
    //     while (nextPageUlid) {
    //       let page = pageList.find(item => item.ulid === nextPageUlid)
    //       if (page) {
    //         dc.append(page)
    //       }
    //       nextPageUlid = page?.nextUlid
    //     }
    //     this._map.set(appUlid, dc)
    //     return dc.toArray()
    //   })
    // } else {
    //   this._map.set(appUlid, dc)
    //   p = Promise.resolve(dc.toArray())
    // }
    // return p
  }
  // 若在断网、弱网环境下应该缓存请求到ls中，在强网时再依次请求。
  add(data: AddData) {
    let app = this.appService.getCurApp()
    if (app) {
      let u: ULID = ulid()
      let appUlid = app.ulid
      return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/pages', {
        key: data.key,
        name: data.name,
        ulid: u,
        appUlid, // : app.ulid,
      }, {
        withCredentials: true,
      })).then(() => {
        let pageDc = this._map.get(appUlid)
        // pageDc?.append({
        //   key: data.key,
        //   name: data.name,
        //   ulid: u,
        //   prevUlid: pageDc.tail?.value.ulid || '',
        //   nextUlid: '',
        //   childUlid: '',
        //   firstComponentUlid: '',
        //   appUlid,
        // })
        // this.pageList$.next(pageDc?.toArray() || [])
        let pageObj = {
          key: data.key,
          name: data.name,
          ulid: u,
          prevUlid: this._pageList.length ? this._pageList[this._pageList.length - 1].ulid : '',
          nextUlid: '',
          childUlid: '',
          firstComponentUlid: '',
          appUlid,
        }
        if (this._pageList) {
          pageDc?.mountNext(pageObj, this._pageList[this._pageList.length - 1].ulid)
        } else {
          pageDc?.mountRoot(pageObj)
        }
      })
    } else {
      return Promise.reject(new Error('无此应用'))
    }
  }
  // deleteComponent(component: Component, componentUlid: ULID, pageUlid: ULID, appUlid: ULID) {
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
  //   let dc = this._map.get(component.appUlid)
  //   if (dc) {
  //     let cur = dc.head
  //     while (cur) {
  //       if (cur.value.ulid === component.pageUlid) {
  //         if (cur.value.firstComponentUlid === component.ulid) {
  //           if (cur.value.lastComponentUlid === component.ulid) {
  //             cur.value.firstComponentUlid = ''
  //             cur.value.lastComponentUlid = ''
  //           } else {
  //             cur.value.firstComponentUlid = component.nextUlid
  //           }
  //         } else {
  //           if (cur.value.lastComponentUlid === component.ulid) {
  //             cur.value.lastComponentUlid = component.prevUlid
  //           } else {
  //             // null
  //           }
  //         }
  //         break;
  //       }
  //       cur = cur.next
  //     }
  //   }
  }
}
