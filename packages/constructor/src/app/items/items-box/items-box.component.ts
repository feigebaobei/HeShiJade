import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import groupTemplate from 'src/helper/items'
// import * as componentDefaultConfigAll from '../../helper/component'
import addableAll from 'src/helper/addable'
import { cloneDeep, compatibleArray } from 'src/helper/index'
// type
import type { B, ConfigItem, N, S } from 'src/types/base';
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
          // let group: ConfigItem[] = cloneDeep(compatibleArray(groupTemplate[p.type]).map(t => t.show)) // 取出要显示的
          let group = this.groupForConfig(p.type)
          Object.entries(item).forEach(([k, v]) => {
            let gi = group.find(gi => gi.key === k)
            if (gi) {
              gi.value = v
            }
          })
          this.groupList.push(group)
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
      // let group: ConfigItem[] = cloneDeep(groupTemplate[this.curComponent.type])
      let group = this.groupForConfig(this.curComponent.type)
      // clog('group', group)
      this.groupList.push(group)
      let obj: ItemsMetaItem = {} as ItemsMetaItem
      // group.forEach((item) => {
      groupTemplate[this.curComponent.type].forEach((item) => {
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
  groupForConfig(type: S): ConfigItem[] {
    let r = cloneDeep(compatibleArray(groupTemplate[type]).filter(t => !t.hideConfig)) // 取出要显示的
    // clog('groupForConfig', r)
    return r
  }
}
