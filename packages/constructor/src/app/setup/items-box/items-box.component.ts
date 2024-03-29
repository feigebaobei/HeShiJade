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
  // componentItemsList: ComponentItem[]
  componentItemsList: ConfigItem[]
  curComp: Comp //| null
  addable: B
  constructor(private componentService: ComponentService) {
    this.componentItemsList = []
    // this.curComp = null
    this.curComp = {} as Comp
    this.addable = false
    this.componentService.compSubject$.subscribe(p => {
      if (p) {
        this.curComp = p
        // this.addable = p.items.addable
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
        //   let o: ConfigItem
        // this.curComp.items.forEach((obj: ConfigItem) => {
        //   o = JSON.parse(JSON.stringify(Form))
        //   o.value = obj.value
        //   o.key = obj.key
        //   o.category = obj.category
        //   o.label = obj.label
        //   this.componentItemsList.push(o)
        // })

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
    // this.componentItemsList[index]
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
        // o = Form.groupTemplate
        o = JSON.parse(JSON.stringify(Form))
        break
      default:
        break
    }
    this.componentItemsList.push(o)
  }
}
