import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import type { Component } from '../../types/component'
import type { ResponseData } from '../../types/index'
import { S } from 'src/types/base';

let clog = console.log

type CompOrUn = Component | undefined

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  componentList: Component[]
  // curComponent: Component | null
  compSubject$: Subject<CompOrUn>
  _curCompUlid: S
  _curComponent: CompOrUn
  constructor(private http: HttpClient) {
    this.componentList = []
    // 组件种类应该从前端取得，不应该从后端接口取得。
    // this.curComponent = null
    this.compSubject$ = new Subject<CompOrUn>()
    this._curCompUlid = ''
    this._curComponent = undefined
  }
  getComponentList() {
    return new Promise<Component[]>((s, j) => {
      this.http.get<ResponseData>('http://localhost:5000/components', {
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          this.componentList = res.data
          // clog(this.componentList)
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
      
    })
    // return this.componentList
  }
  private _find(compUlid: S) {
    return this._curComponent = this.componentList.find(item => item.ulid === compUlid)
  }
  curComponent() {
    return this._curComponent
  }
  setCurComponent(compUlid: S) {
    this.compSubject$.next(this._find(compUlid))
  }
}
