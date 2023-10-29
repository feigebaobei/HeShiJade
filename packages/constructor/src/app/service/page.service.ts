import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, } from 'rxjs';
import { DoublyChain } from 'data-footstone'
import { ulid } from 'ulid';
import { reqToPromise } from 'src/helper';
import { AppService } from './app.service';
import type { ResponseData } from 'src/types';
import type { Page } from 'src/types/page';
import type { S } from 'src/types/base';

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
  _find: (p?: S) => PageOrUn
  pageSubject$: Subject<PageOrUn>
  _curPage: PageOrUn
  _chain: DoublyChain<Page>
  pageList$: Subject<Page[]>
  constructor(
    private http: HttpClient,
    private appService: AppService,
  ) {
    this._pageList = [] // 无顺序
    this.pageSubject$ = new Subject<PageOrUn>()
    this._find = (pageUlid?: S) => {
      return this._curPage = this._pageList.find(item => item.ulid === pageUlid)
    }
    this._chain = new DoublyChain<Page>()
    this.pageList$ = new Subject<Page[]>()
  }
  reqPageList() {
    return new Promise<Page[]>((s, j) => {
      let curApp = this.appService.getCurApp()
      if (curApp) {
        this.http.get<ResponseData>(`http://localhost:5000/pages?appUlid=${curApp.ulid}`, {
          withCredentials: true
        }).subscribe(res => {
          if (res.code === 0) {
            // clog('res page', res.data)
            this._pageList = res.data
            this._opPageList(res.data)
            let pl = this.getPageList()
            this.pageList$.next(pl)
            s(pl)
          } else {
            j(new Error(res.message))
          }
        })
      } else {
        s(this._pageList = [])
      }
    })
  }
  private _opPageList(_pageList: Page[]) {
    this._chain.clear() // 清空
    let curApp = this.appService.getCurApp()
    // clog('_opPageList', _pageList, curApp)
    if (curApp) {
      let pageUlid: Page['nextUlid'] = curApp.firstPageUlid
      // clog('pageUlid', pageUlid)
      while (pageUlid) {
        let page = _pageList.find(page => page.ulid === pageUlid)
        if (page) {
          this._chain.append(page)
          // clog('page', page)
          // clog('this._chain', this._chain)
          pageUlid = page.nextUlid
        } else {
          break
        }
      }
    }
  }
  // 获取pageList
  getPageList(): Page[] {
    return this._chain.toArray()
  }
  // 对外不暴露set pageList的方法
  getCurPage() {
    return this._curPage
  }
  setCurPage(pageUlid?: S) {
    // this.setCurPage()
    // this._curPage = 
    this.pageSubject$.next(this._find(pageUlid))
  }
  // 重铸
  recast(): Promise<Page[]> {
    // return this.appService.recast().then(() => {
    //   return this.reqPageList()
    // })
    return this.reqPageList().then((pageList) => {
      this.setCurPage(this.getCurPage()?.ulid)
      return pageList
    })
  }
  add(data: AddData) {
    return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/pages', {
      key: data.key,
      name: data.name,
      ulid: ulid(),
      appUlid: this.appService.getCurApp()?.ulid,
    }))//.then(data => {})
  }
}
