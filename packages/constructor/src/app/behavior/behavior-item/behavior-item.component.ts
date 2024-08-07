// todo 改名为behavior-group
import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { B, F, N, S, } from 'src/types/base';
import type { BehaviorConfigItem } from 'src/types/config';

let clog = console.log
type newBehaviorConfigItem = Required<BehaviorConfigItem>
@Component({
  selector: 'app-behavior-item',
  templateUrl: './behavior-item.component.html',
  styleUrls: ['./behavior-item.component.sass']
})
export class BehaviorItemComponent implements OnInit {
  @Input() behavior!: BehaviorConfigItem
  @Input() index!: N
  eventMap: Map<S, {f: F, targetKey: S}> // todo 抽象为
  itemGroup: newBehaviorConfigItem
  constructor(private componentService: ComponentService) {
    this.eventMap = new Map()
    this.itemGroup = {} as newBehaviorConfigItem
  }
  ngOnInit() {
    this.itemGroup = {
      event: this.behavior.event,
      target: this.behavior.target,
      payload: this.behavior.payload,
    }
    if (this.itemGroup.payload.hide) {
      this.itemGroup.payload.hideCalc = this.itemGroup.payload.hide(this.behavior)
    }
    Array.from(Object.values(this.behavior)).forEach(item => {
      if (item.hideListenerKey) {
        this.eventMap.set(item.hideListenerKey, {
          f: (behaviorObj: BehaviorConfigItem) => {
            let f = item.hide
            if (f) {
              return f(behaviorObj)
            } else {
              return true
            }
          },
          targetKey: item.key
        })
      }
    })
  }
  listenerChange(listenerKey: S, behaviorObj: BehaviorConfigItem) {
    let obj = this.eventMap.get(listenerKey)
    if (obj) {
      this.itemGroup[(obj.targetKey as keyof BehaviorConfigItem)].hideCalc = obj.f(behaviorObj)
    }
  }
  eventValueChange(value: S) {
    this.componentService.setComponentsBehavior(this.index, 'event', value)
    this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'event', value)
  }
  targetInputChangeH(value: S) {
    this.componentService.setComponentsBehavior(this.index, 'target', value)
    this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'target', value)
    // this.behavior.target.value = value
    this.itemGroup.target.value = value
    this.listenerChange('target', this.itemGroup)
  }
  payloadInputChangeH(value: S) {
    this.componentService.setComponentsBehavior(this.index, 'payload', value)
    this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'payload', value)
  }
}
