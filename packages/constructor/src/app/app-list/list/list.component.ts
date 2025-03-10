// utils
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initAppMeta } from 'src/helper';
// module
// service
import { AppService } from '../../service/app.service';
import { UserService } from '../../service/user.service';
import { PageService } from '../../service/page.service';
import { ComponentService } from '../../service/component.service';
import { text } from 'src/helper/config';
import { DialogService } from 'ng-devui/modal';
// 组件
import { DialogComponent } from '../dialog/dialog.component';
import { AppConfigDialogComponent } from '../app-config-dialog/app-config-dialog.component';
import { PublishDialogComponent } from '../publish-dialog/publish-dialog.component';
// type
import type { ResponseData, User } from 'src/types';
import type { A, B, S, N, Email, } from 'src/types/base';
import type { App } from 'src/types/app';
import type { Text } from 'src/types/config';

interface FormData {
  key: S
  name: S
  members: S
  theme: S
  layout: N
  pluginsKey: S[]
}

let clog = console.log

@Component({
  selector: 'app-list',
  // standalone: true,
  // imports: [
  //   DevUIModule,
  //   CommonModule,
  // ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  appList: App[]
  user?: User
  msg: {}[]
  text: Text
  constructor(
    private router: Router, 
    // private http: HttpClient, 
    private dialogService: DialogService,
    private appService: AppService,
    private userService: UserService,
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.userService.getUser().then((v) => {
      this.user = v
    })
    this.msg = []
    this.appList = []
    this.text = text
  }
  ngOnInit(): void {
    this.init()
  }
  init(): void {
    this.appService.getAppList().then(al => {
      this.appList = al
    })
  }
  logoutBtClickH()  {
    this.userService.logout().then(() => {
      this.router.navigate(['/'])
    }).catch(error => {
      clog('登出失败')
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
      },
      buttons: [
        {
          cssClass: 'primary',
          text: '创建',
          disabled: false,
          handler: ($event: Event) => {
            let data: FormData = results.modalContentInstance.data
            // let data: {app: App} = results.modalContentInstance.data
            let layout: N = results.modalContentInstance.layout
            let pluginsKey: S[] = results.modalContentInstance.value
            let members = data.members.split(',').map((item) => (item.trim())).filter((item) => !!item)
            members = [...new Set(members)]
            // clog('data', data)
            this.userService.getUser().then(user => {
              let appObj = initAppMeta(data.key, data.name, data.theme, user.profile.email as Email, 
                undefined, layout, pluginsKey)
              // 操作本组件的数据
              this.appList.push(appObj)
              // 操作service中的数据
              this.userService.appendApp(appObj.ulid)
              this.appService.createApp(appObj)
              this.pageService.createApp(appObj.ulid)
            })
            results.modalInstance.hide();
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
    this.reqAppList()
  }
  reqAppList() {
    this.appService.reqAppList().then(appList => {
      this.appService.opAppList(appList)
      this.init()
      this.msg = [{ severity: 'success', summary: '', content: '已经更新应用列表' }]
    })
  }
  configBtClickH($event: Event, index: N) {
    $event.stopPropagation() // 阻止事件冒泡
    // $event.preventDefault() // 阻止默认事件
    let app = this.appList[index]
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
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: ($event: Event) => {
            let data: {app: App} = results.modalContentInstance.data
            this.appService.updateApp(app.ulid, {
              pluginsKey: data.app.pluginsKey, // results.modalContentInstance.value || [],
              layout: data.app.layout,
            }).then(() => {
              results.modalInstance.hide()
            })
          }
        },
        {
          id: 'app-config-dialog-btn-canncel',
          cssClass: 'common',
          text: '取消',
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
  appDeleteClickH($event: Event, index: N) {
    $event.stopPropagation()
    // 在本组件中删除应用项
    let app = this.appList[index]
    this.appList.splice(index, 1)
    // 在服务器中删除
    this.appService.reqDeleteApp(app.ulid, ['dev', 'test', 'pre', 'prod'])
    // 在service中删除组件
    this.pageService.getPageList(app.ulid, true).then((pageList) => { // 删除指定应用下的所有页面的组件
      pageList.forEach((page) => {
        this.componentService.deleteComponentByPageUlid(page.ulid)
      })
    })
    // 在service中删除页面
    this.pageService.deletePageByAppUlid(app.ulid)
    // 在service中删除应用
    this.appService.deleteApp(app.ulid)
    // 在userService中删除应用
    this.userService.deleteApp(app.ulid, this.appList[0]?.ulid || '')
  }
}
