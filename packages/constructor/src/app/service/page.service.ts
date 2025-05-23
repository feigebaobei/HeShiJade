import { Injectable } from '@angular/core';
import { createTree } from 'src/helper/tree';
import { AppService } from './app.service';
import { serviceUrl } from 'src/helper/config';
import { ReqService } from './req.service';
import { ShareSignal } from 'src/helper/shareSignal';
import type { App } from 'src/types/app';
import type { Page } from 'src/types/page';
import type { S, ULID, N, A, B } from 'src/types/base';
import type { Tree } from 'src/helper/tree';
import type { Component, BehaviorMeta, BehaviorMetaItem, BehaviorItemKey, PropsValue } from 'src/types/component';

type UpdateType = 'props' | 'behavior' | 'slot' | 'plugin' | 'gridLayout'

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
  private _find: (appUlid: ULID, pageUlid: ULID) => PageOrUn
  pageS: ShareSignal<PageOrUn>
  _curPage: PageOrUn
  pageListS: ShareSignal<Page[]>
  private _map: Map<ULID, Tree<Page>>
  constructor(
    private appService: AppService,
    private reqService: ReqService,
  ) {
    this._pageList = []
    this.pageS = new ShareSignal<PageOrUn>(undefined)
    this._find = (appUlid: ULID, pageUlid: ULID, ) => {
      let treePage = this._map.get(appUlid)
      return treePage?.find(pageUlid)?.value
    }
    this.pageListS = new ShareSignal<Page[]>([])
    this._map = new Map()
  }
  storePageList(app: App, pagsList: Page[]) {
    let tree = createTree<Page>()
    let curPageUlid = app.firstPageUlid
    if (curPageUlid) {
      let curPage = pagsList.find(item => item.ulid === curPageUlid)
      if (curPage) {
        tree.mountRoot(curPage)
        while(curPage) {
          let nextPage = pagsList.find(item => item.ulid === curPage?.nextUlid)
          if (nextPage) {
            tree.mountNext(nextPage, curPage.ulid)
          }
          curPage = nextPage
        }
        this._map.set(app.ulid, tree)
      }
    }
  }
  reqPageList(appUlid: ULID) {
    return this.reqService.req(`${serviceUrl()}/pages`, 'get', {appUlid, env: 'dev'}).then(res => res.data)
  }
  // todo 应用也统一使用hard参数
  // hard表示是否强制。下面的逻辑写错了。应该是为true时从后端取。
  getPageList(appUlid: ULID, hard = false): Promise<Page[]> {
    // clog(this._map)
    // return Promise.resolve([] as Page[])
    let pageTree = this._map.get(appUlid)
    if (hard) {
      return Promise.resolve(pageTree?.root?.toArray() || [])
    }
    if (pageTree) {
      return Promise.resolve(pageTree.root?.toArray() || [])
    } else {
      return this.reqPageList(appUlid).then((pageList: Page[]) => {
        return this.appService.getAppList().then(appList => {
          let app = appList.find(item => item.ulid === appUlid)
          if (app) {
            this.storePageList(app, pageList)
            return true
          } else {
            return Promise.reject('无此应用')
          }
        })
      }).then(() => {
        return Promise.resolve(this._map.get(appUlid)?.root?.toArray() || [])
      }).catch(error => {
        return Promise.reject(error)
      })
    }
  }
  getCurPage() {
    return this._curPage
  }
  setCurPage(appUlid: ULID, pageUlid: ULID): void {
    this._curPage = this._find(appUlid, pageUlid)
    this.pageS.set(this._curPage)
  }
  // 重铸
  recast() {
  }
  // 若在断网、弱网环境下应该缓存请求到ls中，在强网时再依次请求。
  add(appUlid: ULID, page: Page) {
    let pageTree = this._map.get(appUlid)
    if (pageTree?.root) {
      pageTree?.mountNext(page, page.prevUlid)
    } else {
      pageTree?.mountRoot(page)
    }
    // clog('add', pageTree, pageTree?.root?.toArray(), page, appUlid)
  }
  reqPostPage(data: AddData, appUlid: ULID, pageUlid: ULID) {
    return new Promise((s, j) => {
      let u: ULID = pageUlid
      this.reqService.req(`${serviceUrl()}/pages`, 'post', {
        key: data.key,
        name: data.name,
        ulid: u,
        appUlid,
      }).then(() => {
        s(true)
      }).catch(() => {
        j()
      })
    })
  }
  // 计划不支持lastComponentUlid了。
  deleteComponent(component: Component) {
    let pageTree = this._map.get(component.appUlid)
    if (pageTree) {
      let cur = pageTree.root
      while (cur) {
        if (cur.value.firstComponentUlid === component.ulid) {
          cur.value.firstComponentUlid = ''
        }
        cur = cur.next
      }
    }
  }
  deletePageByUlid(ulid: ULID) {
    // 在页面树中删除
    let appUlid = String(this.appService.getCurApp()?.ulid)
    let tree = this._map.get(appUlid)
    tree?.unmount(ulid)
    this.pageListS.set(tree?.root?.toArray() || [])
    // 在应用树中删除
    this.appService.deletePageByUlid(ulid)
  }
  reqDeletePage(ulid: ULID) {
    return this.reqService.req(`${serviceUrl()}/pages`, 'delete', {ulid}).then(() => true)
  }
  // update(ulid: ULID, key: Pick<Page, 'key' | 'name' | 'ulid' | 'prevUlid'>, value: string): void
  // update(ulid: ULID, key: 'behavior', value: BehaviorMeta): void {
  // update(ulid: ULID, key: keyof Page, value: S & BehaviorMeta): void {
  // update(ulid: ULID, key: 'key' | 'name' | 'ulid' | 'prevUlid', value: S): void
  // update(ulid: ULID, key: 'behavior', value: BehaviorMeta): void {
  //   // 更新tree中的数据
  //   let app = this.appService.getCurApp()
  //   let node = this._map.get(String(app?.ulid))?.find(ulid)
  //   if (node) {
  //     // node.value[key] = value
  //     // if (['key', 'name', 'ulid', 'prevUlid'].includes(key)) {
  //     //   node.value[key] = value
  //     // } else {
  //     //   node.value[key] = value
  //     // }
  //     switch (key) {
  //       case 'behavior':
  //         node.value[key] = value
  //         break;
  //       default:
  //         node.value[key] = value
  //         break;
  //     }
  //   }
  // }
  updateStr(ulid: ULID, key: Exclude<keyof Page, 'behavior'>, value: S) {
    // 更新tree中的数据
    let app = this.appService.getCurApp()
    let node = this._map.get(String(app?.ulid))?.find(ulid)
    if (node) {
      node.value[key] = value
    }
  }
  updateBehavior(ulid: ULID, key: 'behavior', value: BehaviorMeta) {
    // 更新tree中的数据
    let app = this.appService.getCurApp()
    let node = this._map.get(String(app?.ulid))?.find(ulid)
    if (node) {
      node.value[key] = value
    }
  }
  reqUpdate(ulid: ULID, type: 'meta' , key: keyof Page, value: S): any 
  reqUpdate(ulid: ULID, type: 'behavior', key: S, value: S, index: N,): any
  reqUpdate(ulid: ULID, type: 'meta' | 'behavior', key: Page | S, value: S, index?: N,) {
    switch (type) {
      case 'meta':
        return this.reqService.req(`${serviceUrl()}/pages`, 'put', {ulid, type, key, value})
      case 'behavior':
        return this.reqService.req(`${serviceUrl()}/pages`, 'put', {ulid, type, index, key, value})
    }
  }
  deletePageByAppUlid(appUlid: ULID) {
    this._map.delete(appUlid)
  }
  createApp(appUlid: ULID) {
    this._map.set(appUlid, createTree<Page>())
  }
  // setComponentsBehavior( index: N, key: BehaviorItemKey, value: S ) {
  //   let curComp: CompOrUn = this.curComponent()
  //   if(curComp) {
  //     let arr = curComp.behavior
  //     arr[index][key] = value
  //   }
  // }
  setPageBehavior(index: N, key: BehaviorItemKey, value: S) {
    let curPage = this.getCurPage()
    if (curPage) {
      curPage.behavior[index][key] = value
    }
  }
  // reqUpdatePageBehavior(type: UpdateType, index: N, key: S, value: PropsValue, ) {
  //   return this.reqService.req(`${serviceUrl()}/pages`, 'put', {
  //     ulid: this.getCurPage()?.ulid || '',
  //     type,
  //     index,
  //     key,
  //     value,
  //   }).then(() => true)
  // }
  addBehaviorOfCurPage(obj: BehaviorMetaItem) {
    let cp = this.getCurPage()
    if (cp) {
      if (cp.behavior) {
        cp.behavior.push(obj)
      } else {
        cp.behavior = [obj]
      }
    }
  }
  removeBehaviorOfCurPage(index: N) {
    let cp = this.getCurPage()
    if (cp) {
      cp.behavior.splice(index, 1)
    }
  }
  reqAddBehavior(obj: BehaviorMetaItem) {
    return this.reqService.req(`${serviceUrl()}/pages/behavior`, 'post', {
      ulid: this.getCurPage()?.ulid || '',
      behavior: obj,
    })
  }
  reqRemoveBehavior(ulid: ULID = this.getCurPage()?.ulid || '', index: N) {
    return this.reqService.req(`${serviceUrl()}/pages/behavior`, 'delete', {
      ulid,
      index,
    })
  }
}
