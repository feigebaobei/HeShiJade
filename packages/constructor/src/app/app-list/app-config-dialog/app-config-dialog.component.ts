import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { serviceUrl } from 'src/helper/config';
import { map} from 'rxjs/operators';
import { compatibleArray } from 'src/helper';
// type
import type { App } from 'src/types/app';
import type { A, N, S } from 'src/types/base';
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
  value: A
  arr: A[]
  f: A
  constructor(
    private http: HttpClient,
  ) {
    this.options = []
    this.value = null
    this.arr = arr
    this.f = (term: S) => {
      return this.onSelectObject(term)
    }
  }
  onSelectObject(term: S) {
    if (term) {
      return this.http.get(`${serviceUrl()}/plugins/key`, {params: {key: term}}).pipe(
        map(res => {
          return compatibleArray((res as A).data).map((option, index) => ({id: index, option}))
        })
      )
    } else {
      // this.options = []
      // return of(this.options)
      return of([])
    }
  }
  loadMore($event: EventEmitter) {
    arr = [...arr, ...arr]
    $event.instance.loadFinish();
  }
  ngOnInit(): void {
  }
}
