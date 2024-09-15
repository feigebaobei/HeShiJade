import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { serviceUrl } from 'src/helper/config';
import { FormLayout } from 'ng-devui/form';
import { createLoop } from 'src/helper';
import type { Loop } from 'src/helper'
import type { ResponseData } from 'src/types';
import type { A, N, S, ULID, B } from 'src/types/base';
// import { DevUIModule } from 'ng-devui';

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
  msg: {}[]
  loop: Loop
  constructor(
    private appService: AppService,
    // private versionService: VersionsService,
    private http: HttpClient
  ) {
    // this.versionService.versions$.subscribe((v) => {
    //   this.devVersion = v.dev
    //   this.testVersion = v.test
    //   this.preVersion = v.pre
    //   this.prodVersion = v.prod
    //   this.newVersion = v.dev + 1 // 默认加1
    // })
    this.devVersion = 0
    this.testVersion = 0
    this.preVersion = 0
    this.prodVersion = 0
    this.newVersion = 0 + 1 // 默认加1

    this.layoutDirection = FormLayout.Vertical;
    this.devObj = {
      version: -1,
      remarks: '',
    }
    this.testObj = {
      version: -1,
      remarks: '',
    }
    this.preObj = {
      version: -1,
      remarks: '',
    }
    this.prodObj = {
      version: -1,
      remarks: '',
    }
    this.msg = []
    this.loop = createLoop(this.appService.reqProcess, (res: A) => {
      let b: B
      switch (res.code) {
        case 0:
          b = res.data.done.length / res.data.total < 1
          break;
        case 300000:
          b = false
          break;
      }
      return 
    })
  }
  ngOnInit() {
    // this.versionService.reqVersions(this.data.appUlid)
    this.appService.getVersion(this.data.appUlid, ['dev', 'test', 'pre', 'prod']).then(syntheticVersion => {
      clog('syntheticVersion', syntheticVersion)
      this.devObj.version = syntheticVersion.dev?.version ?? -1
      this.devObj.remarks = syntheticVersion.dev?.remarks ?? ''
      this.testObj.version = syntheticVersion.test?.version ?? -1
      this.testObj.remarks = syntheticVersion.test?.remarks ?? ''
      this.preObj.version = syntheticVersion.pre?.version ?? -1
      this.preObj.remarks = syntheticVersion.pre?.remarks ?? ''
      this.prodObj.version = syntheticVersion.prod?.version ?? -1
      this.prodObj.remarks = syntheticVersion.prod?.remarks ?? ''
    })
  }
  devVersionChangeH(v: N) {
    clog('devVersionChangeH', v, this.devObj.version)
  }
  devOkBtClickH() {
    // 全改为调用app.service中的方法
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
    this.appService.publish({
      appUlid: this.data.appUlid,
      fromEnv: 'dev',
      toEnv: 'test',
      newVersion: this.devObj.version,
      remarks: this.devObj.remarks,
    }).then((res: A) => {
      switch (res.code) {
        case 0:
          this.msg = [{ severity: 'success', summary: 'Summary', content: '发布成功。' }]
          this.appService.updateVersion(this.data.appUlid, 'dev', this.devObj.version, this.devObj.remarks)
          this.appService.updateVersion(this.data.appUlid, 'test', this.devObj.version, this.devObj.remarks)
          this.testObj.version = this.devObj.version
          this.testObj.remarks = this.devObj.remarks
          break;
        case 100000:
          this.msg = [{ severity: 'success', summary: 'Summary', content: '开始执行发布工作。' }]
          this.loop.launch().then(() => {
            this.appService.updateVersion(this.data.appUlid, 'test', this.devObj.version, this.devObj.remarks)
            this.testObj.version = this.devObj.version
            this.testObj.remarks = this.devObj.remarks
          })
          break;
        default:
          this.msg = [{ severity: 'error', summary: 'Summary', content: `发布失败。${res.message}` }]
          break;
      }
    })
  }
  testToPreBtClickH() {
    this.appService.publish({
      appUlid: this.data.appUlid,
      fromEnv: 'test',
      toEnv: 'pre',
    }).then((res: A) => {
      switch (res.code) {
        case 0:
          this.msg = [{ severity: 'success', summary: 'Summary', content: '发布成功。' }]
          this.appService.updateVersion(this.data.appUlid, 'pre', this.testObj.version, this.testObj.remarks)
          this.preObj.version = this.testObj.version
          this.preObj.remarks = this.testObj.remarks
          break;
        case 100000:
          this.msg = [{ severity: 'success', summary: 'Summary', content: '开始执行发布工作。' }]
          this.loop.launch().then(() => {
            this.appService.updateVersion(this.data.appUlid, 'pre', this.testObj.version, this.testObj.remarks)
            this.preObj.version = this.testObj.version
            this.preObj.remarks = this.testObj.remarks
          })
          break;
        default:
          this.msg = [{ severity: 'error', summary: 'Summary', content: `发布失败。${res.message}` }]
          break;
      }
    })
  }
  preToProdBtClickH() {
    this.appService.publish({
      appUlid: this.data.appUlid,
      fromEnv: 'pre',
      toEnv: 'prod',
    }).then((res: A) => {
      switch (res.code) {
        case 0:
          this.msg = [{ severity: 'success', summary: 'Summary', content: '发布成功。' }]
          this.appService.updateVersion(this.data.appUlid, 'prod', this.preObj.version, this.preObj.remarks)
          this.prodObj.version = this.preObj.version
          this.prodObj.remarks = this.preObj.remarks
          break;
        case 100000:
          this.msg = [{ severity: 'success', summary: 'Summary', content: '开始执行发布工作。' }]
          this.loop.launch().then(() => {
            this.appService.updateVersion(this.data.appUlid, 'prod', this.preObj.version, this.preObj.remarks)
            this.prodObj.version = this.preObj.version
            this.prodObj.remarks = this.preObj.remarks
          })
          break;
        default:
          this.msg = [{ severity: 'error', summary: 'Summary', content: `发布失败。${res.message}` }]
          break;
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
  testDeleteBtClickH() {
    // this.appService.deleteApp(this.data.appUlid, ['test'])
    // this.appService.deleteApp('01HGKPCCA5E5F4DH42ZX8PENY8', 'test')
  }
}
