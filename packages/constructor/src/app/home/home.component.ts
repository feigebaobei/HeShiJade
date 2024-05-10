import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormLayout } from 'ng-devui/form';
import { login } from 'src/helper/sso-saml-client';
import { ssoClientParams } from 'src/helper/config';

import type { ResponseData, User } from 'src/types';
import type { SsoClientParams } from 'src/helper/sso-saml-client';
import { UserService } from '../service/user.service';
import { B } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  isCollapsed: boolean
  status: number
  layoutDirection: FormLayout = FormLayout.Vertical;
  msg: {}[]
  user?: User
  logining: B
  constructor(private router: Router, private http: HttpClient,
    private userService: UserService) {
    this.isCollapsed = false
    this.status = 1 // 0 注册 1 登录
    this.msg = []
    this.user = this.userService.user
    this.logining = false
  }
  formData = {
    account: '123@qq.com', // for dev
    password: '123456',
    confirmPassword: '123456',
  }

  gotoList() {
    this.router.navigate(['/list' ]);
  }
  // 登录
  submitForm(a: any) {
    this.logining = true
    this.userService.clearUser()
    // this.userService.loginSso({
    //   account: this.formData.account,
    //   password: this.formData.password
    // }).then(() => {
    //   return this.userService.loginServer()
    // }).then(() => {
    //   this.router.navigate(['/list' ]);
    //   this.user = this.userService.user
    // })

    // this.userService.loginServer({
    //   account: this.formData.account,
    //   password: this.formData.password,
    // }).then(() => {
    //   this.router.navigate(['/list'])
    //   this.user = this.userService.getUser()
    //   this.userService.clearRefresh()
    //   this.userService.regularRefresh()
    // }).catch(error => {
    //   this.msg = [{ severity: 'error', summary: 'Summary', content: error.message }]
    // }).finally(() => {
    //   this.logining = false
    // })

    login(ssoClientParams() as SsoClientParams).then(() => {
      this.router.navigate(['/list'])
      this.user = this.userService.getUser()
    }).catch(error => {
      this.msg = [{ severity: 'error', summary: 'Summary', content: error.message }]
    }).finally(() => {
      this.logining = false
    })
  }
  // 注册
  submitSignForm(e: Event) {
    if (!this.formData.account || !this.formData.password) {
      this.msg = [{ severity: 'error', summary: 'Summary', content: '不能为空' }];
      return
    }
    if (this.formData.password === this.formData.confirmPassword && this.formData.password) {
      this.userService.sign({
        account: this.formData.account,
        password: this.formData.password,
      }).then(() => {
        this.gotoList()
      }).catch((error) => {
        clog('errror', error)
        this.msg = [{ severity: 'error', summary: 'Summary', content: error.message }];
      })
    } else {
      this.msg = [{ severity: 'error', summary: 'Summary', content: '二次输入的password不一致' }];
    }
  }
  
  ngOnInit(): void {
  //   this.http.get('/first')
  }
  setStatus(value: number) {
    // clog('gotoRegiste')
    this.status = value
  }
  gotoLinkButtonClickH() {
    this.gotoList()
  }

}
