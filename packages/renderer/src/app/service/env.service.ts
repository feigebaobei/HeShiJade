import { Injectable } from '@angular/core';
import { ShareSignal } from 'src/helper/shareSignal';
import type { S, ENV } from 'src/types/base';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private _cur: ENV
  curS: ShareSignal<ENV | undefined>
  constructor() {
    this._cur = 'dev'
    this.curS = new ShareSignal(undefined)
  }
  setCur(v: ENV) {
    this._cur = v
    this.curS.set(this._cur)
  }
  getCur() {
    return this._cur
  }
}
