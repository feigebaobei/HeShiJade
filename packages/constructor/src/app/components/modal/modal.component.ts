import { Component, Input, OnInit, } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { initComponentMeta } from 'src/helper'
import { createChildKey } from 'src/helper/index'
// type
import type { A, ULID } from 'src/types/base';
import type {Component as Comp, 
  ComponentMountItems,
  ComponentMountSlots,} from 'src/types/component'
import { Page } from 'src/types/page';
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
  // curComponent: Comp
  page: Page
  constructor(
    private componentService: ComponentService,
    private pageService: PageService,
    private appService: AppService,
  ) {
    this.childrenHeader = []
    this.childrenBody = [
    ]
    this.childrenFooter = [] // 预留字段
    this.page = this.pageService.getCurPage()!
  }
  ngOnInit() {
    let tree = this.componentService.getTree(this.page!.ulid)
    if (tree) {
      let node = tree.find(this.data.ulid)
      let headerNode = node?.children[createChildKey('slots', 'header', 'node')]
      this.childrenHeader = headerNode?.toArray() || []
      let bodyNode = node?.children[createChildKey('slots', 'body', 'node')]
      this.childrenBody = bodyNode?.toArray() || []
      let footerNode = node?.children[createChildKey('slots', 'footer', 'node')]
      this.childrenFooter = footerNode?.toArray() || []
    }
  }
  dropHeaderH($event: A) {
    let appUlid = this.appService.getCurApp()?.ulid || ''
    let pageUlid = this.pageService.getCurPage()?.ulid || ''
    let component = initComponentMeta(
      $event.dragData.item.componentCategory, 
      appUlid, pageUlid,
      this.childrenHeader.length ? this.childrenHeader[this.childrenHeader.length - 1].ulid : '',
      '', this.data.ulid,
      {area: 'slots', slotKey: 'header'},)
    this.childrenHeader.push(component)
    this.componentService.mountComponent(this.page.ulid, component)
    // 请求保存组件的接口
    this.componentService.reqCreateComponent(component).then(() => {
      clog('成功在远端保存组件')
    }).catch((error) => {
      clog('error', error)
    })
  }
  dropH($event: A) {
    let appUlid = this.appService.getCurApp()?.ulid || ''
    let pageUlid = this.pageService.getCurPage()?.ulid || ''
    let component = initComponentMeta(
      $event.dragData.item.componentCategory, 
      appUlid, pageUlid, 
      this.childrenBody.length ? this.childrenBody[this.childrenBody.length - 1].ulid : '',
       '', this.data.ulid,
      {area: 'slots', slotKey: 'body'})
    this.childrenBody.push(component)
    this.componentService.mountComponent(this.page.ulid, component)
    this.componentService.reqCreateComponent(component).then(() => {
      clog('成功在远端保存组件')
    }).catch((error) => {
      clog('error', error)
    })
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.childrenHeader = this.childrenHeader.filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.page.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteByUlid(this.page.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
  }
  bodyDeleteComponentByUlidH(ulid: ULID) {
    this.childrenBody = this.childrenBody.filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.page.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteByUlid(this.page.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
  }
}
