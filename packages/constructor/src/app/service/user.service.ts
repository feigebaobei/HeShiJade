import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reqToPromise } from 'src/helper';
import { Subject, type Observable } from 'rxjs';
// 配置项
import { ssoUrl, serviceUrl } from 'src/helper/config';
// 类型
import type { ResponseData } from 'src/types';
import type { S, ULID, A, N } from 'src/types/base';
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
  regularTime: N
  regularTimeId: N
  constructor(private http: HttpClient) {
    this.user = undefined
    this.user$ = new Subject()
    let v = window.sessionStorage.getItem('lc-user')
    if (v) {
      this.setUser(JSON.parse(v))
    }
    this.regularTime = 10 * 60 * 1000 // 10min
    this.regularRefresh()
    this.regularTimeId = 0
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
  // 登录sso
  // 前端不应该直接请求sso
  loginSso(data: {account: S, password: S}) {
    return reqToPromise<User>(this.http.post<ResponseData>(`${ssoUrl()}/users/login`, {
        account: data.account,
        password: data.password,
      })).then((data: User) => {
        window.localStorage.setItem('accessToken', data.accessToken)
        window.localStorage.setItem('refreshToken', data.refreshToken)
        this.setUser(data)
        return
      }).catch((e) => {
        // clog('sdfs', e)
        return Promise.reject(e)
      })
  }
  loginServer(data: {account: S, password: S}) {
    return new Promise((s, j) => {
      this.http.post<ResponseData>(`${serviceUrl()}/users/login`, {
        // accessToken: window.localStorage.getItem('accessToken') || '',
        // systemId: 1,
        account: data.account,
        password: data.password,
      }, {
        withCredentials: true, // 控制是否种cookie
      }).subscribe(res => {
        if (res.code === 0) {
          this.setUser(res.data)
          s(undefined)
        } else {
          j(res)
        }
      })
    })
  }
  logout() {
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
  // 注册sso
  sign(data: {account: S, password: S}) {
    return reqToPromise<TokenObj>(this.http.post<ResponseData>(`${serviceUrl()}/users/sign`, {
      account: data.account,
      password: data.password,
    })).then((data: TokenObj) => {
      window.localStorage.setItem('accessToken', data.accessToken)
      window.localStorage.setItem('refreshToken', data.refreshToken)
      return
      // this.setUser({
      //   account: data.account,
      //   firstApplicationUlid: '',
      //   lastApplicationUlid: '',
      // })
      // return true
    }).catch((e) => {
      return Promise.reject(e)
    })
  }
  // 注册server
  signSelf(data: {account: S, password: S}) {
    return 
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
  // 刷新token
  refresh() {
  }
  regularRefresh() {
    if (this.regularTimeId) {
      clearInterval(this.regularTimeId)
      this.refresh()
    }
    this.regularTimeId = window.setInterval(this.refresh, this.regularTime)
  }
  clearRefresh() {
    if (this.regularTimeId) {
      clearInterval(this.regularTimeId)
    }
  }
}
