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
  layoutDirection: FormLayout = FormLayout.Vertical;

  constructor(private router: Router, private http: HttpClient) {
    this.isCollapsed = false
  }
  formData = {
    account: '',
    password: '',
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
  
  ngOnInit(): void {
  //   this.http.get('/first')
  }

}
