import { Component, effect } from '@angular/core';
import { DropEvent } from 'ng-devui';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { clog, createChildKey, initComponentMeta } from 'src/helper';
import { gridLayoutDefault } from 'src/helper/gridLayout';
import shareEvent, { creatEventName } from 'src/helper/share-event';
import { TextBase } from 'src/helper/text';
import { A, N, O, ULID } from 'src/types/base';
// type
import type { Component as Comp } from 'src/types/component';
import { Page } from 'src/types/page';

@Component({
  selector: 'app-badge',
  // standalone: true,
  // imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.sass'
})
export class BadgeComponent extends TextBase {
  childComp: Comp | null
  curPage: Page
  curComponent: Comp | undefined
  offset: [N, N]
  constructor(
    private componentService: ComponentService,
    private pageService: PageService,
  ) {
    super()
    this.childComp = null
    this.curPage = this.pageService.getCurPage()!
    this.offset = [0, 0]
    effect(() => {
      this.curComponent = this.componentService.curComponentS.get()
    })
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.childComp = null
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteComponentByUlid(this.curPage.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
  }
  dropH(e: DropEvent) {
    if (this.childComp) {
      // this.msgs = [{ severity: 'error', summary: '提示', content: 'Badge组件最多有一个子组件。' }]
      return
    }
    let componentCategory = e.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[componentCategory]
    let component = initComponentMeta(
      componentCategory,
      this.curPage.appUlid, this.curPage.ulid,
      '',
      '', this.data.ulid,
      { area: 'slots', slotKey: 'body' },
      { x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize },
    )
    this.childComp = component
    this.componentService.mountComponent(component)
    this.componentService.reqCreateComponent(component)
  }
  subCompClickH($event: MouseEvent, item: Comp) {
    $event.stopPropagation()
    let curPage = this.pageService.getCurPage()
    if (curPage) {
      if (this.curComponent) {
        if (item.ulid !== this.curComponent.ulid) {
          this.componentService.setCurComponent(curPage.ulid, item.ulid)
        }
      } else {
        this.componentService.setCurComponent(curPage.ulid, item.ulid)
      }
    }
  }
  initOffset() {
    this.offset = this.data.props['offset'].map((item: A) => item.value)
  }
  ngOnInit() {
    let tree = this.componentService.getTree(this.curPage.ulid)
    let node = tree?.find(this.data.ulid)
    let bodyNode = node?.children[createChildKey('slots', 'body', 'node')]
    let arr = bodyNode?.toArray()
    if (arr?.length) {
      this.childComp = arr[0]
    }
    this.initOffset()
    shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'props', 'update'), ({key, value}) => {
      switch (key) {
        case 'offset':
          this.initOffset()
          break;
      }
    })
  }
}
