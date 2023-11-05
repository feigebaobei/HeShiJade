import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'src/types';
import type { A, S } from 'src/types/base';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  curAppKey: S
  curApp: A
  constructor(
    private http: HttpClient
  ) {
    this.curApp = {}
    this.curAppKey = ''
  }
  setCurAppKey(key: S) {
    this.curAppKey = key
  }
  reqAppDetail(appKey: S) {
    this._reqAppDetail(appKey).then(res => {
      this.curApp = res
      // 有可能需要做成响应式的
    })
  }
  private _reqAppDetail(appKey: S) {
    return new Promise((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/app', {
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
