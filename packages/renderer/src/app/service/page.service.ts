import { Injectable } from '@angular/core';
import { Page } from 'src/types/page';
import { HttpClient } from '@angular/common/http';
import { arrToChain, reqToPromise } from 'src/helper';
import { Subject } from 'rxjs';
// type
import type { ResponseData, ULID } from 'src/types'
import type { ENV } from 'src/types/base';
import { AppService } from './app.service';
import { EnvService } from './env.service';
import { DoublyChain } from 'data-footstone';

// 根据appUlid+env请求页面
// 根据app的第一个页面的ulid把页面列表转化为双向链表。
// 向外输出页面列表
// 输出当前页面

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private _list: Page[]
  list$: Subject<Page[]>
  private _cur: Page | undefined
  cur$: Subject<Page | undefined>
  private _map: Map<ULID, DoublyChain<Page>>
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
      let dc = arrToChain(pageList, 'ulid', 'nextUlid', app?.firstPageUlid)
      this._map.set(app?.ulid || '', dc)
      this.setList(dc.toArray())
      return true
    })
  }
  // 请求页面列表
  private _reqList(appUlid: ULID, env: ENV): Promise<Page[]> {
    return new Promise((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/pages', {
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
    // return new Promise((s, j) => {
    //   s([
    //     {
    //         // "_id": "64f20a5f371b34da631a9ac7",
    //         "key": "p0",
    //         "name": "p0",
    //         "ulid": "01H98QH03RWN0PVN9Y7FFA81XJ",
    //         "prevUlid": "",
    //         "nextUlid": "01H98QJ0W5CMSSA3GE80MJH2N6",
    //         "childUlid": "",
    //         "firstComponentUlid": "01HDXS0S6860PYXHS9F712XSEP",
    //         // "lastComponentUlid": "",
    //         "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR"
    //     },
    //     {
    //         // "_id": "64f20a7f371b34da631a9ac8",
    //         "key": "p1",
    //         "name": "p1",
    //         "ulid": "01H98QJ0W5CMSSA3GE80MJH2N6",
    //         "prevUlid": "01H98QH03RWN0PVN9Y7FFA81XJ",
    //         "nextUlid": "01H98QJ6PVGJDGYANZ6GPXENKS",
    //         "childUlid": "",
    //         "firstComponentUlid": "",
    //         // "lastComponentUlid": "",
    //         "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR"
    //     },
    //     {
    //         // "_id": "64f20a85371b34da631a9ac9",
    //         "key": "p2",
    //         "name": "p2",
    //         "ulid": "01H98QJ6PVGJDGYANZ6GPXENKS",
    //         "prevUlid": "01H98QJ0W5CMSSA3GE80MJH2N6",
    //         "nextUlid": "",
    //         "childUlid": "",
    //         "firstComponentUlid": "",
    //         // "lastComponentUlid": "",
    //         "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR"
    //     }
    // ])
    // })
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
    return this._map.get(appUlid)?.toArray() || []
  }
}
