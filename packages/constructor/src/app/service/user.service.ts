import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'src/types';
import type { S } from 'src/types/base';
import type { Observable } from 'rxjs';
import type { User } from 'src/types';

// 日后移入helper
let reqToPromise = (fn: Observable<ResponseData>) => {
  return new Promise((s, j) => {
    fn.subscribe(res => {
      if (res.code === 0) {
        s(res.data)
      } else {
        j(new Error(res.message))
      }
    })
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User
  constructor(private http: HttpClient) {
    this.user = undefined
  }
  login(data: {account: S, password: S}) {
    // return this.http.post<ResponseData>('http://localhost:5000/users/login', {
    //   account: data.account,
    //   password: data.password,
    // }, {
    //   withCredentials: true,
    // })
    return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/users/login', {
        account: data.account,
        password: data.password,
      }, {
        withCredentials: true,
      })).then(data => {
        this.user = (data as User)
      })
  }
  logout() {
    return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/users/sign', {}, {
      withCredentials: true,
    }))
    // .then(data => {
    //   // this.router.navigate(['/'])
    // })
  }
  sign(data: {account: S, password: S}) {
    return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/users/sign', {
      account: data.account,
      password: data.password,
    }, {
      withCredentials: true,
    })).then(() => {
      this.user = {
        account: data.account,
        applications: []
      }
      return true
    })
  }
}
