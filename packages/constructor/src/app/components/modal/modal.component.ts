import { Component, Input, OnInit, ViewChild, } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { asyncFn, initComponentMeta } from 'src/helper'
import { createChildKey } from 'src/helper/index'
// 数据
import { gridLayoutDefault } from 'src/helper/gridLayout';
// type
import type { A, ULID } from 'src/types/base';
import type {Component as Comp, } from 'src/types/component'
import type { Page } from 'src/types/page';
import type { CompStackComponent } from '../comp-stack/comp-stack.component';
import { TextBase } from 'src/helper/text';

let clog = console.log

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent extends TextBase implements OnInit{
  // @Input() data: A
  childrenHeader: Comp[]
  childrenBody: Comp[]
  childrenFooter: Comp[]
  // curComponent: Comp
  page: Page
  @ViewChild('compStackHeader') compStackHeader!: CompStackComponent
  @ViewChild('compStackBody') compStackBody!: CompStackComponent
  constructor(
    private componentService: ComponentService,
    private pageService: PageService,
    private appService: AppService,
  ) {
    super()
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
    this.listen()
  }
  listen() {
    // shareEvent.on(creatEventName('Modal', this.data.ulid, 'items', 'add'), () => {
    // })
    // shareEvent.on(creatEventName('Modal', this.data.ulid, 'items', 'remove'), () => {
    // })
    // shareEvent.on(creatEventName('Modal', this.data.ulid, 'items', 'update'), () => {
    // })
    // shareEvent.on(creatEventName('Modal', this.data.ulid, 'items', 'reorder'), () => {
    // })
  }
  dropHeaderH($event: A) {
    let appUlid = this.appService.getCurApp()?.ulid || ''
    let pageUlid = this.pageService.getCurPage()?.ulid || ''
    let componentCategory = $event.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[componentCategory]
    let component = initComponentMeta(
      componentCategory, 
      appUlid, pageUlid,
      this.childrenHeader.length ? this.childrenHeader[this.childrenHeader.length - 1].ulid : '',
      '', this.data.ulid,
      {area: 'slots', slotKey: 'header'},
      {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
    )
    this.childrenHeader.push(component)
    this.componentService.mountComponent(component)
    // 请求保存组件的接口
    this.componentService.reqCreateComponent(component).then(() => {
      clog('成功在远端保存组件')
    }).catch((error) => {
      clog('error', error)
    })
    this.compStackHeader.init()
  }
  dropBodyH($event: A) {
    let appUlid = this.appService.getCurApp()?.ulid || ''
    let pageUlid = this.pageService.getCurPage()?.ulid || ''
    let componentCategory = $event.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[componentCategory]
    let component = initComponentMeta(
      componentCategory, 
      appUlid, pageUlid, 
      this.childrenBody.length ? this.childrenBody[this.childrenBody.length - 1].ulid : '',
       '', this.data.ulid,
      {area: 'slots', slotKey: 'body'},
      {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
    )
    this.childrenBody.push(component)
    this.componentService.mountComponent(component)
    this.componentService.reqCreateComponent(component).then(() => {
      clog('成功在远端保存组件')
    }).catch((error) => {
      clog('error', error)
    })
    this.compStackBody.init()
  }
  headerDeleteComponentByUlidH(ulid: ULID) {
    this.childrenHeader = this.childrenHeader.filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.page.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteComponentByUlid(this.page.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
    asyncFn(() => {
      this.compStackHeader.init()
    })
  }
  bodyDeleteComponentByUlidH(ulid: ULID) {
    this.childrenBody = this.childrenBody.filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.page.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteComponentByUlid(this.page.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
    asyncFn(() => {
      this.compStackBody.init()
    })
  }
}
