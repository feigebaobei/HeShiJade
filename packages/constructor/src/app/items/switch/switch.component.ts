import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
// type
import type { S, B } from 'src/types/base';


@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.sass']
})
export class SwitchComponent implements OnInit {
  @Input() label: S = ''
  @Input() checked: B = false
  @Output() changeValue = new EventEmitter()
  // _label: S = ''
  // _value: B = false
  constructor() {
  }
  ngOnInit() {
    // this._label = this.label
    // this._value = this.checked
  }
  changeH() {
    this.changeValue.emit(this.checked)
  }
}
