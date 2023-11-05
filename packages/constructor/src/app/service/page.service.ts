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
