import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { BehaviorMeta, BehaviorItem, } from 'src/types/behavior';
import { N, S } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-behavior-item',
  templateUrl: './behavior-item.component.html',
  styleUrls: ['./behavior-item.component.sass']
})
export class BehaviorItemComponent {
  // @Input() behavior!: BehaviorMeta
  @Input() behavior!: BehaviorItem
  @Input() index!: N
  constructor(private componentService: ComponentService) {
    
  }
  eventValueChange(value: S) {
    this.componentService.setComponentsBehavior('behavior', this.index, 'event', value)
  }
  targetInputChangeH(value: S) {
    clog('targetInputChangeH')
    this.componentService.setComponentsBehavior('behavior', this.index, 'target', value)
  }
  payloadInputChangeH(value: S) {
    clog('payloadInputChangeH')
    this.componentService.setComponentsBehavior('behavior', this.index, 'payload', value)
  }
}
