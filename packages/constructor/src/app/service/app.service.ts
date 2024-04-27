import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { serviceUrl } from 'src/helper/config';
import { createTree } from 'src/helper/tree';
import { initAppMeta } from 'src/helper';
import type { ResponseData } from 'src/types';
import type { App } from 'src/types/app';
import type { 
  // B,
   Email, S, ULID, } from 'src/types/base';
import type { Tree } from 'src/helper/tree';

let clog = console.log

type AppOrUn = App | undefined
interface ReqCreateData {
  key: S,
  name: S,
  // ulid: S,
  theme: S,
  collaborator: S[],
  prevUlid: ULID,
}
// interface Versions {
//   dev: N,
//   test: N,
//   pre: N,
//   prod: N,
// }

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _appList: App[]  // 缓存应用列表
  private _curApp: AppOrUn // 缓存当前应用
  appList$: Subject<App[]>
  appSubject$: Subject<AppOrUn>
  tree: Tree<App>
  // curApp: Subject<App>
  // versions: Versions
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    this._appList = []
    this.appList$ = new Subject<App[]>()
    this.appSubject$ = new Subject<AppOrUn>()
    this.tree = createTree()
    // 各service需要写清空方法
    // 当改变user时请求appList
    // this.userService.user$.subscribe(u => {
    //   this.reqAppList()
    // })
  }
  private _find(appUlid?: S) {
    return this._appList.find(item => item.ulid === appUlid)
  }
  getCurApp() {
    return this._curApp
  }
  getAppList() {
    return this._appList
  }
  setAppList() {
    this.appList$.next(this._appList)
  }
  opAppList(appList: App[]) {
    let curUser = this.userService.getUser()
    if (curUser) {
      let ulid = curUser.firstApplicationUlid
      let cur = appList.find(item => item.ulid === ulid)
      if (cur) {
        this.tree.mountRoot(cur)
        while (cur) {
          let nextApp = appList.find(item => item.ulid === cur!.nextUlid)
          if (nextApp) {
            this.tree.mountNext(nextApp, cur.ulid)
          }
          cur = nextApp
        }
      }
    }
    let root = this.tree.root
    if (root) {
      this._appList = root.toArray()
    } else {
      this._appList = []
    }
    this.setAppList()
  }
  // 暂时不开发。设置方法在请求appList时设置。
  // 获取应用列表
  reqAppList() {
    return new Promise<App[]>((s, j) => {
      this.http.get<ResponseData>(`${serviceUrl()}/apps`, {
        withCredentials: true, // 控制是否带cookie
      }).subscribe(res => {
        if (res.code === 0) {
          this.opAppList(res.data)
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  // 根据ulid设置指定app为当前激活状态。
  setCurApp(appUlid?: S) {
    this._curApp = this._find(appUlid)
    this.appSubject$.next(this._curApp)
  }
  createApp(data: ReqCreateData) {
    let appObj = initAppMeta(data.key, data.name, data.theme, (this.userService.getUser()?.profile.email as Email))
    if (this._appList.length) {
      let last = this._appList[this._appList.length - 1]
      last.nextUlid = appObj.ulid
      appObj.prevUlid = last.ulid
    }
    this._appList.push(appObj)
    this.userService.appendApp(appObj.ulid)
    this.tree.mountNext(appObj, this._appList[this._appList.length - 1].ulid)
    this._createApp({
      key: appObj.key,
      name: appObj.name,
      theme: appObj.theme,
      collaborator: appObj.collaborator,
      prevUlid: appObj.prevUlid,
      ulid: appObj.ulid,
    })
    // 在这里缓存调用接口失败的请求。在网络畅通时请求依次请求接口。
  }
  private _createApp(data: ReqCreateData & {ulid: ULID}) {
    return new Promise((s, j) => {
      this.http.post<ResponseData>(`${serviceUrl()}/apps`, {
        ...data,
        // ulid: ulid()
      }, {
        withCredentials: true
      }).subscribe(() => {
        // s(void)
        s(undefined)
      })
    })
  }
  // 重铸
  // 获取应用列表+设置当前应用+返回应用列表
  // 可能用不上
  recast(): Promise<App[]> {
    return this.reqAppList().then(() => {
      this.setCurApp(this.getCurApp()?.ulid)
      return this._appList
    })
  }
  deletePageByUlid(ulid: ULID) {
    let app = this.getCurApp()
    if (app) {
      if (app.firstPageUlid === ulid) {
        app.firstPageUlid = ''
      }
    }
  }
  
}
