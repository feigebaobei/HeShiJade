import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, } from 'rxjs';
import type { ResponseData } from 'src/types';
import type { Page } from 'src/types/page';
import { AppService } from './app.service';
import { S } from 'src/types/base';
import { DoublyChain } from 'data-footstone'

let clog = console.log

type PageOrUn = Page | undefined

@Injectable({
  providedIn: 'root'
})
export class PageService {
  _pageList: Page[]
  _find: (p?: S) => PageOrUn
  pageSubject$: Subject<PageOrUn>
  _curPage: PageOrUn
  _chain: DoublyChain<Page>
  constructor(
    private http: HttpClient,
    private appService: AppService,
  ) {
    this._pageList = []
    this.pageSubject$ = new Subject<PageOrUn>()
    this._find = (pageUlid?: S) => {
      return this._curPage = this._pageList.find(item => item.ulid === pageUlid)
    }
    this._chain = new DoublyChain<Page>()
  }
  reqPageList() {
    return new Promise<Page[]>((s, j) => {
      let curApp = this.appService.getCurApp()
      if (curApp) {
        this.http.get<ResponseData>(`http://localhost:5000/pages?appUlid=${curApp.ulid}`, {
          withCredentials: true
        }).subscribe(res => {
          if (res.code === 0) {
            this._pageList = res.data
            this._opPageList(res.data)
            s(this.pageList())
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
    clog('_opPageList', _pageList)
    if (curApp) {
      let pageUlid: Page['nextUlid'] = curApp.firstPageUlid
      clog('pageUlid', pageUlid)
      while (pageUlid) {
        let page = _pageList.find(page => page.ulid === pageUlid)
        if (page) {
          this._chain.append(page)
          clog('page', page)
          clog('this._chain', this._chain)
          pageUlid = page.nextUlid
        } else {
          break
        }
      }
    }
  }
  // 获取pageList
  pageList() {
    return this._chain.toArray()
  }
  // 对外不暴露set pageList的方法
  curPage() {
    return this._curPage
  }
  setCurPage(pageUlid?: S) {
    this.pageSubject$.next(this._find(pageUlid))
  }
}
