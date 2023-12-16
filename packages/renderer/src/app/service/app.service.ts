import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
      this.http.get<ResponseData>('http://localhost:5000/apps/detail', {
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
    // return new Promise((s, j) => {
    //   // this.http.get<ResponseData>('http://localhost:5000/apps/detail', {
    //   //   params: {
    //   //     appKey,
    //   //   },
    //   //   withCredentials: true,
    //   // }).subscribe(res => {
    //   //   if (res.code === 0) {
    //   //     s(res.data)
    //   //   } else {
    //   //     j(new Error(res.message))
    //   //   }
    //   // })
    //   s({
    //         // "_id": "64ee03c321e88362373361cf",
    //         "key": "one",
    //         "name": "one",
    //         "ulid": "01H90VXCNB7SQZCTEQDTN06FPR",
    //         // "theme": null,
    //         // "version": 0,
    //         // "owner": null,
    //         "members": [
    //             "123@qq.com",
    //             "kevin@163.com"
    //         ],
    //         "firstPageUlid": "01H98QH03RWN0PVN9Y7FFA81XJ",
    //         // "lastPageUlid": "01H98QJ6PVGJDGYANZ6GPXENKS",
    //         "prevUlid": "",
    //         "nextUlid": "01HDTJZYGR3P53RASBZ2PGD5Y5"
    //   })
    // })
  }
}
