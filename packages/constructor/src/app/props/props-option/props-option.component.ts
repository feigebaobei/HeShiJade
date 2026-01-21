import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { debounceTime } from 'src/helper/config';
import { createDebounceFn } from 'src/helper/index'
import { cloneDeep } from 'src/helper/index';
import { valueType } from 'src/helper/config';
// type
import type { N, ConfigItemOption, F, S, A, } from 'src/types/base';
// import type { ComponentPropsMetaItem } from 'src/types/props';
import type { PropsValue } from 'src/types/component';

let clog = console.log

@Component({
  selector: 'app-props-option',
  templateUrl: './props-option.component.html',
  styleUrls: ['./props-option.component.sass']
})
export class PropsOptionComponent {
  @Input() data!: ConfigItemOption
  @Output() change = new EventEmitter()
  // modelChangeH: F
  labelChangeH: F
  valueChangeH: F
  disabledChangeH: F
  optionsList: ConfigItemOption['template'][] = []
  options: {label: S, value: S}[]
  constructor(private componentService: ComponentService) {
    this.optionsList = []
    // 未使用这个方法
    // todo for delete 2016.02.01+
    // this.modelChangeH = createDebounceFn(() => {
    //   // this.componentService.setProps(this.data.key, this.data.value as unknown as PropsValue)
    //   // this.componentService.reqUpdateComponent('props', this.data.key, this.data.value as unknown as PropsValue)
    //   let v = this.getValue(this.optionsList)
    //   this.componentService.setProps(this.data.key, v)
    //   this.componentService.reqUpdateComponent('props', this.data.key, v)
    //   this.change.emit(v)
    // }, debounceTime)
    this.options = valueType
    this.labelChangeH = createDebounceFn(() => {
      let v = this.getValue(this.optionsList)
      this.componentService.setProps(this.data.key, v)
      this.componentService.reqUpdateComponent('props', this.data.key, v)
      // this.componentService.setProps(this.data.key, this.optionsList as unknown as PropsValue)
      // this.componentService.reqUpdateComponent('props', this.data.key, 
      //   // this.optionsList as unknown as PropsValue
      //   this.getValue(this.optionsList)
      // )
      // this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
      this.change.emit(this.optionsList)
    }, debounceTime)
    this.valueChangeH = createDebounceFn(() => {
      // this.componentService.setProps(this.data.key, this.optionsList as unknown as PropsValue)
      // this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
      let v = this.getValue(this.optionsList)
      this.componentService.setProps(this.data.key, v)
      this.componentService.reqUpdateComponent('props', this.data.key, v)
      this.change.emit(this.optionsList)
    }, debounceTime)
    this.disabledChangeH = createDebounceFn(() => {
      let v = this.getValue(this.optionsList)
      this.componentService.setProps(this.data.key, v)
      this.componentService.reqUpdateComponent('props', this.data.key, v)
      this.change.emit(this.optionsList)
    }, debounceTime)
  }
  getValue(arr: ConfigItemOption['template'][]): PropsValue {
    return arr.map(item => {
      return {
        disabled: item.disabled,
        label: item.label,
        value: item.value,
      }
    })
  }
  ngOnInit() {
    this.optionsList = cloneDeep(this.data.value)
    // clog('this.optionsList', this.optionsList)
  }
  // 检查有必要向上传递吗？
  // 有必要。要在props-box中处理props的显隐逻辑
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
    let v = this.getValue(this.optionsList)
    this.componentService.setProps(this.data.key, v)
    this.componentService.reqUpdateComponent('props', this.data.key, v)
    this.change.emit(this.optionsList)
  }
  deleteIconClickH($event: MouseEvent, i: N) {
    this.optionsList.splice(i, 1)
    let v = this.getValue(this.optionsList)
    this.componentService.setProps(this.data.key, v)
    this.componentService.reqUpdateComponent('props', this.data.key, v)
    this.change.emit(this.optionsList)
  }
  addH() {
    let o = cloneDeep(this.data.template)
    this.optionsList.push(o)
    let v = this.getValue(this.optionsList)
    this.componentService.setProps(this.data.key, v)
    this.componentService.reqUpdateComponent('props', this.data.key, v)
    this.change.emit(this.optionsList)
  }
}
