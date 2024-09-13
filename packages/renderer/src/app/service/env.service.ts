import { Injectable } from '@angular/core';
import { ShareSignal } from 'src/helper/shareSignal';
import type { S, ENV } from 'src/types/base';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private _cur: ENV
  // cur$: Subject<ENV>
  curS: ShareSignal<ENV | undefined>
  constructor() {
    this._cur = 'dev'
    // this.cur$ = new Subject()
    this.curS = new ShareSignal(undefined)
  }
  setCur(v: ENV) {
    this._cur = v
    // this.cur$.next(this._cur)
    this.curS.set(this._cur)
  }
  getCur() {
    return this._cur
  }
}
