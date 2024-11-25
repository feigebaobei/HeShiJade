import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { serviceUrl, layoutOptions } from 'src/helper/config';
import { map } from 'rxjs/operators';
import { compatibleArray } from 'src/helper';
import { of } from 'rxjs';
// import type { ResponseData } from 'src/types';
import type { A, N, S, Options, } from 'src/types/base';
import { VERSION } from 'src/helper';

let clog = console.log

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {
  @Input() data: A
  msg: {}[]
  initVersion: N
  layoutOptions: Options<S, N>[]
  value: S[] // todo rename pluginsKey
  f: A
  layout: N
  @Output() newEvent = new EventEmitter()
  constructor(private http: HttpClient) {
    this.msg = []
    this.initVersion = VERSION
    this.layoutOptions = layoutOptions
    this.value = []
    this.f = (term: S) => {
      return this.onSelectObject(term)
    }
    this.layout = 1
  }
  onSelectObject(term: S) {
    if (term) {
      return this.http.get(`${serviceUrl()}/plugins/key`, {params: {key: term}}).pipe(
        map(res => {
          return compatibleArray((res as A).data).map((option, index) => ({id: index, option}))
        })
      )
    } else {
      return of([])
    }
  }
  createBtClickH() {
    this.newEvent.emit('str')
    this.msg = [
      { severity: 'info', summary: 'Absolute', content: 'str', myInfo: 'Devui' },
    ]
  }

}
