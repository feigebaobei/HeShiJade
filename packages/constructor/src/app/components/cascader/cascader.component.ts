import { Component } from '@angular/core';
import { CascaderModule } from 'ng-devui';
import { TextBase } from 'src/helper/text';
import type { CascaderItem } from 'ng-devui';
import { ListenItems } from 'src/helper/ListenItems';
import { A, Oa, S } from 'src/types/base';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import shareEvent, { creatEventName } from 'src/helper/share-event';

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
    // CommonModule, // todo 2026.02.01+ 去掉这个属性
    FormsModule,
  ],
  templateUrl: './cascader.component.html',
  styleUrl: './cascader.component.sass'
})
export class CascaderComponent extends
//  TextBase 
ListenItems<CascaderItemNew>
 {
  // options: CascaderItem[]
  value: S[]
  constructor() {
    super()
    // this.options = []
    this.value = []
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
  listenAll() {
    this.listen()
    // 因这样的props和items改变时舞台区的组件不能用effect+component实现更新，所以使用shareEvent处理。
    shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'props', 'update'), ({key, value}) => {
      switch (key) {
        case 'valueList':
          this.opValue()
          break;
        case 'multiple':
          this.opValue()
          break;
      }
      // clog('value', key, value, this.value)
    })
  }
  opValue() {
    let value = this.data.props['valueList']
    if (this.data.props['multiple']) {
      this.value = value.map((item: A) => {
        return item.value.split(',').map((subItem: S) => subItem.trim())
      })
    } else {
      this.value = value[0].value.split(',').map((subItem: S) => subItem.trim())
    }
  }
  override ngOnInit(): void {
    this.opMenu()
    this.listenAll()
    this.opValue()
  }
}
