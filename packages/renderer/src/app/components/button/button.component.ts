import { Component, Input, } from '@angular/core';
// type
import type { A } from 'src/types/base';
import {shareEvent} from 'src/helper';

let clog = console.log

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input() data: A
  constructor() {}
  buttonClickH() {
    let eventArr = this.data.behavior.groups.filter((item: A) => item.event === 'click')
    eventArr.forEach((item: A) => {
      shareEvent.emit(item.target, item.payload)
    })
  }
  buttonDbClickH() {
    this.data.behavior.groups.filter((item: A) => item.event === 'dbClick').forEach((item: A) => {
      shareEvent.emit(item.target, item.payload)
    })
  }
}
