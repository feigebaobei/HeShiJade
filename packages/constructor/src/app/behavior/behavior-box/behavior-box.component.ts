import { Component, effect } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { cloneDeep } from 'src/helper/index'
import addableAll from 'src/helper/addable'
import type { Component as Comp } from 'src/types/component';
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
import type { BehaviorConfigItem } from 'src/types/config'
import { B } from 'src/types/base';
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
  constructor(private componentService: ComponentService) {
    this.addable = false
    this.componentBehaviorMeta = {
      event: {
        category: 'select',
        options: [],
        value: '',
        label: '事件',
        key: '',
      },
      fnBody: {
        category: 'textarea',
        value: '',
        label: '',
        key: '',
      },
    }
    this.componentBehaviorList = []
    effect(() => {
      let p = this.componentService.curComponentS.get()
      clog('effect', p)
      if (p) {
        this.curComp = p
        this.curComponentChange()
        this.addable = addableAll[p.type].behavior
      }
    })
  }
  setComponentBehaviorListByType(compBehaviorMeta: BehaviorConfigItem) {
    this.curComp!.behavior.forEach(item => {
      let o = cloneDeep(compBehaviorMeta)
      Object.entries(item).forEach(([k, v]) => {
        if (o.hasOwnProperty(k)) {
          o[k].value = v
        }
      })
      this.componentBehaviorList.push(o)
    })
  }
  curComponentChange() {
    this.componentBehaviorList = []
    // clog('curComponentChange', this.curComp)
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
    let obj: BehaviorConfigItem = {} as BehaviorConfigItem
    if (this.curComp) {
      Object.values(behaviorTemplate[this.curComp.type]).forEach((item) => {
        obj[item.key as unknown as 'event' | 'fnBody'] = cloneDeep(item)
      })
      this.componentBehaviorList.push(obj)
      this.componentService.addBehivorOfCurComponent({
        event: obj.event.value,
        fnBody: obj.fnBody.value,
      })
      // this.componentService.reqAddBehivor({
      //   event: obj.event.value,
      //   fnBody: obj.fnBody.value,
      // })
    }
  }
}
