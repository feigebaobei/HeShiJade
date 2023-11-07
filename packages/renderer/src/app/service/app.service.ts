import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ResponseData } from 'src/types';
import type { A, S } from 'src/types/base';
import type { App } from 'src/types/app'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  curAppKey: S
  private curApp: A
  curApp$: Subject<App>
  constructor(
    private http: HttpClient
  ) {
    this.curApp = undefined
    this.curAppKey = ''
    this.curApp$ = new Subject()
  }
  getCurApp() {
    return this.curApp
  }
  setCurAppKey(key: S) {
    this.curAppKey = key
  }
  setCurApp(app: App) {
    this.curApp = app
    this.curApp$.next(this.curApp)
  }
  reqAppDetail(appKey: S) {
    this._reqAppDetail(appKey).then(res => {
      this.setCurApp(res)
    })
  }
  private _reqAppDetail(appKey: S): Promise<App> {
    return new Promise((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/apps/detail', {
        params: {
          appKey,
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
