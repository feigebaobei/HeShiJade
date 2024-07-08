import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { serviceUrl } from 'src/helper/config';
import { ResponseData } from 'src/types';
import type { A, S, ENV } from 'src/types/base';
import type { App } from 'src/types/app'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // curAppKey: S
  private _curApp?: App
  curApp$: Subject<App>
  constructor(
    private http: HttpClient
  ) {
    this._curApp = undefined
    // this.curAppKey = ''
    this.curApp$ = new Subject()
  }
  getCurApp() {
    return this._curApp
  }
  // setCurAppKey(key: S) {
  //   // this.curAppKey = key
  // }
  setCurApp(app: App) {
    this._curApp = app
    this.curApp$.next(this._curApp)
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
}
