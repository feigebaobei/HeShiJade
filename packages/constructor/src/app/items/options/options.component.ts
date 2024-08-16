import { Component, Input, Output, EventEmitter, } from '@angular/core';
// type
import type { S, B, Options, A, N, } from 'src/types/base';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent {
  // @Input() label: S = ''
  // @Input() value: B = false
  @Input() optionsList: Options<S, S>[] = []
  @Input() optionsTemp!: Options<S, S>
  @Output() changeOptions = new EventEmitter<Options<S, S>[]>()
  // _label: S
  // _value: B
  // todo 修正 _optionsList optionsList
  _optionsList: Options<S, A>[] = []
  constructor() {
    // this._label = this.label
    // this._value = this.value
    // this._optionsList = this.optionsList
  }
  ngOnInit() {
    this._optionsList = this.optionsList
  }
  labelChangeH(v: S, i: N) {
    this.changeOptions.emit(this._optionsList)
  }
  valueChangeH(index: N) {
    this.changeOptions.emit(this._optionsList)
  }
  opLv () {
    // this._optionsList
  }
  addH() {
    let o = JSON.parse(JSON.stringify(this.optionsTemp))
    this._optionsList.push(o)
  }
}
