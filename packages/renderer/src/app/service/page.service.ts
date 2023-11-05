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
  cur: Page | undefined
  cur$: Subject<Page | undefined>
  constructor(
    private http: HttpClient
  ) {
    this.list = []
    this.cur = undefined
    this.cur$ = new Subject()
  }
  setList(arr: Page[]) {
    this.list = arr
  }
  // 请求页面列表
  reqList(appUlid: ULID) {
    this._reqList(appUlid).then((pageList: Page[]) => {
      this.list = pageList
      // 可能需要做成响应式的
    }).catch(() => {})
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
  setCur(pageUlid?: ULID) {
    this.cur = this.list.find(item => item.ulid === pageUlid)
    this.cur$.next(this.cur)
  }
  getPage(pageUlid?: ULID) {
    return this.list.find(page => page.ulid === pageUlid)
  }
}
