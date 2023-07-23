import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import type { ResponseData } from 'src/types';
import type { App } from 'src/types/app';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  appList: Observable<App[]>
  // curApp: Observable<App | null>
  curApp: App | null
  constructor(private http: HttpClient) {
    this.appList = of([])
    this.curApp = null // 当前激活的app
  }
  getApp() {
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
  setCurApp(appUlid) {
    // this.appList.find
  }
}
