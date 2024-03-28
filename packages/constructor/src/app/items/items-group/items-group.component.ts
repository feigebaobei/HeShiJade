import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { createDebounceFn } from 'src/helper/index'
// type
import type { A, ConfigItem, N, B, S, Options, ConfigItemSelect, F, } from 'src/types/base';

// interface T {
//   key: 'label' | 'key' | 'value'
//   value: S
// }

@Component({
  selector: 'app-items-group',
  templateUrl: './items-group.component.html',
  styleUrls: ['./items-group.component.sass']
})
export class ItemsGroupComponent {
  @Input() group: ConfigItem[] = []
  @Input() index: N = -1
  // OptionsTemp: Options<S, A>
  reqChangeItems: F
  constructor(private componentService: ComponentService) {
    // let ele: ConfigItemSelect<A> | undefined = this.group.find(item => item.key === 'category') as ConfigItemSelect<A> | undefined
    // if (ele) {
    //   let selectOption = ele?.extend?.select
    //   // if (selectOption) {
    //   //   // this.OptionsTemp = selectOption
    //   // }
    // }
    // this.OptionsTemp = {}
    this.reqChangeItems = createDebounceFn(this.componentService.reqChangeItems, 400, this.componentService)
    // this.timer = 0
  }
  changeH() {

  }
  inputChangeH(p: {
    key: 'label' | 'key' | 'value'
    value: S
  }) {
    // console.log(p)
    this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
    // this.componentService.reqChangeItems(this.index, p.key, p.value)
    this.reqChangeItems(this.index, p.key, p.value)
  }
  selectChangeH(p: {
    key: 'category'
    value: S
  }) {
    this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
    this.reqChangeItems(this.index, p.key, p.value)
  }
  switchChangeH(p: {
    key: 'value'
    value: B
  }) {
    this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
    this.reqChangeItems(this.index, p.key, p.value)
  }
  optionsChangeH(p: {key: 'options', value: Options<S, S>[]}) {
    this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
    this.reqChangeItems(this.index, p.key, p.value)
  }
}
