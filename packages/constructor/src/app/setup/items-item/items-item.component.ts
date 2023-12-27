import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ItemsDirective } from 'src/app/items.directive';
// type
import type { A, S, Options, } from 'src/types/base';
import type { ComponentItem } from 'src/types/items';
// 组件
import { PropsInputComponent } from '../props-input/props-input.component';

@Component({
  selector: 'app-items-item',
  templateUrl: './items-item.component.html',
  styleUrls: ['./items-item.component.sass']
})
export class ItemsItemComponent implements OnInit {
  @Input() itemsItem!: ComponentItem
  @ViewChild(ItemsDirective, {static: true}) appItems!: ItemsDirective
  items: A[]
  selectOptions: Options<S, S>[]
  formData: {
    category: S,
    key: S,
    label: S,
    value: S,
  }
  constructor() {
    this.items = []
    this.selectOptions = [
      { label: 'input', value: 'input', },
      { label: 'select', value: 'select', },
      { label: 'switch', value: 'switch', },
    ]
    this.formData = {
      category: 'input',
      key: '',
      label: '',
      value: '',
    }
  }
  ngOnInit() {
    let viewContainerRef = this.appItems.viewContainerRef
    viewContainerRef.clear() // 先清空
    let componentRef: A
    switch(this.itemsItem.type) {
      case 'input':
        default:
          componentRef = viewContainerRef.createComponent(PropsInputComponent)
          componentRef.instance.data = this.itemsItem
          break
    }
  }
}
