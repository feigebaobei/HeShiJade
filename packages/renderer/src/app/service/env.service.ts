import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import type { S, ENV } from 'src/types/base';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private _cur: ENV
  cur$: Subject<ENV>
  constructor() {
    this._cur = 'dev'
    this.cur$ = new Subject()
  }
  setCur(v: ENV) {
    this._cur = v
    this.cur$.next(this._cur)
  }
  getCur() {
    return this._cur
  }
}
