import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reqToPromise } from 'src/helper';
import { Subject, type Observable } from 'rxjs';
import { createSsoClient } from 'src/helper/sso-saml-client';
// 配置项
import { ssoUrl, serviceUrl, ssoClientConfig } from 'src/helper/config';
// 类型
import type { ResponseData } from 'src/types';
import type { S, ULID, A, N } from 'src/types/base';
import type { User } from 'src/types';
import type { SsoClient } from 'src/helper/sso-saml-client';

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
  ssoClient: SsoClient
  constructor(private http: HttpClient) {
    this.user = undefined
    this.user$ = new Subject()
    // todo delete 06.01+
    let v = window.sessionStorage.getItem('lc-user')
    if (v) {
      // this.setUser(JSON.parse(v))
      this.user = JSON.parse(v || '{}')
    }
    this.regularTime = 10 * 60 * 1000 // 10min
    // this.regularTime = 2000 // for dev
    // this.regularRefresh()
    this.regularTimeId = 0
    this.ssoClient = createSsoClient(ssoClientConfig.idp, ssoClientConfig.sp)
  }
  getUser() {
    // return this.user
    if (this.user) {
      return Promise.resolve(this.user)
    } else {
      return Promise.reject(new Error('未登录'))
    }
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
  logout() {
    // return new Promise((s, j) => {
    //   this.http.delete(`${serviceUrl()}/users/logout`, {
    //     withCredentials: true
    //   }).subscribe((res: any) => {
    //     if (res.code === 0) {
    //       s(undefined)
    //     } else {
    //       j(res)
    //     }
    //   })
    // })
    return this.ssoClient.logoutSp()
  }
  // 注册sso
  sign(data: {account: S, password: S, confirmPassword: S, verification: S}) {
    // return reqToPromise<TokenObj>(this.http.post<ResponseData>(`${ssoUrl()}/users/sign`, {
    //   account: data.account,
    //   password: data.password,
    //   confirmPassword: data.confirmPassword,
    //   verification: data.verification,
    // })).then((data: TokenObj) => {
    //   // this.setAccessToken(data.accessToken)
    //   // this.setRefreshToken(data.refreshToken)
    //   return
    //   // this.setUser({
    //   //   account: data.account,
    //   //   firstApplicationUlid: '',
    //   //   lastApplicationUlid: '',
    //   // })
    //   // return true
    // }).catch((e) => {
    //   return Promise.reject(e)
    // })
    return this.ssoClient.signIdp({email: data.account, password: data.password, verification: data.verification}).then((idpRes) => {
      if (idpRes.code === 0) {
        return this.ssoClient.loginSp(idpRes.data)
      } else {
        return Promise.reject()
      }
    })
  }
  // 注册server
  // todo delete 06.01+
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
  // todo delete 06.01+
  // _refresh() {
  //   this.http.put<ResponseData>(`${serviceUrl()}/users/refreshToken`, {
  //     accessToken: this.getAccessToken(),
  //     refreshToken: this.getRefreshToken(),
  //   }, {
  //     withCredentials: true
  //   }).subscribe(res => {
  //     if (res.code === 0) {
  //       this.setAccessToken(res.data.accessToken)
  //       this.setRefreshToken(res.data.refreshToken)
  //     } else {
  //       clog('更新token失败') // 若更新失败，则不再更新。
  //       this.clearRefresh()
  //     }
  //   })
  // }
  // refresh() {
  //   let at = this.getAccessToken()
  //   let rt = this.getRefreshToken()
  //   if (at && rt) {
  //     // this._refresh()
  //   } else {
  //     this.refresh = this._refresh
  //     this.refresh()
  //   }
  // }
  // todo delete 06.01+
  // regularRefresh() {
  //   this.regularTimeId = window.setInterval(() => {
  //     let at = this.getAccessToken()
  //     let rt = this.getRefreshToken()
  //     if (at && rt) {
  //       this._refresh()
  //     }
  //   }, this.regularTime)
  // }
  // todo delete 06.01+
  // clearRefresh() {
  //   if (this.regularTimeId) {
  //     clearInterval(this.regularTimeId)
  //   }
  // }
  // todo delete 06.01+
  // getAccessToken(): S {
  //   return window.localStorage.getItem('accessToken') || ''
  // }
  // setAccessToken(v: S) {
  //   window.localStorage.setItem('accessToken', v)
  //   clog('setAccessToken', v, this.getAccessToken())
  // }
  // clearAccessToken() {
  //   window.localStorage.removeItem('accessToken')
  // }
  // getRefreshToken(): S {
  //   return window.localStorage.getItem('refreshToken') || ''
  // }
  // setRefreshToken(v: S) {
  //   window.localStorage.setItem('refreshToken', v)
  // }
  // clearRefreshToken() {
  //   window.localStorage.removeItem('refreshToken')
  // }
  login(account: S, password: S) {
    // return login(ssoClientParams({account: account, password: password})).then(({idpRes, spRes}) => {
    //   this.setUser({
    //     ...idpRes.data,
    //     ...spRes.data
    //   })
    // })
    return this.ssoClient.login({email: account, password}).then((res) => {
      clog('res', res)
      this.setUser({
        ...res.idpRes.data,
        ...res.spRes.data,
      })
      return true
    })
  }
  sendVerification(data: A) {
    return this.ssoClient.sendVerification(data)
  }
}
