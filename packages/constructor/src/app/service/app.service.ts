// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { serviceUrl } from 'src/helper/config';
import { createTree } from 'src/helper/tree';
import { initAppMeta } from 'src/helper';
// import { Router } from '@angular/router';
import { ReqService } from './req.service';
import type { ResponseData } from 'src/types';
import type { App, SyntheticVersion, } from 'src/types/app';
import type { 
   Email, S, ULID, N,
  A,
  B, } from 'src/types/base';
import type { Tree } from 'src/helper/tree';
import type { HttpParams } from '@angular/common/http';

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
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _appList: App[]  // 缓存应用列表
  private _curApp: AppOrUn // 缓存当前应用
  appList$: Subject<App[]>
  // appSubject$: Subject<AppOrUn> // 04.29+ 删除
  tree: Tree<App>
  private _versionMap: Map<ULID, SyntheticVersion>
  constructor(
    // private http: HttpClient,
    private userService: UserService,
    // private router: Router,
    private reqService: ReqService,
  ) {
    this._appList = []
    this.appList$ = new Subject<App[]>()
    // this.appSubject$ = new Subject<AppOrUn>()
    this.tree = createTree()
    this._versionMap = new Map()
  }
  private _find(appUlid?: S) {
    return this._appList.find(item => item.ulid === appUlid)
  }
  getCurApp() {
    return this._curApp
  }
  // 根据ulid设置指定app为当前激活状态。
  setCurApp(appUlid?: S) {
    this._curApp = this._find(appUlid)
    // this.appSubject$.next(this._curApp)
  }
  getAppList() {
    // return this._appList
    let al = this.tree.root?.toArray()
    if (al?.length) {
      return Promise.resolve(al)
    } else {
      return this.reqAppList().then((appList: App[]) => {
        return this.opAppList(appList)
        // return true
      }).then(() => {
        let appList = this.tree.root?.toArray()
        return appList || []
      })
    }
  }
  setAppList() {
    this.appList$.next(this._appList)
  }
  opAppList(appList: App[]) {
    // let curUser = this.userService.getUser()
    return this.userService.getUser().then(v => {
      let curUser = v
      // clog('curUser', curUser)
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
    })
  }
  // 暂时不开发。设置方法在请求appList时设置。
  // 获取应用列表
  reqAppList() {
    return this.reqService.req(`${serviceUrl()}/apps`, 'get', {} as HttpParams).then(res => {
      return res.data
    // }).catch((res) => {
    //   jasmine()
    })
    // return new Promise<App[]>((s, j) => {
    //   this.http.get<ResponseData>(`${serviceUrl()}/apps`, {
    //     withCredentials: true, // 控制是否带cookie
    //   }).subscribe(res => {
    //     clog('reqAppList', res)
    //     if (res.code === 100130) {
    //       this.router.navigate(['/home' ]);
    //       j(new Error(res.message))
    //     }
    //     if (res.code === 0) {
    //       s(res.data)
    //     } else {
    //       j(new Error(res.message))
    //     }
    //   })
    // })
  }
  createApp(data: ReqCreateData) {
    this.userService.getUser().then(user => {
      let appObj = initAppMeta(data.key, data.name, data.theme, user.profile.email as Email)
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
        ulid: appObj.ulid,
        theme: appObj.theme,
        version: appObj.version,
        owner: appObj.owner,
        collaborator: appObj.collaborator,
        firstPageUlid: appObj.firstPageUlid,
        prevUlid: appObj.prevUlid,
        nextUlid: appObj.nextUlid,
      })
    })
    // 在这里缓存调用接口失败的请求。在网络畅通时请求依次请求接口。
  }
  private _createApp(data: App) {
    return this.reqService.req(`${serviceUrl()}/apps`, 'post', data as unknown as HttpParams)
    // .then(() => {
    // })

    // return new Promise((s, j) => {
    //   this.http.post<ResponseData>(`${serviceUrl()}/apps`, {
    //     ...data,
    //   }, {
    //     withCredentials: true
    //   }).subscribe(() => {
    //     s(undefined)
    //   })
    // })
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
      let appNode = this.tree.find(app.ulid)
      if (appNode?.value) {
        if (appNode.value.firstPageUlid === ulid) {
          appNode.value.firstPageUlid = ''
        }
      }
    }
  }

  getVersion(appUlid: ULID, envs: S[]) {
    let o = this._versionMap.get(appUlid)
    if (o) {
      return Promise.resolve(o)
    } else {
      return this.reqVersion(appUlid, envs)
    }
  }
  publish(data: A) {
    return this.reqService.req(`${serviceUrl()}/apps/publish`, 'post', data)
    // return new Promise((s, j) => {
    //   this.http.post<ResponseData>(`${serviceUrl()}/apps/publish`, {
    //     ...data,
    //   }, {
    //     withCredentials: true
    //   }).subscribe(res => {
    //     if ([100000, 0].includes(res.code)) {
    //       s(res)
    //     } else {
    //       j(new Error(res.message))
    //     }
    //   })
    // })
  }
  deleteApp(appUlid: ULID, env: S) {
    return this.reqService.req(`${serviceUrl()}/apps`, 'delete', {appUlid, env} as unknown as HttpParams)
    // return new Promise((s, j) => {
    //   this.http.delete<ResponseData>(`${serviceUrl()}/apps`, {
    //     params: {
    //       appUlid,
    //       env,
    //     },
    //     withCredentials: true
    //   }).subscribe(res => {
    //     if (res.code === 0) {
    //       s(res.data)
    //     } else {
    //       j(new Error(res.message))
    //     }
    //   })
    // })
  }
  reqVersion(appUlid: ULID, envs: S[]) {
    return this.reqService.req(`${serviceUrl()}/apps/versions`, 'get', {appUlid, envs} as unknown as HttpParams).then((res) => {
      let t = {
        dev: {
          version: res.data.dev.version ?? -1,
          remarks: res.data.dev.remarks ?? '',
        },
        test: {
          version: res.data.test.version ?? -1,
          remarks: res.data.test.remarks ?? '',
        },
        pre: {
          version: res.data.pre.version ?? -1,
          remarks: res.data.pre.remarks ?? '',
        },
        prod: {
          version: res.data.prod.version ?? -1,
          remarks: res.data.prod.remarks ?? '',
        },
      }
      this._versionMap.set(appUlid, t)
      return res.data
    })
    // return new Promise<SyntheticVersion>((s, j) => {
    //   this.http.get<ResponseData>(`${serviceUrl()}/apps/versions`, {
    //     params: {
    //       appUlid,
    //       envs,
    //       // envs: ['dev', 'test', 'pre', 'prod'],
    //     },
    //     withCredentials: true,
    //   }).subscribe(res => {
    //     if (res.code === 0) {
    //       // 把脏数据处理为干净数据
    //       let t = {
    //         dev: {
    //           version: res.data.dev.version ?? -1,
    //           remarks: res.data.dev.remarks ?? '',
    //         },
    //         test: {
    //           version: res.data.test.version ?? -1,
    //           remarks: res.data.test.remarks ?? '',
    //         },
    //         pre: {
    //           version: res.data.pre.version ?? -1,
    //           remarks: res.data.pre.remarks ?? '',
    //         },
    //         prod: {
    //           version: res.data.prod.version ?? -1,
    //           remarks: res.data.prod.remarks ?? '',
    //         },
    //       }
    //       this._versionMap.set(appUlid, t)
    //       s(res.data)
    //     } else {
    //       j(new Error(res.message))
    //     }
    //   })
    // })
  }
  updateVersion(appUlid: ULID, env: keyof Required<SyntheticVersion>, version: N, remarks: S): B {
    let v = this._versionMap.get(appUlid)
    if (v) {
      v[env].remarks = remarks
      v[env].version = version
      return true
    }
    return false
  }
  reqProcess(ulid: ULID, env: S) {
    return this.reqService.req(`${serviceUrl()}/apps/process`, 'get', {key: `${ulid}_${env}`} as unknown as HttpParams)
    // return new Promise((s, j) => {
    //   this.http.get<ResponseData>(`${serviceUrl()}/apps/process`, {
    //     params: {
    //       key: `${ulid}_${env}`
    //     },
    //     withCredentials: true,
    //   }).subscribe(res => {
    //     if ([0, 300000].includes(res.code)) {
    //       s(res)
    //     } else {
    //       j(new Error(res.message))
    //     }
    //   })
    // })
  }
}
