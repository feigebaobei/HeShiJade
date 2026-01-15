import { effect, Injectable } from '@angular/core';
import { Page } from 'src/types/page';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { EnvService } from './env.service';
import { createTree } from 'src/helper/tree';
import { serviceUrl } from 'src/helper/config'
import { pool } from 'src/helper/pool';
// import { trigger } from 'src/helper/utils'
// type
import type { ResponseData, ULID, } from 'src/types'
import type { ENV, S} from 'src/types/base';
import type { Tree } from 'src/helper/tree';
import { ShareSignal } from 'src/helper/shareSignal';
import { compatiblePageData } from 'src/helper';

// 根据appUlid+env请求页面
// 根据app的第一个页面的ulid把页面列表转化为双向链表。
// 向外输出页面列表
// 输出当前页面

let clog = console.log

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private _list: Page[]
  listS: ShareSignal<Page[]>
  private _cur: Page | undefined
  curS: ShareSignal<Page | undefined>
  // private _map: Map<ULID, DoublyChain<Page>>
  private _map: Map<ULID, Tree<Page>>
  constructor(
    private http: HttpClient,
    private appService: AppService,
    private envService: EnvService,
  ) {
    this._list = []
    this.listS = new ShareSignal([])
    this._cur = undefined
    this.curS = new ShareSignal(undefined)
    this._map = new Map()
    // 当应用改变时
    effect(() => {
      let p = this.appService.curAppS.get()
      if (p) {
        this.reqList(p.ulid, this.envService.getCur()) // 请求对应的页面数据
      }
    })
  }
  getList() {
    return this._list
  }
  setList(arr: Page[]) {
    this._list = arr
    this.listS.set(this._list)
  }
  reqList(appUlid: ULID, env: ENV) {
    return this._reqList(appUlid, env).then((pageList: Page[]) => {
      return compatiblePageData(pageList)
    }).then(pageList => {
      let app = this.appService.getCurApp()
      if (app) {
        // 组成页面树
        let tree = createTree<Page>()
        let curUlid = app.firstPageUlid
        if (curUlid) {
          let curPage = pageList.find(item => item.ulid === curUlid)
          if (curPage) {
            tree.mountRoot(curPage)
            let i = 0  
            while (curPage && i < 100) { // 为了安全
              let nextPage = pageList.find(item => item.ulid === curPage?.nextUlid)
              if (nextPage) {
                tree.mountNext(nextPage, curPage.ulid)
              }
              curPage = nextPage
            }
          }
        }
        this._map.set(app.ulid || '', tree)
        // 缓存起来
        this.setList(tree.root?.toArray() || [])
        // 绑定事件
        this.getList().forEach(pageItem => {
          pool.register(pageItem.ulid, pageItem, pageItem.behavior)
        })
      }
      return true
    })
  }
  // 请求页面列表
  private _reqList(appUlid: ULID, env: ENV): Promise<Page[]> {
    return new Promise((s, j) => {
      this.http.get<ResponseData>(`${serviceUrl()}/pages`, {
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
  }
  // 根据pageUlid设置当前页面
  setCur(pageUlid?: ULID) {
    this._cur = this.getPage(pageUlid)
    this.curS.set(this._cur)
    // if (pageUlid) {
    //   trigger(pageUlid, 'pageLoading', undefined, this)
    // }
  }
  setCurByKey(key: S) {
    let p = this.getList().find(item => item.key === key)
    if (p) {
      this.setCur(p.ulid)
    }
  }
  getCur() {
    return this._cur
  }
  getPage(pageUlid?: ULID) {
    return this._list.find(page => page.ulid === pageUlid)
  }
  getPageList(appUlid?: ULID): Page[] {
    appUlid = appUlid || String(this.appService.getCurApp()?.ulid)
    // return this._map.get(appUlid)?.toArray() || []
    return this._map.get(appUlid)?.root?.toArray() || []
  }
}
