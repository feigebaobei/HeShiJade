import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { VersionsService } from 'src/app/service/versions.service';
import { serviceUrl } from 'src/helper/config';
import { FormLayout } from 'ng-devui/form';
import type { ResponseData } from 'src/types';
import type { A, N, S, ULID } from 'src/types/base';

let clog = console.log
interface EnvObj {
  version: N
  remarks: S
}
@Component({
  selector: 'app-publish-dialog',
  templateUrl: './publish-dialog.component.html',
  styleUrls: ['./publish-dialog.component.sass']
})
export class PublishDialogComponent implements OnInit {
  @Input() data!: A
  devVersion: N
  testVersion: N
  preVersion: N
  prodVersion: N
  newVersion: N
  layoutDirection: FormLayout

  devObj: EnvObj
  testObj: EnvObj
  preObj: EnvObj
  prodObj: EnvObj
  constructor(
    private appService: AppService,
    private versionService: VersionsService,
    private http: HttpClient
  ) {
    this.versionService.versions$.subscribe((v) => {
      this.devVersion = v.dev
      this.testVersion = v.test
      this.preVersion = v.pre
      this.prodVersion = v.prod
      this.newVersion = v.dev + 1 // 默认加1
    })
    this.devVersion = 0
    this.testVersion = 0
    this.preVersion = 0
    this.prodVersion = 0
    this.newVersion = 0 + 1 // 默认加1

    this.layoutDirection = FormLayout.Vertical;
    this.devObj = {
      version: 1,
      remarks: 'rema',
    }
    this.testObj = {
      version: -1,
      remarks: 'remarks',
    }
    this.preObj = {
      version: -1,
      remarks: 'remarks',
    }
    this.prodObj = {
      version: -1,
      remarks: 'remarks',
    }
  }
  ngOnInit() {
    this.versionService.reqVersions(this.data.appUlid)
  }
  devVersionChangeH(v: N) {
    clog('devVersionChangeH', v, this.devObj.version)
  }
  devOkBtClickH() {
    this.http.post<ResponseData>(`${serviceUrl()}/apps/versions`, {
      appUlid: this.data.appUlid,
      newVersion: this.newVersion,
    }).subscribe((res) => {
      if (res.code === 0) {
        clog('设置新版本成功')
      } else {
        clog('设置新版本失败')
      }
    })
  }
  devToTestBtClickH() {
    this.http.put<ResponseData>(`${serviceUrl()}/apps/versions`, {
      appUlid: this.data.appUlid,
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
    this.http.put<ResponseData>(`${serviceUrl()}/apps/versions`, {
      appUlid: this.data.appUlid,
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
    this.http.put<ResponseData>(`${serviceUrl()}/apps/versions`, {
      appUlid: this.data.appUlid,
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
  testToDevClickH() {
    clog('testToDevClickH')
  }
  preToDevClickH() {
    clog('preToDevClickH')
  }
  prodToDevClickH() {
    clog('prodToDevClickH')
  }
}
