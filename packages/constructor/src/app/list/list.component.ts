import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from 'ng-devui/modal';
import type { ResponseData, User } from 'src/types';
import type { A, B, S, N } from 'src/types/base';
import type { App } from 'src/types/app';
import { AppService } from '../service/app.service';
import { UserService } from '../service/user.service';
import { AppConfigDialogComponent } from './app-config-dialog/app-config-dialog.component';
import { PublishDialogComponent } from './publish-dialog/publish-dialog.component';

interface FormData {
  key: S
  name: S
  members: S
  theme: S
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
  user?: User
  msg: {}[]
  constructor(
    private router: Router, 
    private http: HttpClient, 
    private dialogService: DialogService,
    private appService: AppService,
    private userService: UserService,
  ) {
    this.user = this.userService.getUser()
    this.msg = []
    // this.appList = this.appService.getAppList()
    this.appList = []
    // this.userService.user$.subscribe(u => {
    //   this.user = u
    //   this.reqAppList()
    // })
    this.appService.appList$.subscribe(arr => {
      this.appList = arr
    })
  }
  ngOnInit(): void {
    this.init()
  }
  init(): void {
    if (!this.appList.length) {
      this.reqAppList()
    }
  }
  logoutBtClickH()  {
    // todo 验证登出。
    // 应该传递cookie
    // this.http.post<ResponseData>('http://localhost:5000/users/logout', {}).subscribe((res) => {
    //   this.router.navigate(['/'])
    // })
    this.userService.logout().then(() => {
      this.router.navigate(['/'])
    })
  }
  userInfoBtClickH() {
    // this.http.get<ResponseData>('http://localhost:5000/users', {withCredentials: true}).subscribe((res) => {
    //   clog('getUserInfo', res)
    // })
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
        key: 'one',
        name: 'one',
        members: '123@qq.com,kevin@163.com',
        theme: 'blue',
        selectOptions: [{
          value: 'blue',
          label: '蓝'
        },
        {
          value: 'yellow',
          label: '黄'
        },],
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
            members = [...new Set(members)]
            this.appService.createApp({
              key: data.key,
              name: data.name,
              theme: data.theme,
              collaborator: members,
              prevUlid: this.appList.length ? this.appList[this.appList.length - 1].ulid : '',
            })
            results.modalInstance.hide();
            // .subscribe((res) => {
            //   if (res.code === 0) {
            //     this.msg = [
            //       { severity: 'success', summary: '创建成功', content: '', myInfo: 'Devui' },
            //     ]
            //     results.modalInstance.hide(); // 成功才关闭
            //     // 刷新应用列表
            //     this.reqAppList()
            //   } else {
            //     this.msg = [
            //       { severity: 'error', summary: '创建失败', content: '', myInfo: 'Devui' },
            //     ]
            //   }
            // })
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
    // this.appService.setCurApp(appUlid)
    this.router.navigate([ '/setup' ], {
      queryParams: {app: appUlid}
    });
  }
  sqlBtClickH() {
    this.reqAppList()
  }
  reqAppList() {
    this.appService.reqAppList()
  }
  configBtClickH($event: Event, index: N) {
    $event.stopPropagation() // 阻止事件冒泡
    // $event.preventDefault() // 阻止默认事件
    // clog('config', index, this.appList[index])
    let results = this.dialogService.open({
      id: 'app-config-dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '应用配置',
      content: AppConfigDialogComponent,
      backdropCloseable: true,
      onClose: () => clog('hi close'),
      data: {
        app: this.appList[index],
      },
      dialogtype: 'standard',
      showAnimate: true,
      buttons: [
        // {
        //   cssClass: 'primary',
        //   text: 'Ok',
        //   disabled: false,
        //   handler: ($event: Event) => {
        //     results.modalInstance.hide()
        //   }
        // },
        {
          id: 'app-config-dialog-btn-canncel',
          cssClass: 'common',
          text: '关闭',
          handler: ($event: Event) => {
            results.modalInstance.hide()
          }
        }
      ]
    })
  }
  gotoPublishBtClickH($event: Event, index: N) {
    clog('gotoPublishBtClickH', index, this.appList[index], this.appList[index].ulid)
    $event.stopPropagation()
    let results = this.dialogService.open({
      id: 'PublishDialogComponent',
      width: '800px',
      maxHeight: '600px',
      title: '发布',
      content: PublishDialogComponent,
      backdropCloseable: true,
      onClose: () => clog('close'),
      data: {
        appUlid: this.appList[index].ulid,
        // app: this.appList[index],
      },
      dialogtype: 'standard',
      showAnimate: true,
      buttons: [
        // {
        //   cssClass: 'primary',
        //   text: 'Ok',
        //   disabled: false,
        //   handler: ($event: Event) => {
        //     results.modalInstance.hide()
        //   }
        // },
        // {
        //   cssClass: 'common',
        //   text: 'Cancel',
        //   handler: ($event: Event) => {
        //     results.modalInstance.hide()
        //   }
        // },
      ]
    })
  }
  homeBtClickH() {
    this.router.navigate(['/home'])
  }
}
