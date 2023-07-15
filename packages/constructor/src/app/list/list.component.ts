import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from 'ng-devui/modal';
import type { ResponseData } from 'src/types';
import type { A, B, S } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  appList: {
    name: string
    key: string
    theme: string
    id: number
  }[]
  user: A
  msg: {}[]
  constructor(private router: Router, private http: HttpClient, private dialogService: DialogService) {
    this.user = {}
    this.appList = [
      {
        name: 'name',
        key: 'key',
        theme: 'theme',
        id: 1,
      },
      {
        name: 'name',
        key: 'key',
        theme: 'theme',
        id: 2,
      },
    ]
    this.msg = []
  }
  ngOnInit(): void {
    this.init()
  }
  init(): void {
    // this.http.get<ResponseData>('http://localhost:5000/users/login', {}).subscribe((res) => {
    //   this.user = res
    // })
  }
  logoutBtClickH()  {
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
    this.router.navigate(['/' ]);
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
      },
      // dialogtype: 'standard',
      // showAnimation: showAnimation,
      // buttons: [],
      buttons: [
        {
          cssClass: 'primary',
          text: '创建',
          disabled: false,
          handler: ($event: Event) => {
            let {key, name, members} = results.modalContentInstance.data
            this.http.post<ResponseData>('http://localhost:5000/apps', {
              key,
              name,
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
  // creatAppBtClickH({key: S, name: S, members: S[]}) {
  //   this.http.post<ResponseData>('http://localhost:5000/apps', {
  //     key,
  //     name,
  //     // ulid,
  //     members,
  //   })
  // }
}
