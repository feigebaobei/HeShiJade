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
  @Input() value: B = false
  @Output() change = new EventEmitter()
  _label: S = ''
  _value: B = false
  constructor() {
  }
  ngOnInit() {
    this._label = this.label
    this._value = this.value
  }
  changeH() {
    this.change.emit(this._value)
  }
}
