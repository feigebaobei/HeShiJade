import { Component } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { cloneDeep } from 'src/helper/index'
import type { Component as Comp } from 'src/types/component';
import {
  Button as buttonBehaviorMeta
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
    this.componentBehaviorList = []
    this.componentService.curComponent$.subscribe(p => {
      this.curComp = p
      this.curComponentChange()
    })
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
  }
  curComponentChange() {
    this.componentBehaviorList = []
    switch (this.curComp?.type) {
      case 'Button':
        this.componentBehaviorMeta = buttonBehaviorMeta
        this.curComp.behavior.forEach(item => {
          let o: BehaviorConfigItem
          o = cloneDeep(this.componentBehaviorMeta, {} as BehaviorConfigItem);
          (Object.keys(this.componentBehaviorMeta) as Array<keyof typeof this.componentBehaviorMeta>).forEach((key : (keyof typeof this.componentBehaviorMeta)) => {
            if (item.hasOwnProperty(key)) {
              o[key].value = item[key]
            }
          })
          this.componentBehaviorList.push(o)
        })
        break;
    }
  }
}
