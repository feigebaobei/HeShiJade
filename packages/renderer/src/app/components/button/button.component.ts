import { Component, Input, } from '@angular/core';
import {shareEvent} from 'src/helper';
// type
import type { A } from 'src/types/base';

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
    let eventArr = this.data.behavior.filter((item: A) => item.event === 'click')
    eventArr.forEach((item: A) => {
      shareEvent.emit(item.target, item.payload)
    })
  }
  buttonDbClickH() {
    this.data.behavior.filter((item: A) => item.event === 'dbClick').forEach((item: A) => {
      shareEvent.emit(item.target, item.payload)
    })
  }
}
