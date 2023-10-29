import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reqToPromise } from 'src/helper';
import type { ResponseData } from 'src/types';
import type { S } from 'src/types/base';
import type { Observable } from 'rxjs';
import type { User } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user?: User
  constructor(private http: HttpClient) {
    this.user = undefined
  }
  login(data: {account: S, password: S}) {
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
    return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/users/logout', {}, {
      withCredentials: true,
    })).then(() => {
      this.user = undefined // 可以优化为Observable
    })
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
