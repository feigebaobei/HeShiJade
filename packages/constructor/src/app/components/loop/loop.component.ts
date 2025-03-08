import { Component, Input, } from '@angular/core';
import { gridLayoutDefault } from 'src/helper/gridLayout';
import { createChildKey } from 'src/helper/index'
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, S, ULID, O, } from 'src/types/base';
import type { DropEvent } from 'ng-devui';
import { initComponentMeta } from 'src/helper';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
import { Page } from 'src/types/page';

interface LoopData {
  props: Comp['props']
  slots: Comp['slots']
  ulid: ULID
}

@Component({
  selector: 'app-loop',
  // standalone: true,
  // imports: [],
  templateUrl: './loop.component.html',
  styleUrl: './loop.component.sass'
})
export class LoopComponent {
  @Input() data!: LoopData
  childComp: Comp | null
  curPage: Page
  msgs: O[]
  mockArr: N[]
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.childComp = null
    this.curPage = this.pageService.getCurPage()!
    this.msgs = []
    this.mockArr = []
  }
  dropH(e: DropEvent) {
    if (this.childComp) {
      this.msgs = [{ severity: 'error', summary: '提示', content: '循环组件最多有一种子组件。' }]
      return
    }
    let componentCategory = e.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[componentCategory]
    this.childComp = initComponentMeta(
      componentCategory,
      this.curPage.appUlid, this.curPage.ulid,
      '',
      '', this.data.ulid,
      { area: 'slots', slotKey: 'body' },
      { x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize },
    )
    this.componentService.mountComponent(this.childComp)
    this.componentService.reqCreateComponent(this.childComp)
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.childComp = null
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteComponentByUlid(this.curPage.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
  }
  ngOnInit() {
    let tree = this.componentService.getTree(this.curPage.ulid)
    let node = tree?.find(this.data.ulid)
    let bodyNode = node?.children[createChildKey('slots', 'body', 'node')]
    let arr = bodyNode?.toArray()
    if (arr?.length) {
      this.childComp = arr[0]
    }
    this.mockArr = new Array(this.data.props['mockCount'] || 1).fill(1)
  }
}
