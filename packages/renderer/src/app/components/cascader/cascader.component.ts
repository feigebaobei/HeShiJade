import { Component } from '@angular/core';
import { CascaderModule } from 'ng-devui';
import { MarshalItem } from 'src/helper/marshalItem';
import { CompBase } from 'src/helper/pool';
import type { CascaderItem } from 'ng-devui';
import type { S, Oa, A, } from 'src/types/base';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CascaderItemNew extends CascaderItem {
  key: S,
  parentKey: S,
  children: CascaderItemNew[]
}

let clog = console.log

@Component({
  selector: 'app-cascader',
  standalone: true,
  imports: [
    CascaderModule,
    CommonModule,
    // FormModule,
    FormsModule,
  ],
  templateUrl: './cascader.component.html',
  styleUrl: './cascader.component.sass'
})
export class CascaderComponent extends 
// CompBase 
MarshalItem<CascaderItemNew>
{
  value: S[][]
  constructor() {
    super()
    this.value = []
    // this.menu = []
  }
  // 多选时v是2维数组
  // 单选时v是1维数组
  ngModelChangeH(v: A) {
    this.pool.trigger(this.data.ulid, 'change', this.getLoopEventParams(this.loopIndex, v), this)
  }
  override extraMarshal() {
    // this.value = [['b'], ['a', 'a1']]
    this.value = this.data.props['valueList'].map((item: A) => {
      return item.value.split(',').map((subItem: S) => subItem.trim())
    })
    // [[1, 4, 8], [1, 4, 9, 81], [1, 41]]
    clog('this.value', this.value)
  }
  override washMenuItem(p: Oa): CascaderItemNew {
    return {
      key: p['key'],
      parentKey: p['parentKey'],
      label: p['label'],
      value: p['value'],
      disabled: p['disabled'],
      icon: p['icon'],
      children: [],
    }
  }

}
