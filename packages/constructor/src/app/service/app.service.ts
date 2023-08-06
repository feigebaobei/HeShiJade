import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import type { ResponseData } from 'src/types';
import type { App } from 'src/types/app';
import type { B, S } from 'src/types/base';

type AppOrUn = App | undefined

@Injectable({
  providedIn: 'root'
})
export class AppService {
  appList: App[]
  appSubject$: Subject<AppOrUn>
  private _curApp: AppOrUn
  constructor(private http: HttpClient) {
    this.appList = []
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
      // 可以使用 xx$.subscribe({next: fn0, error: fn1, complete: fn2})
    })
  }
  // 根据ulid设置指定app为当前激活状态。
  setCurApp(appUlid: S) {
    this.appSubject$.next(this._find(appUlid))
  }
}
