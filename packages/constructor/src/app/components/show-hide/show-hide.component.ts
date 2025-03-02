import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { gridLayoutDefault } from 'src/helper/gridLayout';
import { createChildKey } from 'src/helper/index'
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, S, ULID, O, } from 'src/types/base';
import { DropEvent } from 'ng-devui';
import { asyncFn, initComponentMeta } from 'src/helper';
import type { Page } from 'src/types/page';

let clog = console.log

interface ShowHideData {
  props: Comp['props']
  slots: Comp['slots']
  ulid: ULID
}

@Component({
  selector: 'app-show-hide',
  // standalone: true,
  // imports: [],
  templateUrl: './show-hide.component.html',
  styleUrl: './show-hide.component.sass'
})
export class ShowHideComponent {
  @Input() data!: ShowHideData
  show: B
  curPage: Page
  childComp: Comp | null
  msgs: O[]
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.curPage = this.pageService.getCurPage()!
    this.show = true
    this.childComp = null
    // 只了放置一个子组件
    this.msgs = []
  }
  ngOnInit() {
    let tree = this.componentService.getTree(this.curPage.ulid)
    let node = tree?.find(this.data.ulid)
    let bodyNode = node?.children[createChildKey('slots', 'body', 'node')]
    let arr = bodyNode?.toArray()
    if (arr?.length) {
      this.childComp = arr[0]
    }
  }
  dropH(e: DropEvent) {
    if (this.childComp) {
      this.msgs = [{ severity: 'error', summary: '提示', content: '显隐组件最多有一个子组件。' }]
      return
    }
    asyncFn(() => {
      this.show = false
      return true
    }).then(() => {
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
      return true
    }).then(() => {
      this.show = true
    })
  }
  deleteComponentByUlidH(ulid: ULID) {
    asyncFn(() => {
      this.show = false
      return true
    }).then(() => {
      this.childComp = null
      let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(componentItem => componentItem.ulid)
      this.componentService.deleteComponentByUlid(this.curPage.ulid, ulid)
      this.componentService.reqDeleteComponent(ulid, childrenUlid)
      return true
    }).then(() => {
      this.show = true
    })
  }
}
