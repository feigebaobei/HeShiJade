import { Injectable } from '@angular/core';
import type { S } from 'src/types/base';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private cur: S
  constructor() {
    this.cur = ''
  }
  setCur(v: S) {
    this.cur = v
    // 有可能需要响应式的
  }
  getCur() {
    return this.cur
  }
}
