import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
import { FormLayout } from 'ng-devui/form';
// import { Observable } from 'rxjs';

let clog = console.log
type S = string
type N = number
type A = any
interface ResponseData {
  code: N
  data: A
  message: S
}

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

  constructor(private router: Router, private http: HttpClient) {
    this.isCollapsed = false
    this.status = 1 // 0 注册 1 登录
    this.msg = []
  }
  formData = {
    account: '',
    password: '',
    confirmPassword: '',
    // account: '',
  }

  listClickH() {
    this.router.navigate(['/list' ]);
  }
  submitForm(a: any) {
    // clog(a)
    // this.http.get('http://localhost:5000/users/login')
    this.http.post<ResponseData>('http://localhost:5000/users/login', {
      account: this.formData.account,
      password: this.formData.password,
    })
    .subscribe((res) => {
      if (res.code === 0) {
        this.listClickH()
      }
    })
  }
  submitLoginForm(e: Event) {
    if (!this.formData.account || !this.formData.password) {
      this.msg = [{ severity: 'error', summary: 'Summary', content: '不能为空' }];
      return
    }
    if (this.formData.password === this.formData.confirmPassword && this.formData.password) {
      this.http.post<ResponseData>('http://localhost:5000/users/sign', {
        account: this.formData.account,
        password: this.formData.password,
      }).subscribe((res) => {
        if (res.code === 0) {
          this.listClickH()
        }
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

}
