import { Injectable } from '@angular/core';
import { Page } from 'src/types/page';
import { HttpClient } from '@angular/common/http';
import { reqToPromise } from 'src/helper';
// type
import type { ResponseData, ULID } from 'src/types'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  list: Page[]
  list$: Subject<Page[]>
  cur: Page | undefined
  cur$: Subject<Page | undefined>
  constructor(
    private http: HttpClient
  ) {
    this.list = []
    this.list$ = new Subject()
    this.cur = undefined
    this.cur$ = new Subject()
  }
  setList(arr: Page[]) {
    this.list = arr
    this.list$.next(this.list)
    // 默认选中第一个页面
    // if (this.list.length) {
    //   this.setCur(this.list[0].ulid)
    // }
  }
  // 请求页面列表
  reqList(appUlid: ULID) {
    return this._reqList(appUlid).then((pageList: Page[]) => {
      this.setList(pageList)
      return pageList
    })// .catch(() => {})
  }
  private _reqList(appUlid: ULID): Promise<Page[]> {
    return new Promise((s, j) => {
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
  // 根据pageUlid设置当前页面
  setCur(pageUlid?: ULID) {
    this.cur = this.list.find(item => item.ulid === pageUlid)
    this.cur$.next(this.cur)
  }
  getPage(pageUlid?: ULID) {
    return this.list.find(page => page.ulid === pageUlid)
  }
}
