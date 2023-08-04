import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, Subject } from 'rxjs';
import type { ResponseData } from 'src/types';
import type { App } from 'src/types/app';
import type { B, S } from 'src/types/base';

type AppOrUn = App | undefined

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // appList: Observable<App[]>
  appList: App[]
  // curApp$: Observable<App | null>
  // curApp: App | null
  // hasApp: (appUlid: S) => B
  // private _find: (appUlid: S) => AppOrUn
  // get f: (appUlid: S) => AppOrUn 
  appSubject$: Subject<AppOrUn>
  _curApp: AppOrUn
  constructor(private http: HttpClient) {
    this.appList = []
    // this.curApp$ = new Observable() // 当前激活的app
    // this.hasApp = (appUlid: S) => {
    //   return !!this._find(appUlid)
    // }
    this.appSubject$ = new Subject<AppOrUn>()
  }
  _find(appUlid: S) {
    return this._curApp = this.appList.find(item => item.ulid === appUlid)
  }
  curApp() {
    return this._curApp
  }
  reqAppList() {
    return new Promise<App[]>((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/apps', {
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          this.appList = res.data
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
  // 根据ulid设置指定app为当前激活状态。
  setCurApp(appUlid: S) {
    this.appSubject$.next(this._find(appUlid))
  }
}
