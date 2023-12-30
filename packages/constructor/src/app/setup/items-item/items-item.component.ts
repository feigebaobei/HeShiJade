import { Component, Input, OnInit, 
  // ViewChild
} from '@angular/core';
// import { ItemsDirective } from 'src/app/items.directive';
import { Form } from 'src/helper/items';
// type
import type { A, S, Options, } from 'src/types/base';
import type { ComponentItem } from 'src/types/items';
// 组件
// import { PropsInputComponent } from '../props-input/props-input.component';

let clog = console.log

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
  items: A[]
  selectOptions: Options<S, S>[]
  // formData: {
  //   category: S,
  //   key: S,
  //   label: S,
  //   value: S,
  // }
  formData: ComponentItem
  constructor() {
    // 收不到传来的数据
    this.items = []
    this.compType = ''
    // this.selectOptions = [ // 默认值
    //   // { label: 'input', value: 'input', },
    //   // { label: 'select', value: 'select', },
    //   // { label: 'switch', value: 'switch', },
    // ]
    this.selectOptions = [] // 默认值
    // clog('itemsItem', this.itemsItem)
    this.formData = this.itemsItem
    // this.formData = null
    // todo 来自itemsItem
    // this.formData = {} as x
    // this.formData = {
    //   category: 'input',
    //   key: '',
    //   label: '',
    //   value: '',
    // }
  }
  ngOnInit() {
    this.formData = this.itemsItem
    clog('items init', this.itemsItem)
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
    switch(this.compType) {
      case 'Form':
        // clog(Form, Form.optionMap?.['category'])
        this.selectOptions = Form.optionMap?.['category'] || []
        // this.formData = Form.
        break
      case 'Table':
        break
      default:
        break
    }
  }
  deleteButtonClickH() {
    clog('deleteButtonClickH')
  }
}
