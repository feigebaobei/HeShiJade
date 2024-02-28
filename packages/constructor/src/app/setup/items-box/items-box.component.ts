import { Component } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { Form } from 'src/helper/items';
// type
import type {Component as Comp} from 'src/types/component'
import type { B } from 'src/types/base';
import type { ComponentItem } from 'src/types/items';

@Component({
  selector: 'app-items-box',
  templateUrl: './items-box.component.html',
  styleUrls: ['./items-box.component.sass']
})
export class ItemsBoxComponent {
  componentItemsList: ComponentItem[]
  curComp?: Comp | null
  addable: B
  constructor(private componentService: ComponentService) {
    this.componentItemsList = []
    this.curComp = null
    this.addable = false
    this.componentService.compSubject$.subscribe(p => {
      if (p) {
        this.curComp = p
        this.addable = p.item.addable
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
        this.componentItemsList.push(...this.curComp.item.groups)
        break
      default:
        break;
    }
  }
  addButtonClickH() {
    // 日后从service中取
    let o: ComponentItem = {
      category: 'input',
      key: 'name',
      label: '姓名',
      value: 'tom',
    }
    switch (this.curComp?.type) {
      case 'Form':
        o = Form.groupTemplate
        break
      default:
        break
    }
    this.componentItemsList.push(o)
  }
}
