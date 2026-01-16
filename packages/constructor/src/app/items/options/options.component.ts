import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { cloneDeep } from 'src/helper';
import { valueType } from 'src/helper/config';
// type
import type { S, B, Options, A, N, ConfigItmeOption, } from 'src/types/base';
let clog = console.log

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent {
  @Input() label: S = ''
  // @Input() value: B = false
  // @Input() optionsList: Options<S, S>[] = []
  @Input() optionsList!: ConfigItmeOption['template'][]
  // @Input() optionsTemp!: Options<S, S>
  @Input() optionsTemp!: ConfigItmeOption['template']
  // @Output() changeOptions = new EventEmitter<Options<S, S>[]>()
  @Output() changeOptions = new EventEmitter<ConfigItmeOption['template'][]>()
  // _label: S
  // _value: B
  // todo 修正 _optionsList optionsList
  // _optionsList: Options<S, A>[] = []
  _optionsList: ConfigItmeOption['template'][]
  options: {label: S, value: S}[]
  constructor() {
    // this._label = this.label
    // this._value = this.value
    // this._optionsList = this.optionsList
    this._optionsList = []
    this.options = valueType
  }
  // todo 检查_optionsList
  // 好像没有使用到_optionsList
  ngOnInit() {
    this._optionsList = this.optionsList.map(item => {
      let t = Object.assign({}, this.optionsTemp, item)
      // 可以使用传入的数据。但是为了安全（本组件只处理本组件的数据）所有使用深复制处理一下。
      t = cloneDeep(t)
      switch (typeof t.value) {
        case 'string':
        default:
          t.valueType = 'string'
          break;
        case 'number':
          t.valueType = 'number'
          break;
        case 'boolean':
          t.valueType = 'boolean'
          break;
      }
      return t
    })
    // this._optionsList = cloneDeep(this.optionsList)
    clog('dddd', this.optionsList, this.optionsTemp, this._optionsList)
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
  disabledChangeH() {
    this.changeOptions.emit(this._optionsList)
    // this.componentService.setProps(this.data.key, this.optionsList as unknown as PropsValue)
    // this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
    // this.change.emit(this.optionsList)
  }
  valueTypechangeH(t: S, i: N) {
    switch (t) {
      case 'string':
      default:
        this._optionsList[i].value = ''
        break;
      case 'number':
        this._optionsList[i].value = 0
        break;
      case 'boolean':
        this._optionsList[i].value = true
        break;
    }
    this.changeOptions.emit(this._optionsList)
  }
  deleteIconClickH($event: MouseEvent, i: N) {
    this._optionsList.splice(i, 1)
    this.changeOptions.emit(this._optionsList)
  }
  addH() {
    let o = cloneDeep(this.optionsTemp)
    this._optionsList.push(o)
  }
}
