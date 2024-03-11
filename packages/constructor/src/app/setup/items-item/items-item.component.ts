import { Component, Input, OnInit, ViewChild, 
} from '@angular/core';
// import { ItemCategoryDirective } from 'src/app/item-category.directive';
import { AdDirective } from 'src/app/ad.directive';
import { ComponentService } from 'src/app/service/component.service';
// toto delete
// import { ItemsDirective } from 'src/app/items.directive';
import { Form } from 'src/helper/items';
// type
import type { A, S, Options, ConfigItem } from 'src/types/base';
// import type { ConfigItem, ComponentItemInput } from 'src/types/items';
// 组件
// import { PropsInputComponent } from '../props-input/props-input.component';
// import { InputComponent } from './input/input.component';
// import { InputComponent } from 'src/app/setup/items-item/input/input.component';
// import { InputComponent } from 'src/app/setup/items-item/item-input.component';
// import { ButtonComponent } from 'src/app/components/button/button.component';
import { ItemInputComponent } from 'src/app/setup/items-item/item-input/item-input.component';
import { ItemNumberComponent } from 'src/app/setup/items-item/item-number/item-number.component';
import { ItemSelectComponent } from 'src/app/setup/items-item/item-select/item-select.component';
import { ItemSwitchComponent } from 'src/app/setup/items-item/item-switch/item-switch.component';

let clog = console.log
let compMap = {
  // input: InputComponent,
  // input: ButtonComponent,
  input: ItemInputComponent,
  number: ItemNumberComponent,
  select: ItemSelectComponent,
  switch: ItemSwitchComponent,
  
}

@Component({
  selector: 'app-items-item',
  templateUrl: './items-item.component.html',
  styleUrls: ['./items-item.component.sass']
})
export class ItemsItemComponent implements OnInit {
  // @Input()
  // set itemsItem(p: ConfigItem) {
  //   this.formData = p
  // }
  // get itemsItem() {
  //   return this.formData
  // }
  @Input() itemsItem: ConfigItem = {
    category: 'input',
    key: '',
    label: '',
    value: '',
  }
  @Input() compType?: S
  // todo delete
  // @ViewChild(ItemsDirective, {static: true}) appItems!: ItemsDirective
  // @ViewChild(ItemCategoryDirective, {static: true}) itemCategoryDirective!: ItemCategoryDirective
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
  items: A[]
  selectOptions: Options<S, S>[]
  // formData: {
  //   category: S,
  //   key: S,
  //   label: S,
  //   value: S,
  // }
  formData: ConfigItem
  constructor(private componentService: ComponentService) {
    this.items = []
    this.compType = ''
    this.selectOptions = [] // 默认值
    this.formData = this.itemsItem
  }
  ngOnInit() {
    let viewContainerRef = this.adHost.viewContainerRef
    viewContainerRef.clear()
    let componentRef: A
    switch (this.itemsItem.category) {
      case 'input':
        // componentRef = viewContainerRef.createComponent(ItemInputComponent)
        componentRef = viewContainerRef.createComponent(compMap['input'])
        componentRef.instance.itemsItem = this.itemsItem
        break;
      case 'number':
        componentRef = viewContainerRef.createComponent(compMap['number'])
        componentRef.instance.itemsItem = this.itemsItem
        break;
      case 'select':
        componentRef = viewContainerRef.createComponent(compMap['select'])
        componentRef.instance.itemsItem = this.itemsItem
        break;
      case 'switch':
        componentRef = viewContainerRef.createComponent(compMap['switch'])
        componentRef.instance.itemsItem = this.itemsItem
        break;
      // case '':
        // break;
    }

  }
  ngOnDestroy() {
    this.adHost.viewContainerRef.clear();
  }
  deleteButtonClickH() {
    clog('deleteButtonClickH')
  }
  // keyInputChangeH() {
  //   this.componentService.setCurComponentItem(this.formData.key, 'key', this.formData.key)
  // }
  // categorySelectChangeH() {
  //   this.componentService.setCurComponentItem(this.formData.key, 'category', this.formData.category)
  // }
  // labelInputChangeH() {
  //   this.componentService.setCurComponentItem(this.formData.key, 'label', this.formData.label)
  // }
  // valueInputChangeH() {
  //   this.componentService.setCurComponentItem(this.formData.key, 'value', (this.formData).value)
  // }
}
