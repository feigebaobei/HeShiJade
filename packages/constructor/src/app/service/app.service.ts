import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import type { ResponseData } from 'src/types';
import type { App } from 'src/types/app';
import type { B, S } from 'src/types/base';
import { ulid } from 'ulid';

type AppOrUn = App | undefined
interface ReqCreateData {
  key: S,
  name: S,
  // ulid: S,
  members: S[],
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _appList: App[]
  private _curApp: AppOrUn
  appList$: Subject<App[]>
  appSubject$: Subject<AppOrUn>
  // curApp: Subject<App>
  constructor(private http: HttpClient) {
    this._appList = []
    this.appList$ = new Subject<App[]>()
    this.appSubject$ = new Subject<AppOrUn>()
    // this.curApp = new Subject<AppOrUn>()
  }
  _find(appUlid?: S) {
    return this._curApp = this._appList.find(item => item.ulid === appUlid)
    // return this.appList$.to
  }
  getCurApp() {
    return this._curApp
  }
  getAppList() {
    return this._appList
  }
  // 获取应用列表
  reqAppList() {
    return new Promise<App[]>((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/apps', {
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          this._appList = res.data
          this.appList$.next(res.data)
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
      // 可以使用 xx$.subscribe({next: fn0, error: fn1, complete: fn2})
    })
  }
  // 根据ulid设置指定app为当前激活状态。
  setCurApp(appUlid?: S) {
    this.appSubject$.next(this._find(appUlid))
  }
  createApp(data: ReqCreateData) {
    return this.http.post<ResponseData>('http://localhost:5000/apps', {
      ...data,
      ulid: ulid()
    }, {
      withCredentials: true
    })
  }
  // 重铸
  // 获取应用列表+设置当前应用+返回应用列表
  recast(): Promise<App[]> {
    return this.reqAppList().then(() => {
      this.setCurApp(this.getCurApp()?.ulid)
      return this._appList
    })
  }
}
