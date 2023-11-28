import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reqToPromise } from 'src/helper';
import { Subject, type Observable } from 'rxjs';
// 配置项
import { ssoUrl, serviceUrl } from 'src/helper/config';
// 类型
import type { ResponseData } from 'src/types';
import type { S, ULID, A } from 'src/types/base';
import type { User } from 'src/types';

let clog = console.log
interface TokenObj {
  accessToken: S
  refreshToken: S
}
type a = A
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
    let v = window.sessionStorage.getItem('lc-user')
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
    window.sessionStorage.setItem('lc-user', user)
  }
  clearUser() {
    this.user = undefined
    this.user$.next(this.user)
    window.sessionStorage.removeItem('lc-user')
  }
  login(data: {account: S, password: S}) {
    // return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/users/login', {
    //     account: data.account,
    //     password: data.password,
    //   }, {
    //     withCredentials: true,
    //   })).then(data => {
    //     // this.user = (data as User)
    //     this.setUser(data as User)
    //   })
    return reqToPromise<TokenObj>(this.http.post<ResponseData>(`${ssoUrl()}/users/login`, {
        account: data.account,
        password: data.password,
      }, {
      })).then((data: TokenObj) => {
        window.localStorage.setItem('accessToken', data.accessToken)
        window.localStorage.setItem('refreshToken', data.refreshToken)
        return
      }).catch((e) => {
        // clog('sdfs', e)
        return Promise.reject(e)
      })
  }
  loginSelf() {
    return new Promise((s, j) => {
      this.http.post<ResponseData>(`${serviceUrl()}/users/login`, {
        accessToken: window.localStorage.getItem('accessToken') || '',
        // systemId: 1,
      }, {
        withCredentials: true, // 控制是否种cookie
      }).subscribe(res => {
        if (res.code === 0) {
          s(undefined)
        } else {
          j(res)
        }
      })
    })
  }
  logout() {
    // return reqToPromise(this.http.post<ResponseData>('http://localhost:5000/users/logout', {}, {
    //   withCredentials: true,
    // })).then(() => {
    //   this.clearUser()
    // })
    return new Promise((s, j) => {
      this.http.post(`${ssoUrl()}/users/logout`, {}, {headers: {
        authorization: window.localStorage.getItem('accessToken') || '',
        refreshtoken: window.localStorage.getItem('refreshToken') || '',
      }}).subscribe((res: any) => {
        if (res.code === 0) {
          window.localStorage.removeItem('accessToken')
          window.localStorage.removeItem('refreshToken')
          s(undefined)
        } else {
          j(res)
        }
      })
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
  appendApp(appUlid: ULID) {
    let u = this.user!
    if (u?.firstApplicationUlid) {
      u.lastApplicationUlid = appUlid
    } else {
      u.firstApplicationUlid = appUlid
      u.lastApplicationUlid = appUlid
    }
    this.setUser(u)
  }
}
