import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, } from 'rxjs';
import { DoublyChain } from 'data-footstone'
import { ulid } from 'ulid';
import { reqToPromise } from 'src/helper';
import { AppService } from './app.service';
import type { ResponseData } from 'src/types';
import type { Page } from 'src/types/page';
import type { S, ULID } from 'src/types/base';

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
  _chain: DoublyChain<Page> // 有_map，应该删除它。
  pageList$: Subject<Page[]>
  private _map: Map<ULID, DoublyChain<Page>>
  constructor(
    private http: HttpClient,
    private appService: AppService,
  ) {
    this._pageList = [] // 无顺序
    this.pageSubject$ = new Subject<PageOrUn>()
    this._find = (pageUlid: ULID, appUlid?: ULID) => {
      appUlid = appUlid || String(this.appService.getCurApp()?.ulid)
      return this._map.get(appUlid)?.toArray().find(item => item.ulid === pageUlid)
      // return this._curPage = this._pageList.find(item => item.ulid === pageUlid)

    }
    this._chain = new DoublyChain<Page>() // 有_map，应该删除它。
    this.pageList$ = new Subject<Page[]>()
    this._map = new Map()
    this.appService.appSubject$.subscribe(curApp => {
      let appUlid = curApp?.ulid
      if (appUlid) {
        this._opPageList(appUlid).then((arr) => {
          // let arr = this._map.get(String(appUlid))?.toArray() || []
          clog('arr', arr)
          this.pageList$.next(arr)
        })
      }
    })
  }
  // 可能用不上
  // initMap(appUlidList: ULID[]) {
  //   this._map.clear()
  //   appUlidList.forEach(appUlid => {
  //     let t = new DoublyChain<Page>()
  //     this._map.set(appUlid, t)
  //   })
  // }
  // reqPageList() {
  //   return new Promise<Page[]>((s, j) => {
  //     let curApp = this.appService.getCurApp()
  //     if (curApp) {
  //       this.http.get<ResponseData>(`http://localhost:5000/pages?appUlid=${curApp.ulid}`, {
  //         withCredentials: true
  //       }).subscribe(res => {
  //         if (res.code === 0) {
  //           // clog('res page', res.data)
  //           this._pageList = res.data
  //           this._opPageList(res.data)
  //           let pl = this.getPageList()
  //           this.pageList$.next(pl)
  //           s(pl)
  //         } else {
  //           j(new Error(res.message))
  //         }
  //       })
  //     } else {
  //       s(this._pageList = [])
  //     }
  //   })
  // }
  // reqPageList(appUlid: ULID) {
  //   return new Promise<Page[]>((s, j) => {
  //     // let curApp = this.appService.gt
  //     this.http.get<ResponseData>('http://localhost:5000/pages', {
  //       params: {
  //         appUlid
  //       },
  //       withCredentials: true
  //     }).subscribe(res => {
  //       if (res.code === 0) {
  //         this._opPageList(appUlid, res.data)
  //         s(this.getPageList(appUlid))
  //       } else {
  //         j(new Error(res.message))
  //       }
  //     })
  //   })
  // }
  // 请求指定应用的页面列表
  // reqPageList(appUlid: ULID) {
  //   return this._reqPageList(appUlid).then()
  // }
  // 把无序页面列表排序为有序
  // private _opPageList(appUlid: ULID, _pageList: Page[]) {
  //   let app = this.appService.getAppList().find(item => item.ulid === appUlid)
  //   let nextPageUlid = app?.firstPageUlid
  //   while (nextPageUlid) {
  //     let curPage = _pageList.find(item => item.ulid === nextPageUlid)
  //     if (curPage) {
  //       let dc = this._map.get(appUlid)
  //       if (dc) {
  //         dc.append(curPage)
  //       } else {
  //         let t = new DoublyChain<Page>()
  //         t.append(curPage)
  //         this._map.set(appUlid, t)
  //       }
  //     }
  //     nextPageUlid = curPage?.nextUlid
  //   }

  //   // this._chain.clear() // 清空
  //   // let curApp = this.appService.getCurApp()
  //   // // clog('_opPageList', _pageList, curApp)
  //   // if (curApp) {
  //   //   let pageUlid: Page['nextUlid'] = curApp.firstPageUlid
  //   //   // clog('pageUlid', pageUlid)
  //   //   while (pageUlid) {
  //   //     let page = _pageList.find(page => page.ulid === pageUlid)
  //   //     if (page) {
  //   //       this._chain.append(page)
  //   //       pageUlid = page.nextUlid
  //   //     } else {
  //   //       break
  //   //     }
  //   //   }
  //   // }
  // }
  // 把无序页面列表排序为有序
  // 返回指定应用的有序页面列表
  private _opPageList(appUlid: ULID) {
    let dc = this._map.get(appUlid)
    if (!dc) {
      return this._reqPageList(appUlid).then((pageList: Page[]) => {
        let dc = new DoublyChain<Page>()
        let app = this.appService.getCurApp()
        let nextPageUlid = app?.firstPageUlid
        while (nextPageUlid) {
          let page = pageList.find(item => item.ulid === nextPageUlid)
          if (page) {
            dc.append(page)
          }
          nextPageUlid = page?.nextUlid
        }
        this._map.set(appUlid, dc)
        return dc.toArray()
      })
    } else {
      return Promise.resolve(this._map.get(appUlid)?.toArray() || [])
    }
  }
  _reqPageList(appUlid: ULID) {
    return new Promise<Page[]>((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/pages', {
        params: {
          appUlid
        },
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          // this._opPageList(appUlid, res.data)
          // s(this.getPageList(res.data))
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  // 获取pageList
  getPageList(appUlid?: ULID): Page[] {
    appUlid = appUlid || String(this.appService.getCurApp()?.ulid)
    return this._map.get(appUlid)?.toArray() || []
  }
  // 对外不暴露set pageList的方法
  getCurPage() {
    return this._curPage
  }
  setCurPage(pageUlid: ULID) {
    // this.setCurPage()
    // this._curPage = 
    // clog('setCurApp', pageUlid)
    this._curPage = this._find(pageUlid)
    this.pageSubject$.next(this._curPage)
  }
  // 重铸
  // recast(): Promise<Page[]> {
  //   return this.reqPageList().then((pageList) => {
  //     this.setCurPage(this.getCurPage()?.ulid)
  //     return pageList
  //   })
  // }
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
      })).then(() => {
        let pageDc = this._map.get(appUlid)
        pageDc?.append({
          key: data.key,
          name: data.name,
          ulid: u,
          prevUlid: pageDc.tail?.value.ulid || '',
          nextUlid: '',
          childUlid: '',
          firstComponentUlid: '',
          appUlid,
        })
      })
    } else {
      return Promise.reject(new Error('无此应用'))
    }
  }
}
