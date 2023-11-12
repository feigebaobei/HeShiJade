import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
import { FormLayout } from 'ng-devui/form';
// import { Observable } from 'rxjs';
import type { ResponseData, User } from 'src/types';
import { UserService } from '../service/user.service';

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
  constructor(private router: Router, private http: HttpClient,
    private userService: UserService) {
    this.isCollapsed = false
    this.status = 1 // 0 注册 1 登录
    this.msg = []
    this.user = this.userService.user
  }
  formData = {
    account: '123@qq.com', // for dev
    password: '123456',
    confirmPassword: '123456',
  }

  listClickH() {
    this.router.navigate(['/list' ]);
  }
  // 登录
  submitForm(a: any) {
    this.userService.clearUser()
    this.userService.login({
      account: this.formData.account,
      password: this.formData.password
    }).then(() => {
      this.router.navigate(['/list' ]);
      this.user = this.userService.user
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
        this.listClickH()
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
    this.listClickH()
  }

}
