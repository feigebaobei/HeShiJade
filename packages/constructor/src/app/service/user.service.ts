import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reqToPromise } from 'src/helper';
import type { ResponseData } from 'src/types';
import type { S } from 'src/types/base';
import { Subject, type Observable } from 'rxjs';
import type { User } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // 日后改为private
  user?: User
  user$: Subject<User | undefined>
  constructor(private http: HttpClient) {
    this.user = undefined
    this.user$ = new Subject()
    let v = window.localStorage.getItem('lc-user')
    if (v) {
      this.setUser(JSON.parse(v))
    }
  }
  getUser() {
    return this.user
  }
  setUser(u?: User) {
    this.user = u
    this.user$.next(this.user)
    let user: S
    if (u) {
      user = JSON.stringify(u)
    } else {
      user = JSON.stringify({})
    }
    window.localStorage.setItem('lc-user', user)
  }
  clearUser() {
    this.user = undefined
    this.user$.next(this.user)
    window.localStorage.removeItem('lc-user')
  }
  login(data: {account: S, password: S}) {
    return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/users/login', {
        account: data.account,
        password: data.password,
      }, {
        withCredentials: true,
      })).then(data => {
        // this.user = (data as User)
        this.setUser(data as User)
      })
  }
  logout() {
    return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/users/logout', {}, {
      withCredentials: true,
    })).then(() => {
      // this.user = undefined // 可以优化为Observable
      // this.setUser(undefined)
      this.clearUser()
    })
  }
  sign(data: {account: S, password: S}) {
    return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/users/sign', {
      account: data.account,
      password: data.password,
    }, {
      withCredentials: true,
    })).then(() => {
      // this.user = {
      //   account: data.account,
      //   firstApplicationUlid: '',
      // }
      this.setUser({
        account: data.account,
        firstApplicationUlid: '',
        lastApplicationUlid: '',
      })
      return true
    })
  }
}
