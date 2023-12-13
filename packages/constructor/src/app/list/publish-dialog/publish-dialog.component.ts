import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { serviceUrl } from 'src/helper/config';
import type { ResponseData } from 'src/types';
import type { N } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-publish-dialog',
  templateUrl: './publish-dialog.component.html',
  styleUrls: ['./publish-dialog.component.sass']
})
export class PublishDialogComponent {
  devVersion: N
  testVersion: N
  preVersion: N
  prodVersion: N
  newVersion: N
  constructor(
    private appService: AppService,
    private http: HttpClient
  ) {
    let t = this.appService.versions
    this.devVersion = t.dev
    this.testVersion = t.test
    this.preVersion = t.pre
    this.prodVersion = t.prod
    this.newVersion = t.dev + 1 // 默认加1
  }
  devToTestBtClickH() {
    this.http.post<ResponseData>(`${serviceUrl()}/apps/versions`, {
      appUlid: this.appService.getCurApp()?.ulid,
      fromEnv: 'dev',
      version: this.newVersion,
    }, {
      withCredentials: true
    }).subscribe((res) => {
      if (res.code === 0) {
        clog('发布成功')
        this.testVersion = this.newVersion
      }
    })
  }
  testToPreBtClickH() {
    this.http.post<ResponseData>(`${serviceUrl()}/apps/versions`, {
      appUlid: this.appService.getCurApp()?.ulid,
      fromEnv: 'test',
      version: this.testVersion,
    }, {
      withCredentials: true
    }).subscribe((res) => {
      if (res.code === 0) {
        clog('发布成功')
        this.preVersion = this.testVersion
      }
    })
  }
  preToProdBtClickH() {
    this.http.post<ResponseData>(`${serviceUrl()}/apps/versions`, {
      appUlid: this.appService.getCurApp()?.ulid,
      fromEnv: 'pre',
      version: this.preVersion,
    }, {
      withCredentials: true
    }).subscribe((res) => {
      if (res.code === 0) {
        clog('发布成功')
        this.prodVersion = this.preVersion
      }
    })
  }
}
