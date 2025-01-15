import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { debounceTime } from 'src/helper/config';
import { createDebounceFn } from 'src/helper/index'
import { cloneDeep } from 'src/helper/index';
// type
import type { N, ConfigItmeOption, F, S, A, } from 'src/types/base';
// import type { ComponentPropsMetaItem } from 'src/types/props';
import type { PropsValue } from 'src/types/component';

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
  constructor(private componentService: ComponentService) {
    this.optionsList = []
    this.modelChangeH = createDebounceFn((v: S) => {
      this.componentService.setComponentProp(this.data.key, this.data.value as unknown as PropsValue)
      this.componentService.reqUpdateComponent('props', this.data.key, this.data.value as unknown as PropsValue)
      this.change.emit(v)
    }, debounceTime)
  }
  ngOnInit() {
    this.optionsList = cloneDeep(this.data.value)
  }
  // todo 去抖
  labelChangeH(v: S, index: N) {
    this.componentService.setComponentProp(this.data.key, this.optionsList as unknown as PropsValue)
    this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
    this.change.emit(this.optionsList)
  }
  valueChangeH(index: N) {
    this.componentService.setComponentProp(this.data.key, this.optionsList as unknown as PropsValue)
    this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
    this.change.emit(this.optionsList)
  }
  addH() {
    let o = JSON.parse(JSON.stringify(this.data.template))
    this.optionsList.push(o)
    this.componentService.setComponentProp(this.data.key, this.optionsList as unknown as PropsValue)
    this.componentService.reqUpdateComponent('props', this.data.key, this.optionsList as unknown as PropsValue)
    this.change.emit(this.optionsList)
  }
}
