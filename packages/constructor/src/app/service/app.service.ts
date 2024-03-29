import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ulid } from 'ulid';
import { UserService } from './user.service';
import { DoublyChain } from 'data-footstone';
import { serviceUrl } from 'src/helper/config';
import type { ResponseData } from 'src/types';
import type { App } from 'src/types/app';
import type { 
  // B,
   Email, S, ULID, N } from 'src/types/base';

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
  private _appList: App[]
  private _curApp: AppOrUn
  appList$: Subject<App[]>
  appSubject$: Subject<AppOrUn>
  doublyChain: DoublyChain<App>
  // curApp: Subject<App>
  // versions: Versions
  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    this._appList = []
    this.appList$ = new Subject<App[]>()
    this.appSubject$ = new Subject<AppOrUn>()
    this.doublyChain = new DoublyChain()
    // 各service需要写清空方法
    // 当改变user时请求appList
    // this.userService.user$.subscribe(u => {
    //   this.reqAppList()
    // })
    // 日后可能会拆出去。
    // 当前app的版本
    // this.versions = {
    //   dev: 0,
    //   test: 0,
    //   pre: 0,
    //   prod: 0,
    // }
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
  setAppList(appList: App[]) {
    this._updateAppList(appList)
    this._appList = this.doublyChain.toArray()
    clog('this._appList', this._appList)
    this.appList$.next(this._appList)
  }
  // 暂时不开发。设置方法在请求appList时设置。
  // 获取应用列表
  reqAppList() {
    return new Promise<App[]>((s, j) => {
      this.http.get<ResponseData>(`${serviceUrl()}/apps`, {
        // withCredentials: true
        // headers: {
        //   authorization: window.localStorage.getItem('accessToken') || '',
        // },
        withCredentials: true, // 控制是否带cookie
      }).subscribe(res => {
        if (res.code === 0) {
          this.setAppList(res.data)
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  private _updateAppList(appList: App[]) {
    this.doublyChain.clear()
    let curUser = this.userService.getUser()
    clog('curUser', curUser)
    let nextUlid = curUser?.firstApplicationUlid
    while (nextUlid) {
      let app = appList.find(app => app.ulid === nextUlid)
      if (app) {
        this.doublyChain.append(app)
      }
      nextUlid = app?.nextUlid
    }
  }
  // 根据ulid设置指定app为当前激活状态。
  setCurApp(appUlid?: S) {
    this._curApp = this._find(appUlid)
    this.appSubject$.next(this._curApp)
  }
  createApp(data: ReqCreateData) {
    let u = ulid()
    if (this._appList.length) {
      this._appList[this._appList.length - 1].nextUlid = u
    }
    this._appList.push({
        key: data.key,
        name: data.name,
        ulid: u,
        theme: data.theme,
        version: 0,
        // owner: (this.userService.getUser()?.account as S),
        owner: (this.userService.getUser()?.profile.email as Email), // 考虑一下，email好还是id好。
        collaborator: data.collaborator,
        firstPageUlid: this._getFirstPageUlid(),
        prevUlid: (this.doublyChain.tail?.value.ulid) || '',
        nextUlid: '',
      })
    this.userService.appendApp(u)
    this.setAppList(this._appList)
    this._createApp(data)
    // 在这里缓存调用接口失败的请求。在网络畅通时请求依次请求接口。
  }
  // _getFirstPageUlid
  private _getFirstPageUlid(): ULID {
    return ((this._appList.length ? this._appList[0] : undefined)?.firstPageUlid) || ''
  }
  private _createApp(data: ReqCreateData) {
    return new Promise((s, j) => {
      this.http.post<ResponseData>(`${serviceUrl()}/apps`, {
        ...data,
        ulid: ulid()
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
  // reqVersions(appUlid: ULID, env?: S) {
  //   this.http.get<ResponseData>(`${serviceUrl()}/apps/versions`, {
  //     params: {
  //       appUlid,
  //       env: env || '',
  //     },
  //     withCredentials: true
  //   }).subscribe(res => {
  //     if (res.code === 0) {
  //       this.versions.dev = res.data.dev
  //       this.versions.test = res.data.test
  //       this.versions.pre = res.data.pre
  //       this.versions.prod = res.data.prod
  //     }
  //   })
  // }
  // getVersions()
  
}
