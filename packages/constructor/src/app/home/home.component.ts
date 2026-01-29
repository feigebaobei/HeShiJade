// utils
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormLayout } from 'ng-devui/form';
// module
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule,
  ToastModule,
  FormModule,
} from 'ng-devui';
// pipe
// service
import { UserService } from '../service/user.service';
import { AppService } from '../service/app.service';
import { PageService } from '../service/page.service';
import { ComponentService } from '../service/component.service';
// type
import type { ResponseData, User } from 'src/types';
import type { B, A, } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    ToastModule,
    FormModule,
    FormsModule,
    CommonModule,
  ],
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
    private userService: UserService,
    private appService: AppService,
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.isCollapsed = false
    this.status = 1 // 0 注册 1 登录
    this.msg = []
    this.user = this.userService.user
    this.logining = false
  }
  formData = {
    // account: '123@qq.com', // for dev
    // password: '123456',
    // confirmPassword: '123456',
    account: window.location.hostname === 'heshijade.com' ? '' : '123@qq.com',
    password:  window.location.hostname === 'heshijade.com' ? '' : '123456',
    confirmPassword:  window.location.hostname === 'heshijade.com' ? '' : '123456',
    verification: '',
  }

  gotoList() {
    this.appService.clear()
    this.pageService.clear()
    this.componentService.clear()
    this.router.navigate(['/list']);
  }
  // 登录
  submitForm(a: any) {
    this.logining = true
    this.userService.clearUser()
    // login(ssoClientParams({account: this.formData.account, password: this.formData.password}) as SsoClientParams).then(() => {
    //   this.router.navigate(['/list'])
    //   this.user = this.userService.getUser()
    this.userService.login(this.formData.account, this.formData.password).then(() => {
      // this.router.navigate(['/list'])
      this.gotoList()
    }).catch((error: A) => {
      this.msg = [{ severity: 'error', summary: 'Summary', content: error.message }]
    }).finally(() => {
      this.logining = false
    })
  }
  // 注册
  submitSignForm(e: Event) {
    if (!this.formData.account || !this.formData.password || !this.formData.verification || !this.formData.confirmPassword) {
      this.msg = [{ severity: 'error', summary: 'Summary', content: '不能为空' }];
      return
    }
    if (this.formData.password === this.formData.confirmPassword) {
      this.userService.sign({
        account: this.formData.account,
        password: this.formData.password,
        confirmPassword: this.formData.confirmPassword,
        verification: this.formData.verification,
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
  sendButtonClickH() {
    this.userService.sendVerification({email: this.formData.account}).then((res) => {
      if (res.code === 0) {
        this.msg = [{ severity: 'success', summary: 'Summary', content: '验证码已经发送到指定邮箱，请查收。有效期2min.' }];
      } else {
        this.msg = [{ severity: 'error', summary: 'Summary', content: res.message }];
      }
    })
  }
}
