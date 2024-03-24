import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
// type
import type { S } from 'src/types/base';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {
  @Input() label: S = 'label'
  @Input() value: S = ''
  @Output() change = new EventEmitter()
  _label: S = ''
  _value: S = ''
  constructor() {
  }
  ngOnInit(): void {
    this._label = this.label
    this._value = this.value
  }
  changeH() {
    console.log('change', this._value)
    this.change.emit(this._value)
  }
}
