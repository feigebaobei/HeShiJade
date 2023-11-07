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
      this.http.get<ResponseData>('http://localhost:5000/component', {
        params: {
          pageUlid
        }
      }).subscribe((res) => {
        if (res.code === 0) {
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  private setComponentList(componentList: Component[]) {
    this.componentList = componentList
    this.componentList$.next(this.componentList)
  }
  getComponentByPage(pageUlid: ULID) {
    // let dc = this._map.get(pageUlid)
    // if (dc) {
    //   this.componentList = dc.toArray()
    // } else {
    //   this._reqComponentByPage(pageUlid).then(data => {
    //     // this.componentList = []
    //     this.updateComponentList(data)
    //   })
    // }
    return this.updateComponentList(this.pageService.getPage(pageUlid))
  }
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
