import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoublyChain } from 'data-footstone'
// type
import type { ResponseData, ULID } from 'src/types';
import type { Component } from 'src/types/component';
import { PageService } from './page.service';
import { Page } from 'src/types/page';
import { Subject } from 'rxjs';
import { ENV } from 'src/types/base';
import { EnvService } from './env.service';
import { arrToChain } from 'src/helper';

// 使用当前页面ulid请求组件列表。保存在map中。
// 当页面改变时判断map中是否存在对应组件列表。若不存在，则执行no.1。否则null
// 输出组件列表

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private _map: Map<ULID, DoublyChain<Component>>
  private _componentList: Component[]
  componentList$: Subject<Component[]>
  constructor(
    private http: HttpClient,
    private pageService: PageService,
    private envService: EnvService,
  ) {
    this._map = new Map()
    this._componentList = []
    this.componentList$ = new Subject()
    this.pageService.cur$.subscribe(curPage => {
      if (curPage) {
        let arr: Component[] = this._map.get(curPage.ulid)?.toArray() || []
        if (!(arr?.length)) { // 现在有map中不存在对应的组件链表
          this.reqList(curPage.ulid, this.envService.getCur())
        } else {
          this.setList(arr)
        }
      }
    })
  }
  reqList(pageUlid: ULID, env: ENV) {
    this._reqComponentByPage(pageUlid, env).then(componentList => {
      let page = this.pageService.getCur()
      let dc = arrToChain(componentList, 'ulid', 'nextUlid', page?.firstComponentUlid)
      this._map.set(page?.ulid || '', dc)
      this.setList(dc.toArray())
    })
  }
  private _reqComponentByPage(pageUlid: ULID, env: ENV): Promise<Component[]> {
    return new Promise((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/components/', {
        params: {
          pageUlid,
          env,
        }
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
    //         // "_id": "653e5a3671bbda9eb70b5dca",
    //         "ulid": "01HDXS0S6860PYXHS9F712XSEP",
    //         "type": "Button",
    //         "next": "01HE5TKK9VB34ZNE4T7V220VWS",
    //         "prev": "",
    //         "props": {
    //             "type": "button",
    //             "bsSize": "md",
    //             "bordered": false,
    //             "disabled": false,
    //             "width": "100px"
    //         },
    //         "behavior": {},
    //         "item": {},
    //         "slot": "button",
    //         "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
    //         "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
    //     },
    //     {
    //         // "_id": "6542794b17d0f0bc541a5b12",
    //         "ulid": "01HE5TKK9VB34ZNE4T7V220VWS",
    //         "type": "Button",
    //         "next": "01HE8AQA0MR74BS4DFNH45HWJA",
    //         "prev": "01HDXS0S6860PYXHS9F712XSEP",
    //         "props": {
    //             "type": "button",
    //             "bsSize": "md",
    //             "bordered": false,
    //             "disabled": false,
    //             "width": "100px"
    //         },
    //         "behavior": {},
    //         "item": {},
    //         "slot": "button",
    //         "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
    //         "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
    //     },
    //     {
    //         // "_id": "6543c17245e08cd9adc4d59a",
    //         "ulid": "01HE8AQA0MR74BS4DFNH45HWJA",
    //         "type": "Form",
    //         "next": "01HED6W1HMMYV81ZETQ9CZ81NY",
    //         "prev": "01HE5TKK9VB34ZNE4T7V220VWS",
    //         "props": {},
    //         "behavior": {},
    //         "item": {},
    //         "slot": "",
    //         "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
    //         "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
    //     },
    //     {
    //         // "_id": "65464107c9eb514e2931f192",
    //         "ulid": "01HED6W1HMMYV81ZETQ9CZ81NY",
    //         "type": "Modal",
    //         "next": "01HED8TVQYYMXTJ2Y7YPDPRV5J",
    //         "prev": "01HE8AQA0MR74BS4DFNH45HWJA",
    //         "props": {
    //             "placement": "left",
    //             "title": "strsss",
    //             "visible": "true",
    //             "width": "33px"
    //         },
    //         "behavior": {},
    //         "item": {},
    //         "slot": "",
    //         "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
    //         "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
    //     },
    //     {
    //         // "_id": "65464912c9eb514e2931f193",
    //         "ulid": "01HED8TVQYYMXTJ2Y7YPDPRV5J",
    //         "type": "Modal",
    //         "next": "",
    //         "prev": "01HED6W1HMMYV81ZETQ9CZ81NY",
    //         "props": {
    //             "title": "str",
    //             "visible": true,
    //             "width": "",
    //             "placement": "center"
    //         },
    //         "behavior": {},
    //         "item": {},
    //         "slot": "",
    //         "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
    //         "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
    //     }
    // ])
    // })
  }
  getList() {
    return this._componentList
  }
  setList(p: Component[]) {
    this._componentList = p
    this.componentList$.next(this._componentList)
  }
}
