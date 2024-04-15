// 删除此组件 2024.05.15+
import { Component } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { Form, 
  // Button
 } from 'src/helper/items';
import addable from 'src/helper/addable'
// type
import type {Component as Comp} from 'src/types/component'
import type { B, ConfigItem } from 'src/types/base';
// let addable: {[k: S]: } = {
//   Button: ButtonAddable,
//   Form: FormAddable,
// }

let clog = console.log

@Component({
  selector: 'app-items-box',
  templateUrl: './items-box.component.html',
  styleUrls: ['./items-box.component.sass']
})
export class ItemsBoxComponent {
  componentItemsList: ConfigItem[]
  curComp: Comp //| null
  addable: B
  constructor(private componentService: ComponentService) {
    this.componentItemsList = []
    this.curComp = {} as Comp
    this.addable = false
    this.componentService.curComponent$.subscribe(p => {
      if (p) {
        this.curComp = p
        this.addable = addable[p.type].items
      }
      this.componentSelectedChange()
    })
  }
  componentSelectedChange() {
    // 先清空
    this.componentItemsList = []
    // 再赋值
    switch (this.curComp?.type) {
      case 'Form':
        this.curComp.items.forEach((obj) => {
          let o = JSON.parse(JSON.stringify(Form))
          Object.keys(o).forEach((k) => {
            o[k] = obj[k]
          })
          this.componentItemsList.push(o)
        })
        break
      default:
        break;
    }
    clog('componentItemsList', this.componentItemsList)
  }
  addButtonClickH() {
    // 日后从service中取
    let o: ConfigItem = {
      category: 'input',
      key: '',
      label: '',
      value: '',
    }
    switch (this.curComp.type) {
      case 'Form':
        o = JSON.parse(JSON.stringify(Form))
        break
      default:
        break
    }
    this.componentItemsList.push(o)
  }
}
