// todo 改名为behavior-group
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { B, F, N, S,
  ConfigItemSelect,
  ConfigItemTextarea, } from 'src/types/base';
import { createDebounceFn } from 'src/helper/index';
import { debounceTime } from 'src/helper/config';
import { PageService } from 'src/app/service/page.service';
import type { BehaviorConfigGroup } from 'src/types/config';

let clog = console.log
// type newBehaviorConfigItem = Required<BehaviorConfigGroup>
@Component({
  selector: 'app-behavior-group',
  templateUrl: './behavior-group.component.html',
  styleUrls: ['./behavior-group.component.sass']
})
export class BehaviorGroupComponent implements OnInit {
  @Input() behavior!: BehaviorConfigGroup
  @Input() index!: N
  fnBodyTextareatChangeH: F
  eventName: ConfigItemSelect<S>
  fnBodyTextarea: ConfigItemTextarea
  @Output() remove = new EventEmitter()
  constructor(private componentService: ComponentService,
    private pageService: PageService,
  ) {
    this.fnBodyTextareatChangeH = createDebounceFn((v: S) => {
      let c = this.componentService.curComponent()
      let p = this.pageService.getCurPage()
      if (c) {
        this.componentService.setComponentsBehavior(this.index, 'fnBody', v)
        this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'fnBody', v)
      } else if (p) {
        this.pageService.setPageBehavior(this.index, 'fnBody', this.fnBodyTextarea.value)
        this.pageService.reqUpdate(p.ulid, 'behavior', 'fnBody', this.fnBodyTextarea.value, this.index)
      }
    }, debounceTime)
    this.eventName = {} as ConfigItemSelect<S>
    this.fnBodyTextarea = {} as ConfigItemTextarea
  }
  ngOnInit() {
    this.eventName = this.behavior[0] as ConfigItemSelect<S>
    this.fnBodyTextarea = this.behavior[1] as ConfigItemTextarea
  }
  eventValueChange(value: S) {
    let c = this.componentService.curComponent()
    let p = this.pageService.getCurPage()
    if (c) {
      this.componentService.setComponentsBehavior(this.index, 'event', value)
      this.componentService.reqUpdateComponentBehavior('behavior', this.index, 'event', value)
    } else if (p) {
      this.pageService.setPageBehavior(this.index, 'event', value)
      this.pageService.reqUpdate(p.ulid, 'behavior', 'event', value, this.index)
    }
  }
  deleteButtonClickH() {
    this.remove.emit()
  }
}
