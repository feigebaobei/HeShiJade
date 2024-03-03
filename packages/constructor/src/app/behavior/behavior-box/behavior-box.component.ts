import { Component } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import type { Component as Comp } from 'src/types/component';
import {
  Button as buttonBehaviorMeta
} from 'src/helper/behavior'
import { BehaviorMeta, BehaviorItem } from 'src/types/behavior';
// import type { Options, S,
//   //  A, ULID, B, N, 
//   // Options, 
//   B,
//   N,
//   } from "src/types/base"
type keyType = 'event' | 'target' | 'payload'

@Component({
  selector: 'app-behavior-box',
  templateUrl: './behavior-box.component.html',
  styleUrls: ['./behavior-box.component.sass']
})
export class BehaviorBoxComponent {
  componentBehaviorList: BehaviorItem[]
  curComp?: Comp | null
  // componentBehaviorMeta: BehaviorMeta
  componentBehaviorMeta: BehaviorItem
  constructor(private componentService: ComponentService) {
    this.componentBehaviorList = []
    this.componentService.compSubject$.subscribe(p => {
      this.curComp = p
      this.curComponentChange()
    })
    this.componentBehaviorMeta = {
      event: {
        type: 'select',
        options: [],
        value: '',
        label: '事件',
      },
      target: {
        type: 'input',
        value: ''
      },
      payload: {
        type: 'textarea',
        value: '',
      },
    }
  }
  curComponentChange() {
    this.componentBehaviorList = []
    switch (this.curComp?.type) {
      case 'Button':
        this.componentBehaviorMeta = buttonBehaviorMeta
        this.curComp.behavior.groups.forEach(item => {
          // let arr: keyType[] = Object.keys(this.componentBehaviorMeta) as Array<keyof typeof this.componentBehaviorMeta>
          let o: BehaviorItem // = {...this.componentBehaviorMeta}
          // o = {...this.componentBehaviorMeta}
          o = JSON.parse(JSON.stringify(this.componentBehaviorMeta))
          (Object.keys(this.componentBehaviorMeta) as Array<keyof typeof this.componentBehaviorMeta>).forEach((key : (keyof typeof this.componentBehaviorMeta)) => {
            // switch (key) {
            //   case 'event': 
            //     break
            // }
            // let o = {
            //   ...this.componentBehaviorMeta[key],
            //   value: item[key],
            // }
            // this.componentBehaviorList.push(o)
            // o = {

            // }
            // o[key] = this.componentBehaviorMeta[key]
            o[key].value = item[key]
          })
          this.componentBehaviorList.push(o)
        })
        break;
    }
  }
}
