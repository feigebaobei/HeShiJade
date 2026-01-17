import { Component, Input, ViewChild } from '@angular/core';
import { CompStackComponent } from '../comp-stack/comp-stack.component';
import { AppService } from 'src/app/service/app.service';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
import { gridLayoutDefault } from 'src/helper/gridLayout';
import { asyncFn, createChildKey, initComponentMeta } from 'src/helper';
// type
import type { A, ULID } from 'src/types/base';
import type { ComponentData, Component as Comp } from 'src/types/component';
import { Page } from 'src/types/page';

let clog = console.log

@Component({
  selector: 'app-card',
  // standalone: true,
  // imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})
export class CardComponent {
  @Input() data!: ComponentData
  @ViewChild('compStackBody') compStackBody!: CompStackComponent
  @ViewChild('compStackActions') compStackActions!: CompStackComponent
  childrenBody: Comp[]
  childrenActions: Comp[]
  page: Page
  constructor(
    private appService: AppService,
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.childrenBody = []
    this.childrenActions = []
    this.page = this.pageService.getCurPage()!
  }
  ngOnInit() {
    let tree = this.componentService.getTree(this.page!.ulid)
    if (tree) {
      let node = tree.find(this.data.ulid)
      let bodyNode = node?.children[createChildKey('slots', 'body', 'node')]
      this.childrenBody = bodyNode?.toArray() || []
      let actionsNode = node?.children[createChildKey('slots', 'actions', 'node')]
      this.childrenActions = actionsNode?.toArray() || []
    }
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
    // 请求保存组件的接口
    this.componentService.reqCreateComponent(component).then(() => {
      clog('成功在远端保存组件')
    }).catch((error) => {
      clog('error', error)
    })
    this.compStackBody.init()
  }
  dropActionsH($event: A) {
    let appUlid = this.appService.getCurApp()?.ulid || ''
    let pageUlid = this.pageService.getCurPage()?.ulid || ''
    let componentCategory = $event.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[componentCategory]
    let component = initComponentMeta(
      componentCategory, 
      appUlid, pageUlid, 
      this.childrenActions.length ? this.childrenActions[this.childrenActions.length - 1].ulid : '',
       '', this.data.ulid,
      {area: 'slots', slotKey: 'actions'},
      {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
    )
    this.childrenActions.push(component)
    this.componentService.mountComponent(component)
    this.componentService.reqCreateComponent(component).then(() => {
      clog('成功在远端保存组件')
    }).catch((error) => {
      clog('error', error)
    })
    this.compStackActions.init()
  }
  headerDeleteComponentByUlidH(ulid: ULID) {
    this.childrenBody = this.childrenBody.filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.page.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteComponentByUlid(this.page.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
    asyncFn(() => {
      this.compStackBody.init()
    })
  }
  actionsDeleteComponentByUlidH(ulid: ULID) {
    this.childrenActions = this.childrenActions.filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.page.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteComponentByUlid(this.page.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
    asyncFn(() => {
      this.compStackActions.init()
    })
  }
}
