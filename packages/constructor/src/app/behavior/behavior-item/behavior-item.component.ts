import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
// import { 
//   // BehaviorMeta,
//    BehaviorItem, } from 'src/types/behavior';
import { B, N, S, } from 'src/types/base';
import type { BehaviorConfigItem } from 'src/types/config';

let clog = console.log

@Component({
  selector: 'app-behavior-item',
  templateUrl: './behavior-item.component.html',
  styleUrls: ['./behavior-item.component.sass']
})
export class BehaviorItemComponent implements OnInit {
  // @Input() behavior!: BehaviorMeta
  @Input() behavior!: BehaviorConfigItem
  @Input() index!: N
  hidePayload: B
  constructor(private componentService: ComponentService) {
    this.hidePayload = false
  }
  ngOnInit() {
    let f = this.behavior.payload.hide
    if (f) {
      this.hidePayload = f(this.behavior)
    }
  }
  eventValueChange(value: S) {
    this.componentService.setComponentsBehavior(this.index, 'event', value)
    // this.componentService.reqUpdateComponentProps('props', this.data.propKey, this.data.value)
    this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'event', value)
  }
  targetInputChangeH(value: S) {
    clog('targetInputChangeH')
    this.componentService.setComponentsBehavior(this.index, 'target', value)
    this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'target', value)
  }
  payloadInputChangeH(value: S) {
    clog('payloadInputChangeH')
    this.componentService.setComponentsBehavior(this.index, 'payload', value)
    this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'payload', value)
  }
}
