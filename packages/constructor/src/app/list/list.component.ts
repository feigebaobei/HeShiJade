import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from 'ng-devui/modal';
import type { ResponseData } from 'src/types';
import type { A, B, S } from 'src/types/base';
import type { App } from 'src/types/app';
import { AppService } from '../service/app.service';

interface FormData {
  key: S
  name: S
  members: S
}
// interface App {
//   key: S
//   name: S
//   ulid: S
//   members: S[]
//   // theme: S
// }

let clog = console.log

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  appList: App[]
  user: A
  msg: {}[]
  constructor(
    private router: Router, 
    private http: HttpClient, 
    private dialogService: DialogService,
    private appService: AppService,
  ) {
    this.user = {}
    this.msg = []
    this.appList = []
  }
  ngOnInit(): void {
    this.init()
  }
  init(): void {
    if (!this.appList.length) {
      this.sqlBtClickH()
    }
  }
  logoutBtClickH()  {
    // todo 验证登出。
    // 应该传递cookie
    this.http.post<ResponseData>('http://localhost:5000/users/logout', {}).subscribe((res) => {
      this.router.navigate(['/'])
    })
  }
  userInfoBtClickH() {
    this.http.get<ResponseData>('http://localhost:5000/users', {withCredentials: true}).subscribe((res) => {
      clog('getUserInfo', res)
    })
  }
  gotoHomeInfoBtClickH() {
    this.router.navigate([ '/' ]);
  }
  openModalBtClickH() {
    let results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '创建新应用',
      content: DialogComponent,
      backdropCloseable: true,
      onClose: () => console.log('on dialog closed'),
      data: {
        // name: 'Tom',
        // age: 10,
        // address: 'Chengdu',
        key: 'key',
        name: 'name',
        members: 'members',
      }, // as FormData,
      // dialogtype: 'standard',
      // showAnimation: showAnimation,
      // buttons: [],
      buttons: [
        {
          cssClass: 'primary',
          text: '创建',
          disabled: false,
          handler: ($event: Event) => {
            let data: FormData = results.modalContentInstance.data
            // let {key, name} = data
            let members = data.members.split(',').map((item) => (item.trim())).filter((item) => !!item)
            this.http.post<ResponseData>('http://localhost:5000/apps', {
              key: data.key,
              name: data.name,
              ulid: '1234567',
              members,
            }).subscribe((res) => {
              if (res.code === 0) {
                this.msg = [
                  { severity: 'success', summary: '创建成功', content: '', myInfo: 'Devui' },
                ]
                results.modalInstance.hide(); // 成功才关闭
              } else {
                this.msg = [
                  { severity: 'error', summary: '创建失败', content: '', myInfo: 'Devui' },
                ]
              }
            })
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    })
  }
  appItemClickH(appUlid: S) {
    this.appService.setCurApp(appUlid)
    this.router.navigate([ '/setup' ], {
      queryParams: {app: appUlid}
    });
  }
  sqlBtClickH() {
    this.appService.reqAppList().then(res => {
      this.appList = res
    })
  }
}
