import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serviceUrl, layoutOptions } from 'src/helper/config';
import { map } from 'rxjs/operators';
import { compatibleArray } from 'src/helper';
// 服务
import { AppService } from 'src/app/service/app.service';
// type
import type { App } from 'src/types/app';
import type { A, N, S, Options } from 'src/types/base';
import type { SelectComponent } from 'ng-devui'
// type EventEmitter = {instance: SelectComponent, event: ScrollEvent}
type EventEmitter = {instance: SelectComponent, event: A}

let clog = console.log
// for dev
let arr = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
  {
    label: 'Option 3',
    value: 3,
  },
  {
    label: 'Option 4',
    value: 4,
  },
];

@Component({
  selector: 'app-app-config-dialog',
  templateUrl: './app-config-dialog.component.html',
  styleUrls: ['./app-config-dialog.component.sass']
})
export class AppConfigDialogComponent implements OnInit {
  @Input() data!: {
    app: App,
  }
  options: A[]
  value: S[]
  arr: A[]
  f: A
  layoutOptions: Options<S, N>[]
  constructor(
    // private http: HttpClient,
    private appService: AppService,
  ) {
    this.options = []
    this.value = []
    this.arr = arr
    this.f = (term: S) => {
      return this.onSelectObject(term)
    }
    this.layoutOptions = layoutOptions
  }
  onSelectObject(term: S) {
    if (term) {
      // return this.http.get(`${serviceUrl()}/plugins/key`, {params: {key: term}}).pipe(
      //   map(res => {
      //     return compatibleArray((res as A).data).map((option, index) => ({id: index, option}))
      //   })
      // )
      return this.appService.reqPluginsKey(term).then(res => {
        return compatibleArray((res as A).data).map((option, index) => ({id: index, option}))
      })
    } else {
      return of([])
    }
  }
  // 没发现使用它的地方
  // loadMore($event: EventEmitter) {
  //   arr = [...arr, ...arr]
  //   $event.instance.loadFinish();
  // }
  ngOnInit(): void {
    this.value = this.data.app.pluginsKey
  }
}
