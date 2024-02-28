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
    shareEvent.emit('01HQFYX942DGF1Z8CQ30BTXXSC', {visible: true})
  }
}
