// todo 改名为behavior-group
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { B, F, N, S,
  ConfigItemSelect,
  ConfigItemTextarea, } from 'src/types/base';
import { createDebounceFn } from 'src/helper/index';
import { debounceTime } from 'src/helper/config';
import type { BehaviorConfigGroup } from 'src/types/config';

let clog = console.log
// type newBehaviorConfigItem = Required<BehaviorConfigGroup>
@Component({
  selector: 'app-behavior-item',
  templateUrl: './behavior-item.component.html',
  styleUrls: ['./behavior-item.component.sass']
})
export class BehaviorItemComponent implements OnInit {
  @Input() behavior!: BehaviorConfigGroup
  @Input() index!: N
  fnBodyTextareatChangeH: F
  eventName: ConfigItemSelect<S>
  fnBodyTextarea: ConfigItemTextarea
  @Output() remove = new EventEmitter()
  constructor(private componentService: ComponentService) {
    this.fnBodyTextareatChangeH = createDebounceFn((v: S) => {
      this.componentService.setComponentsBehavior(this.index, 'fnBody', v)
      this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'fnBody', v)
    }, debounceTime)
    this.eventName = {} as ConfigItemSelect<S>
    this.fnBodyTextarea = {} as ConfigItemTextarea
  }
  ngOnInit() {
    this.eventName = this.behavior[0] as ConfigItemSelect<S>
    this.fnBodyTextarea = this.behavior[1] as ConfigItemTextarea
  }
  eventValueChange(value: S) {
    this.componentService.setComponentsBehavior(this.index, 'event', value)
    this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'event', value)
  }
  deleteButtonClickH() {
    this.remove.emit()
  }
}
