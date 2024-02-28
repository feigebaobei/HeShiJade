import { Component, Input, OnInit, ViewChild, 
} from '@angular/core';
// import { ItemCategoryDirective } from 'src/app/item-category.directive';
import { AdDirective } from 'src/app/ad.directive';
import { ComponentService } from 'src/app/service/component.service';
// toto delete
// import { ItemsDirective } from 'src/app/items.directive';
import { Form } from 'src/helper/items';
// type
import type { A, S, Options, } from 'src/types/base';
import type { ComponentItem, ComponentItemInput } from 'src/types/items';
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
  // set itemsItem(p: ComponentItem) {
  //   this.formData = p
  // }
  // get itemsItem() {
  //   return this.formData
  // }
  @Input() itemsItem: ComponentItem = {
    category: '',
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
  formData: ComponentItem
  constructor(private componentService: ComponentService) {
    this.items = []
    this.compType = ''
    this.selectOptions = [] // 默认值
    this.formData = this.itemsItem
  }
  ngOnInit() {
    // this.formData = this.itemsItem
    // clog('items init', this.itemsItem)
    // let viewContainerRef = this.itemCategoryDirective.viewContainerRef
    let viewContainerRef = this.adHost.viewContainerRef
    viewContainerRef.clear()
    let componentRef: A
    // clog('qwertyu', this.itemsItem)
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

    
    // clog('items init a', this.a)
    // todo delete
    // 不使用指令了。
    // let viewContainerRef = this.appItems.viewContainerRef
    // viewContainerRef.clear() // 先清空
    // let componentRef: A
    // switch(this.itemsItem.category) {
    //   case 'input':
    //     default:
    //       componentRef = viewContainerRef.createComponent(PropsInputComponent)
    //       componentRef.instance.data = this.itemsItem
    //       break
    // }
    // todo 日后会把form组件的item抽离为单独的item组件
    // 按组件种类渲染相应的组件
    // let 
    // switch (this.compType) {
    //   case 'Form':
    //     this.selectOptions = Form.optionMap?['category'] || []



    //     break
    //   case 'Table':
    //     break;
    // }
    // switch(this.compType) {
    //   case 'Form':
    //     // clog(Form, Form.optionMap?.['category'])
    //     this.selectOptions = Form.optionMap?.['category'] || []
    //     // this.formData = Form.
    //     break
    //   case 'Table':
    //     break
    //   default:
    //     break
    // }
  }
  ngOnDestroy() {
    // this.itemCategoryDirective.viewContainerRef.clear();
    this.adHost.viewContainerRef.clear();
  }
  deleteButtonClickH() {
    clog('deleteButtonClickH')
  }
  keyInputChangeH() {
    this.componentService.setCurComponentItem(this.formData.key, 'key', this.formData.key)
  }
  categorySelectChangeH() {
    this.componentService.setCurComponentItem(this.formData.key, 'category', this.formData.category)
  }
  labelInputChangeH() {
    // clog('labelInputChangeH', this.formData.label)
    this.componentService.setCurComponentItem(this.formData.key, 'label', this.formData.label)
  }
  valueInputChangeH() {
    this.componentService.setCurComponentItem(this.formData.key, 'value', (this.formData as ComponentItemInput).value)
  }
}
