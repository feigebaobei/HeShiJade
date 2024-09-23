import { Component, effect } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { cloneDeep } from 'src/helper/index'
import addableAll from 'src/helper/addable'
import {
  Button as buttonBehaviorMeta,
  Modal as modalBehaviorMeta,
  Form as FormBehaviorMeta,
  Table as TableBehaviorMeta,
  Checkbox as CheckboxBehaviorMeta,
  Tabs as TabsBehaviorMeta,
  Pagination as PaginationBehaviorMeta,
} from 'src/helper/behavior'
import behaviorTemplate from 'src/helper/behavior'
import type { Component as Comp, BehaviorMetaItem } from 'src/types/component';
import type { BehaviorConfigItem } from 'src/types/config'
import type { B, N } from 'src/types/base';
import { PageService } from 'src/app/service/page.service';
// import type { Options, S,
//   //  A, ULID, B, N, 
//   // Options, 
//   B,
//   N,
//   } from "src/types/base"
type keyType = 'event' | 'target' | 'payload'

let clog = console.log

@Component({
  selector: 'app-behavior-box',
  templateUrl: './behavior-box.component.html',
  styleUrls: ['./behavior-box.component.sass']
})
export class BehaviorBoxComponent {
  componentBehaviorList: BehaviorConfigItem[]
  curComp?: Comp | null
  componentBehaviorMeta: BehaviorConfigItem
  addable: B
  constructor(private componentService: ComponentService,
    private pageService: PageService,
  ) {
    this.addable = false
    this.componentBehaviorMeta = [
      {
        category: 'select',
        options: [],
        value: '',
        label: '事件',
        key: '',
      },
      {
        category: 'textarea',
        value: '',
        label: '',
        key: '',
      }
    ]
    this.componentBehaviorList = []
    effect(() => {
      let p = this.componentService.curComponentS.get()
      if (p) {
        this.curComp = p
        this.curComponentChange()
        this.addable = addableAll[p.type].behavior
      }
    })
  }
  setComponentBehaviorListByType(compBehaviorMeta: BehaviorConfigItem) {
    this.curComp!.behavior.forEach(item => {
      let arr: BehaviorConfigItem = cloneDeep(compBehaviorMeta)
      Object.entries(item).forEach(([k, v]) => {
        let o = arr.find(item => item.key === k)
        if (o) {
          o.value = v
        }
        // if (arr.hasOwnProperty(k)) {
        //   arr[k].value = v
        // }
        clog('k', k, v, o)
      })
      this.componentBehaviorList.push(arr)
      clog('this.componentBehaviorList', this.componentBehaviorList)
    })
  }
  curComponentChange() {
    this.componentBehaviorList = []
    switch (this.curComp?.type) {
      case 'Button':
        this.setComponentBehaviorListByType(buttonBehaviorMeta)
        break;
      case 'Modal':
        this.setComponentBehaviorListByType(modalBehaviorMeta)
        break;
      case 'Form':
        this.setComponentBehaviorListByType(FormBehaviorMeta)
        break;
      case 'Table':
        this.setComponentBehaviorListByType(TableBehaviorMeta)
        break;
      case 'Checkbox':
        this.setComponentBehaviorListByType(CheckboxBehaviorMeta)
        break;
      case 'Tabs':
        this.setComponentBehaviorListByType(TabsBehaviorMeta)
        break;
      case 'Pagination':
        this.setComponentBehaviorListByType(PaginationBehaviorMeta)
        break;
      }
  }
  addH() {
    let group: BehaviorConfigItem = [] // as BehaviorConfigItem
    if (this.curComp) {
      Object.values(behaviorTemplate[this.curComp.type]).forEach((item) => {
        // group[group.key as unknown as 'event' | 'fnBody'] = cloneDeep(group)
        group.push(item)
      })
      this.componentBehaviorList.push(group)
      // this.componentService.addBehaviorOfCurComponent({
      //   event: obj.event.value,
      //   fnBody: obj.fnBody.value,
      // })
      // this.componentService.reqAddBehavior({
      //   event: obj.event.value,
      //   fnBody: obj.fnBody.value,
      // })
      let o: BehaviorMetaItem = {}
      group.forEach(item => {
        o[item.key] = item.value
      })
      this.componentService.addBehaviorOfCurComponent(o)
      this.componentService.reqAddBehavior(o)
    }
  }
  removeH(i: N) {
    this.componentBehaviorList.splice(i, 1)
    this.componentService.removeBehaviorOfCurComponent(this.pageService.getCurPage()!.ulid, this.curComp!.ulid, i)
    this.componentService.reqRemoveBehavior(this.curComp!.ulid, i)
  }
}
