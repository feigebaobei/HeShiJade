import { Injectable, Signal } from '@angular/core';
import { UserService } from './user.service';
import { serviceUrl } from 'src/helper/config';
import { createTree } from 'src/helper/tree';
// import { initAppMeta } from 'src/helper';
import { ReqService } from './req.service';
import { ShareSignal } from 'src/helper/shareSignal';
import { compatibleAppData, spliceObjByKey } from 'src/helper';
// type
import type { App, SyntheticVersion, } from 'src/types/app';
import type { 
   Email, S, ULID, N,
  A,
  B,
  Oa, } from 'src/types/base';
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
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _appList: App[]  // 缓存应用列表
  private _curApp: AppOrUn // 缓存当前应用
  appListS: ShareSignal<App[]>
  tree: Tree<App> // 只记录当前用户的应用，所以只有一棵树。
  private _versionMap: Map<ULID, SyntheticVersion>
  constructor(
    private userService: UserService,
    private reqService: ReqService,
  ) {
    this._appList = []
    this.appListS = new ShareSignal<App[]>([])
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
  }
  getAppList() {
    let al = this.tree.root?.toArray()
    if (al?.length) {
      return Promise.resolve(al)
    } else {
      return this.reqAppList().then((appList: App[]) => {
        return this.opAppList(appList)
      }).then(() => {
        let appList = this.tree.root?.toArray()
        return appList || []
      })
    }
  }
  setAppList() {
    this.appListS.set(this._appList)
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
            // clog('nextApp', nextApp)
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
    return this.reqService.req(`${serviceUrl()}/apps`, 'get', {}).then(res => {
      let {newData, update} = compatibleAppData(res.data) // 返回新数据结构
      if (update) { // 不用等更新接口
        this.reqService.req(`${serviceUrl()}/apps`, 'put', {
          appUlid: update.ulid,
          updateObj: update.obj,
        })
      }
      return newData as App[]
    })
  }
  createApp(appObj: App) {
    if (this._appList.length) {
      let last = this._appList[this._appList.length - 1]
      last.nextUlid = appObj.ulid
      appObj.prevUlid = last.ulid
    }
    this._appList.push(appObj)
    this.tree.mountNext(appObj, appObj.prevUlid)
    // return
    this.reqCreateApp({
      key: appObj.key,
      name: appObj.name,
      ulid: appObj.ulid,
      theme: appObj.theme,
      version: appObj.version,
      layout: appObj.layout,
      owner: appObj.owner,
      collaborator: appObj.collaborator,
      firstPageUlid: appObj.firstPageUlid,
      prevUlid: appObj.prevUlid,
      nextUlid: appObj.nextUlid,
      pluginsKey: appObj.pluginsKey,
    })
    // this.userService.getUser().then(user => {
    // })
    // 在这里缓存调用接口失败的请求。在网络畅通时请求依次请求接口。
  }
  private reqCreateApp(data: App) {
    return this.reqService.req(`${serviceUrl()}/apps`, 'post', data)
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
  }
  reqDeleteApp(appUlid: ULID, envs: S[]) {
    return this.reqService.req(`${serviceUrl()}/apps`, 'delete', {appUlid, envs})
  }
  reqVersion(appUlid: ULID, envs: S[]) {
    return this.reqService.req(`${serviceUrl()}/apps/versions`, 'get', {appUlid, envs}).then((res) => {
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
    return this.reqService.req(`${serviceUrl()}/apps/process`, 'get', {key: `${ulid}_${env}`})
  }
  deleteApp(appUlid: ULID) {
    spliceObjByKey(this._appList, 'ulid', appUlid)
    // 改变_appList后，appListS会一起改变。
    // clog('applist', this._appList, this.appListS.get())
    this.tree.unmount(appUlid)
  }
  addPage(pageUlid: ULID) {
    let curApp = this.getCurApp()
    if (curApp) {
      if (curApp.firstPageUlid) {
      } else {
        curApp.firstPageUlid = pageUlid
      }
    }
  }
  // 插件的请求暂时放在这里
  reqPluginsKey(key: S) {
    return this.reqService.req(`${serviceUrl()}/plugins/key`, 'get', {key: key})
  }
  updateApp(ulid: ULID, updateObj: Oa) {
    return this.reqService.req(`${serviceUrl()}/apps`, 'put', {
      appUlid: ulid,
      updateObj
    })
  }
}
