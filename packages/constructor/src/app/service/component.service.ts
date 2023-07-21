import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import type { Component } from '../../types/component'
import type { ResponseData } from '../../types/index'

let clog = console.log

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  componentList: Observable<Component[]>
  constructor(private http: HttpClient) {
    this.componentList = of([])
  }
  getComponent() {
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
}
