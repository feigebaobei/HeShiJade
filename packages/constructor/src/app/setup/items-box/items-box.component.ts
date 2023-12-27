import { Component } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
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
    this.addable = true // todo 日后从service中取
    this.componentService.compSubject$.subscribe(p => {
      this.curComp = p
      this.componentSelectedChange()
    })
  }
  componentSelectedChange() {
    // 先清空
    this.componentItemsList = []
    // 再赋值
    switch (this.curComp?.type) {
      case 'Form':
        // 日后从service中取
        let o: ComponentItem = {
          type: 'input',
          key: 'name',
          label: '姓名',
          value: 'tom',
        }
        this.componentItemsList.push(o)
        break
      default:
        break;
    }
  }
  addButtonClickH() {
    // 日后从service中取
    let o: ComponentItem = {
      type: 'input',
      key: 'name',
      label: '姓名',
      value: 'tom',
    }
    this.componentItemsList.push(o)
  }
}
