import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import groupTemplate from 'src/helper/items'
// import * as componentDefaultConfigAll from '../../helper/component'
import addableAll from 'src/helper/addable'
import { cloneDeep } from 'src/helper/index'
// type
import type { B, ConfigItem, N } from 'src/types/base';
import type { Component as Comp, ItemsMeta, ItemsMetaItem
 } from 'src/types/component';

let clog = console.log


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
    this.groupList = []
    this.componentService.curComponent$.subscribe(p => {
      if (p) {
        this.curComponent = p
        this.groupList = []
        p.items.forEach(item => {
          // let group = JSON.parse(JSON.stringify(groupTemplate[p.type])) as ConfigItem[]
          let group = cloneDeep(groupTemplate[p.type], [] as ConfigItem[])
          Object.entries(item).forEach(([k, v]) => {
            let gi = group.find(gi => gi.key === k)
            if (gi) {
              gi.value = v
            }
          })
          this.groupList.push(group)
          clog('thislgroplist', this.groupList)
        })
        this.addable = addableAll[p.type].items
      } else {
        this.curComponent = null
        this.groupList = []
      }
    })
  }
  addH() {
    if (this.curComponent) {
      // let group = JSON.parse(JSON.stringify(groupTemplate[this.curComponent.type])) as ConfigItem[]
      let group = cloneDeep(groupTemplate[this.curComponent.type], [] as ConfigItem[])
      // clog('group', group)
      this.groupList.push(group)
      let obj: ItemsMetaItem = {} as ItemsMetaItem
      group.forEach((item) => {
        let k: keyof ItemsMetaItem = item.key as unknown as keyof ItemsMetaItem
        obj[k] = item.value
      })
      this.componentService.addItemsOfCurComponent(obj)
      this.componentService.reqAddItems(obj)
    }
  }
  removeH(i: N) {
    this.componentService.removeItemsOfCurComponent(i)
  }
}
