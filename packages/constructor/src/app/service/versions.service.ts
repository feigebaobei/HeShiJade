import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceUrl } from 'src/helper/config';
import type { N, ULID, S } from 'src/types/base'
import type { ResponseData } from 'src/types'
import { Subject } from 'rxjs';

interface Versions {
  dev: N,
  test: N,
  pre: N,
  prod: N,
}

@Injectable({
  providedIn: 'root'
})
export class VersionsService {
  private _versions: Versions
  versions$: Subject<Versions>
  constructor(
    private http: HttpClient
  ) {
    this._versions = {
      dev: 0,
      test: 0,
      pre: 0,
      prod: 0,
    }
    this.versions$ = new Subject<Versions>()
  }
  reqVersions(appUlid: ULID, env?: S) {
    this.http.get<ResponseData>(`${serviceUrl()}/apps/versions`, {
      params: {
        appUlid,
        env: env || '',
      },
      withCredentials: true
    }).subscribe(res => {
      if (res.code === 0) {
        this.setVersions({
          dev: res.data.dev,
          test: res.data.test,
          pre: res.data.pre,
          prod: res.data.prod,
        })
      }
    })
  }
  getVersions() {
    return this._versions
  }
  // 设置版本
  setVersions(versions: Versions) {
    this._versions.dev = versions.dev
    this._versions.test = versions.test
    this._versions.pre = versions.pre
    this._versions.prod = versions.prod
    this.versions$.next(this._versions)
  }
}
