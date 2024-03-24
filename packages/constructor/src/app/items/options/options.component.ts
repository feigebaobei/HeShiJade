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
  @Input() optionsList: Options<S, A>[] = []
  @Input() optionsTemp!: Options<S, A>
  @Output() changeE = new EventEmitter()
  // _label: S
  // _value: B
  _optionsList: Options<S, A>[] = []
  constructor() {
    // this._label = this.label
    // this._value = this.value
    // this._optionsList = this.optionsList
  }
  ngOnInit() {
    this._optionsList = this.optionsList
  }
  labelChangeH(i: N) {
    // this.changeE.emit(this._value)
  }
  valueChangeH(index: N) {
    // this.changeE.emit(this._value)
  }
  // addH() {
  //   let o = JSON.parse(JSON.stringify(this.optionsTemp))
  //   this._optionsList.push(o)
  // }
}
