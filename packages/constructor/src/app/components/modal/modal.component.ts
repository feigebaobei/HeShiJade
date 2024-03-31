import { Component, Input, OnInit, } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { initComponentMeta } from 'src/helper'
// type
import { A } from 'src/types/base';
import type {Component as Comp} from 'src/types/component'
let clog = console.log


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit{
  @Input() data: A
  childrenHeader: Comp[]
  childrenBody: Comp[]
  childrenFooter: Comp[]
  constructor(
    private componentService: ComponentService,
    private pageService: PageService,
    private appService: AppService,
  ) {
    this.childrenHeader = []
    this.childrenBody = []
    this.childrenFooter = []
  }
  ngOnInit() {
    
  }
  dropH($event: A) {
    clog('dropH', $event, this.data.ulid)
    // 插入组件
    let p = this.componentService.curComponent()
    clog('p', p)
    if (p) {
      let appUlid = this.appService.getCurApp()?.ulid || ''
      let pageUlid = this.pageService.getCurPage()?.ulid || ''
      let c = initComponentMeta($event.dragData.item.componentCategory, appUlid, pageUlid)
      // 添加用于渲染的组件的数组中
      this.childrenBody.push(c)
      // 添加到链表中
      // 添加到数据库中
    }
  }
}
