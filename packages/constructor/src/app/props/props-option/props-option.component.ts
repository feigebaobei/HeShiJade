import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { debounceTime } from 'src/helper/config';
import { createDebounceFn } from 'src/helper/index'
import { cloneDeep } from 'src/helper/index';
import { valueType } from 'src/helper/config';
// type
import type { N, ConfigItmeOption, F, S, A, } from 'src/types/base';
// import type { ComponentPropsMetaItem } from 'src/types/props';
import type { PropsValue } from 'src/types/component';

let clog = console.log

@Component({
  selector: 'app-props-option',
  templateUrl: './props-option.component.html',
  styleUrls: ['./props-option.component.sass']
})
export class PropsOptionComponent {
  @Input() data!: ConfigItmeOption
  @Output() change = new EventEmitter()
  modelChangeH: F
  optionsList: ConfigItmeOption['template'][] = []
  options: {label: S, value: S}[]
  constructor(private componentService: ComponentService) {
    this.optionsList = []
    this.modelChangeH = createDebounceFn((v: S) => {
      this.componentService.setProps(this.data.key, this.data.value as unknown as PropsValue)
      this.componentService.reqUpdateComponent('props', this.data.key, this.data.value as unknown as PropsValue)
      this.change.emit(v)
    }, debounceTime)
    this.options = valueType
  }
  ngOnInit() {
    this.optionsList = cloneDeep(this.data.value)
  }
  // todo 去抖
  // todo 检查有必要向上传递吗？
  labelChangeH(v: S, index: N) {
    this.componentService.setProps(this.data.key, this.optionsList as unknown as PropsValue)
    this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
    this.change.emit(this.optionsList)
  }
  valueChangeH(index: N) {
    this.componentService.setProps(this.data.key, this.optionsList as unknown as PropsValue)
    this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
    this.change.emit(this.optionsList)
  }
  disabledChangeH() {
    this.componentService.setProps(this.data.key, this.optionsList as unknown as PropsValue)
    this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
    this.change.emit(this.optionsList)
  }
  valueTypechangeH(t: S, i: N) {
    switch (t) {
      case 'string':
      default:
        this.optionsList[i].value = ''
        break;
      case 'number':
        this.optionsList[i].value = 0
        break;
      case 'boolean':
        this.optionsList[i].value = true
        break;
    }
    this.componentService.setProps(this.data.key, this.optionsList as unknown as PropsValue)
    this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
    this.change.emit(this.optionsList)
  }
  deleteIconClickH($event: MouseEvent, i: N) {
    this.optionsList.splice(i, 1)
    this.change.emit(this.optionsList)
  }
  addH() {
    let o = cloneDeep(this.data.template)
    this.optionsList.push(o)
    this.componentService.setProps(this.data.key, this.optionsList as unknown as PropsValue)
    this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
    this.change.emit(this.optionsList)
  }
}
