import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, } from 'rxjs';
import type { ResponseData } from 'src/types';
import type { Page } from 'src/types/page';
import { AppService } from './app.service';
import { S } from 'src/types/base';

type PageOrUn = Page | undefined

@Injectable({
  providedIn: 'root'
})
export class PageService {
  pageList: Page[]
  _find: (p: S) => PageOrUn
  pageSubject$: Subject<PageOrUn>
  _curPage: PageOrUn
  constructor(
    private http: HttpClient,
    private appService: AppService,
  ) {
    this.pageList = []
    this.pageSubject$ = new Subject<PageOrUn>()
    this._find = (pageUlid: S) => {
      return this._curPage = this.pageList.find(item => item.ulid === pageUlid)
    }
  }
  getPageList() {
    return new Promise<Page[]>((s, j) => {
      this.http.get<ResponseData>(`http://localhost:5000/page?appUlid=${this.appService.curApp?.ulid}`, {
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          this.pageList = res.data
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  curPage() {
    return this._curPage
  }
  setCurPage(pageUlid: S) {
    this.pageSubject$.next(this._find(pageUlid))
  }
}
