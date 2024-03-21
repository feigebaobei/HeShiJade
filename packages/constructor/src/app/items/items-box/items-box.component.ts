import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import groupTemplate from 'src/helper/items'
// import * as componentDefaultConfigAll from '../../helper/component'
// type
import type { B, ConfigItem, N } from 'src/types/base';
import type { Component as Comp, ItemsMeta } from 'src/types/component';

@Component({
  selector: 'app-items-box',
  templateUrl: './items-box.component.html',
  styleUrls: ['./items-box.component.sass']
})
export class ItemsBoxComponent {
  // @Input() Items: Comp['items'] = []
  addable: B = false
  groupList: ConfigItem[][] = []
  curComponent: Comp | null = null
  constructor(private componentService: ComponentService) {
    this.componentService.compSubject$.subscribe(p => {
      if (p) {
        this.curComponent = p
        let group = JSON.parse(JSON.stringify(groupTemplate[p.type])) as ConfigItem[]
        p.items.forEach(item => {
          // Object.entries(item).forEach(([k: 'category' | 'label' | 'key' | 'value', v]) => {
          Object.entries(item).forEach(([k, v]) => {
            let gi = group.find(gi => gi.key === k)
            if (gi) {
              gi.value = v
            }
          })
        })
        this.groupList.push(group)
      } else {
        this.curComponent = null
      }
    })
  }
  addH() {
    if (this.curComponent) {
      let group = JSON.parse(JSON.stringify(groupTemplate[this.curComponent.type]))
      this.groupList.push(group)
    }
  }
  removeH(i: N) {
    this.componentService.removeItemsOfCurComponent(i)
  }
}
