import { Injectable } from '@angular/core';
import type { S } from 'src/types/base';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  cur: S
  constructor() {
    this.cur = ''
  }
  setCur(v: S) {
    this.cur = v
  }
}
