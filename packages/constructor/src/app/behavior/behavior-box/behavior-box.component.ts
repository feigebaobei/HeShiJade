import { Component } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { cloneDeep } from 'src/helper/index'
import type { Component as Comp } from 'src/types/component';
import {
  Button as buttonBehaviorMeta,
  Modal as modalBehaviorMeta,
  Form as FormBehaviorMeta,
  Table as TableBehaviorMeta,
} from 'src/helper/behavior'
import type { BehaviorConfigItem } from 'src/types/config'
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
  // componentBehaviorMeta: BehaviorMeta
  componentBehaviorMeta: BehaviorConfigItem
  constructor(private componentService: ComponentService) {
    this.componentBehaviorMeta = {
      event: {
        category: 'select',
        options: [],
        value: '',
        label: '事件',
        key: '',
      },
      target: {
        category: 'input',
        value: '',
        label: '',
        key: '',
      },
      payload: {
        category: 'textarea',
        value: '',
        label: '',
        key: '',
      },
    }
    this.componentBehaviorList = []
    this.componentService.curComponent$.subscribe(p => {
      this.curComp = p
      this.curComponentChange()
    })
  }
  curComponentChange() {
    this.componentBehaviorList = []
    clog('curComponentChange', this.curComp)
    switch (this.curComp?.type) {
      case 'Button':
        this.curComp.behavior.forEach(item => {
          let o = cloneDeep(buttonBehaviorMeta)
          Object.entries(item).forEach(([k, v]) => {
            o[k].value = v
          })
          this.componentBehaviorList.push(o)
        })
        break;
      case 'Modal':
        this.curComp.behavior.forEach(item => {
          let o = cloneDeep(modalBehaviorMeta)
          Object.entries(item).forEach(([k, v]) => {
            o[k].value = v
          })
          this.componentBehaviorList.push(o)
        })
        break;
      case 'Form':
        this.curComp.behavior.forEach(item => {
          let o = cloneDeep(FormBehaviorMeta)
          Object.entries(item).forEach(([k, v]) => {
            o[k].value = v
          })
          this.componentBehaviorList.push(o)
        })
        break;
      case 'Table':
        this.curComp.behavior.forEach(item => {
          let o = cloneDeep(TableBehaviorMeta)
          Object.entries(item).forEach(([k, v]) => {
            o[k].value = v
          })
          this.componentBehaviorList.push(o)
        })
        break;
      }
    clog('curComponentChange componentBehaviorList', this.componentBehaviorList)
  }
}
