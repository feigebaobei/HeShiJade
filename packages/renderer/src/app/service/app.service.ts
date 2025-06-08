import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceUrl } from 'src/helper/config';
import { ResponseData } from 'src/types';
import type { A, S, ENV } from 'src/types/base';
import type { App } from 'src/types/app'
import { ShareSignal } from 'src/helper/shareSignal';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // curAppKey: S
  private _curApp?: App
  curAppS: ShareSignal<App | undefined>
  constructor(
    private http: HttpClient
  ) {
    this._curApp = undefined
    // this.curAppKey = ''
    this.curAppS = new ShareSignal(undefined)
  }
  getCurApp() {
    return this._curApp
  }
  // setCurAppKey(key: S) {
  //   // this.curAppKey = key
  // }
  setCurApp(app: App) {
    this._curApp = app
    this.curAppS.set(this._curApp)
  }
  reqAppDetail(appKey: S, env: ENV) {
    this._reqAppDetail(appKey, env).then(res => {
      this.setCurApp(res)
    })
  }
  private _reqAppDetail(appKey: S, env: ENV): Promise<App> {
    return new Promise((s, j) => {
      this.http.get<ResponseData>(`${serviceUrl()}/apps/detail`, {
        params: {
          appKey: appKey,
          env: env
        },
        withCredentials: true,
      }).subscribe(res => {
        if (res.code === 0) {
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  // // 插件的请求暂时放在这里
  // reqPluginsKey(key: S) {
  //   // return this.reqService.req(`${serviceUrl()}/plugins/key`, 'get', {key: key})
  //   return this.http.get<ResponseData>(`${serviceUrl()}/plugins`, {
  //     params: {
  //       key,
  //     },
  //   })
  // }
}
