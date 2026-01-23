import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// type
import type { A, N, Options, S } from 'src/types/base';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent implements OnInit {
  @Input() label: S = ''
  @Input() value: S | N = ''
  // set value(p: A) {
  //   this._value = p
  // }
  // get value() {
  //   return this._value
  // }
  @Input() options: Options<S, A>[] = []
  @Output() changeValue = new EventEmitter()
  _value: S | N = ''
  _label: S = ''
  constructor() {
  }
  ngOnInit(): void {
    this._value = this.value
    this._label = this.label
  }
  changeH() {
    // console.log('chagneH', this._value, this.value)
    this.changeValue.emit(this.value)
  }
}
