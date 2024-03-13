import { Component } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { Form, Button } from 'src/helper/items';
import addable from 'src/helper/addable'
// type
import type {Component as Comp} from 'src/types/component'
import type { B, ConfigItem } from 'src/types/base';
// let addable: {[k: S]: } = {
//   Button: ButtonAddable,
//   Form: FormAddable,
// }

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
        // this.componentItemsList.push(...this.curComp.items.groups)
        // this.componentItemsList.push(...this.curComp.items)
        break
      case 'Button':
        let o: ConfigItem = JSON.parse(JSON.stringify(Button))
        this.curComp.items.forEach(obj => {
          o.value = obj.value
          this.componentItemsList.push(o)
        })
        break;
      default:
        break;
    }
    // this.componentItemsList[index]
  }
  addButtonClickH() {
    // 日后从service中取
    let o: ConfigItem = {
      category: 'input',
      key: 'name',
      label: '姓名',
      value: 'tom',
    }
    switch (this.curComp?.type) {
      case 'Form':
        // o = Form.groupTemplate
        o = Form
        break
      default:
        break
    }
    this.componentItemsList.push(o)
  }
}
