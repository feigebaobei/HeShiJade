import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';

// type
import type { A, ConfigItem, N, B, S, Options, ConfigItemSelect, } from 'src/types/base';

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
  constructor(private componentService: ComponentService) {
    // let ele: ConfigItemSelect<A> | undefined = this.group.find(item => item.key === 'category') as ConfigItemSelect<A> | undefined
    // if (ele) {
    //   let selectOption = ele?.extend?.select
    //   // if (selectOption) {
    //   //   // this.OptionsTemp = selectOption
    //   // }
    // }
    // this.OptionsTemp = {}
  }
  changeH() {

  }
  // inputChangeH(k: 'label' | 'key' | 'value', v: S) {
  // inputChangeH({
  //   key: 'label' | 'key' | 'value',
  //   v: S
  // }
  //   // k: 'label' | 'key' | 'value', v: S
  //   ) {
  //   this.componentService.setItemsOfCurComponent(this.index, k, v)
  // }
  inputChangeH(p: {
    key: 'label' | 'key' | 'value'
    value: S
  }) {
    console.log(p)
    this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
  }
  selectChangeH(p: {
    key: 'category'
    value: S
  }) {
    this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
  }
  switchChangeH(p: {
    key: 'value'
    value: B
  }) {
    this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
  }
  // optionsChangeH(p: {key: 'options', value: Options<S, S>[]}) {
  //   this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
  // }
}
