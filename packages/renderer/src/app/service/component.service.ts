import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoublyChain } from 'data-footstone'
// type
import type { ResponseData, ULID } from 'src/types';
import type { Component } from 'src/types/component';
import { PageService } from './page.service';
import { Page } from 'src/types/page';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private _map: Map<ULID, DoublyChain<Component>>
  componentList: Component[]
  componentList$: Subject<Component[]>
  constructor(
    private http: HttpClient,
    private pageService: PageService,
  ) {
    this._map = new Map()
    this.componentList = []
    this.componentList$ = new Subject()
    this.pageService.cur$.subscribe((curPage: Page | undefined) => {
      this.updateComponentList(curPage)
    })
  }
  private _reqComponentByPage(pageUlid: ULID): Promise<Component[]> {
    return new Promise((s, j) => {
      // this.http.get<ResponseData>('http://localhost:5000/components/listByPage', {
      //   params: {
      //     pageUlid
      //   }
      // }).subscribe((res) => {
      //   if (res.code === 0) {
      //     s(res.data)
      //   } else {
      //     j(new Error(res.message))
      //   }
      // })
      s([
        {
            // "_id": "653e5a3671bbda9eb70b5dca",
            "ulid": "01HDXS0S6860PYXHS9F712XSEP",
            "type": "Button",
            "next": "01HE5TKK9VB34ZNE4T7V220VWS",
            "prev": "",
            "props": {
                "type": "button",
                "bsSize": "md",
                "bordered": false,
                "disabled": false,
                "width": "100px"
            },
            "behavior": {},
            "item": {},
            "slot": "button",
            "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
            "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
        },
        {
            // "_id": "6542794b17d0f0bc541a5b12",
            "ulid": "01HE5TKK9VB34ZNE4T7V220VWS",
            "type": "Button",
            "next": "01HE8AQA0MR74BS4DFNH45HWJA",
            "prev": "01HDXS0S6860PYXHS9F712XSEP",
            "props": {
                "type": "button",
                "bsSize": "md",
                "bordered": false,
                "disabled": false,
                "width": "100px"
            },
            "behavior": {},
            "item": {},
            "slot": "button",
            "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
            "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
        },
        {
            // "_id": "6543c17245e08cd9adc4d59a",
            "ulid": "01HE8AQA0MR74BS4DFNH45HWJA",
            "type": "Form",
            "next": "01HED6W1HMMYV81ZETQ9CZ81NY",
            "prev": "01HE5TKK9VB34ZNE4T7V220VWS",
            "props": {},
            "behavior": {},
            "item": {},
            "slot": "",
            "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
            "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
        },
        {
            // "_id": "65464107c9eb514e2931f192",
            "ulid": "01HED6W1HMMYV81ZETQ9CZ81NY",
            "type": "Modal",
            "next": "01HED8TVQYYMXTJ2Y7YPDPRV5J",
            "prev": "01HE8AQA0MR74BS4DFNH45HWJA",
            "props": {
                "placement": "left",
                "title": "strsss",
                "visible": "true",
                "width": "33px"
            },
            "behavior": {},
            "item": {},
            "slot": "",
            "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
            "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
        },
        {
            // "_id": "65464912c9eb514e2931f193",
            "ulid": "01HED8TVQYYMXTJ2Y7YPDPRV5J",
            "type": "Modal",
            "next": "",
            "prev": "01HED6W1HMMYV81ZETQ9CZ81NY",
            "props": {
                "title": "str",
                "visible": true,
                "width": "",
                "placement": "center"
            },
            "behavior": {},
            "item": {},
            "slot": "",
            "appUlid": "01H90VXCNB7SQZCTEQDTN06FPR",
            "pageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ"
        }
    ])
    })
  }
  private setComponentList(componentList: Component[]) {
    this.componentList = componentList
    this.componentList$.next(this.componentList)
  }
  // 根据页面ulid取得组件列表
  getComponentByPage(pageUlid: ULID): Component[] {
    this.updateComponentList(this.pageService.getPage(pageUlid))
    return this._map.get(pageUlid)?.toArray() || []
  }
  // 更新指定页面的组件列表
  updateComponentList(curPage?: Page) {
    if (curPage) {
      let dc = this._map.get(curPage.ulid)
      if (dc) {
        this.setComponentList(dc.toArray())
      } else {
        this._reqComponentByPage(curPage.ulid).then((componentList: Component[]) => {
          let next = curPage.firstComponentUlid
          let doublyChain = new DoublyChain<Component>()
          while (next) {
            let comp = componentList.find(item => item.ulid === next)
            if (comp) {
              doublyChain.append(comp)
            }
            next = comp?.next
          }
          this._map.set(curPage.ulid, doublyChain)
          this.setComponentList(doublyChain.toArray())
        })
      }
    } else {
      this.setComponentList([])
    }
  }
}
