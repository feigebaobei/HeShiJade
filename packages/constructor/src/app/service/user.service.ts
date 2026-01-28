import { Injectable } from '@angular/core';
import { createSsoClient } from 'src/helper/sso-saml-client';
import { ShareSignal } from 'src/helper/shareSignal';
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
  userS: ShareSignal<User | undefined>
  regularTime: N
  regularTimeId: N
  ssoClient: SsoClient
  constructor() {
    this.user = undefined
    this.userS = new ShareSignal(this.user)
    let v = window.sessionStorage.getItem('lc-user')
    if (v) {
      this.user = JSON.parse(v || '{}')
    }
    this.regularTime = 10 * 60 * 1000 // 10min
    // this.regularTime = 2000 // for dev
    this.regularTimeId = 0
    this.ssoClient = createSsoClient(ssoClientConfig.idp, ssoClientConfig.sp)
  }
  getUser() {
    if (this.user) {
      return Promise.resolve(this.user)
    } else {
      return Promise.reject(new Error('未登录'))
    }
  }
  setUser(u?: User) {
    clog('setUser', u)
    this.user = u
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
    window.sessionStorage.removeItem('lc-user')
  }
  logout() {
    return this.ssoClient.logoutSp()
  }
  // 注册sso
  sign(data: {account: S, password: S, confirmPassword: S, verification: S}) {
    return this.ssoClient.signIdp({email: data.account, password: data.password, verification: data.verification}).then((idpRes) => { // 1. 得到idp的数据
      if (idpRes.code === 0) {
        // return this.ssoClient.loginSp(idpRes.data)
        // idpRes.data: {
        //   ulid: _ulid,
        //   profile: {
        //     email: req.body.email,
        //   },
        //   systems: [],
        //   roles: [],
        //   routes: [],
        // }
        return this.ssoClient.signSp(idpRes.data).then((spRes) => { // 2. 得到sp的数据
          // spRes.data: {
          //   ulid: result.ulid,
          //   profile: result.profile,
          //   firstApplicationUlid: '',
          // }
          this.setUser({
            ...idpRes.data,
            ...spRes.data,
          })
        })
        // 3. 把这2块数据缓存起来。

      } else {
        return Promise.reject()
      }
    })
  }
  appendApp(appUlid: ULID) {
    let u = this.user!
    if (u.firstApplicationUlid) {
    } else {
      u.firstApplicationUlid = appUlid
    }
    this.setUser(u)
  }
  login(account: S, password: S) {
    return this.ssoClient.login({email: account, password}).then((res) => { // 1. 得到idp、sp的数据。
      // clog('res', res)
      this.setUser({ // 2. 把这2块数据缓存起来。
        ...res.idpRes.data,
        ...res.spRes.data,
      })
      return true
    })
  }
  sendVerification(data: A) {
    return this.ssoClient.sendVerification(data)
  }
  deleteApp(appUlid: ULID, firstAppBack: ULID) {
    if (this.user?.firstApplicationUlid === appUlid) {
      if (firstAppBack) {
        this.user.firstApplicationUlid = firstAppBack
      } else {
        this.user.firstApplicationUlid = ''
      }
      this.setUser(this.user)
    }
  }
}
