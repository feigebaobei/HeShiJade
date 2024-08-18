import { Component, Input, OnInit } from '@angular/core';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
import { createChildKey, initComponentMeta } from 'src/helper';
import { compatibleArray } from 'src/helper'

// 数据
import {
  Button as gridLayoutButtonDefault,
  Modal as gridLayoutModalDefault,
  Form as gridLayoutFormDefault,
  Table as gridLayoutTableDefault,
  Input as gridLayoutInputDefault,
  Select as gridLayoutSelectDefault,
  Icon as gridLayoutIconDefault,
  Checkbox as gridLayoutCheckboxDefault,
  Tabs as gridLayoutTabsDefault,
  Pagination as gridLayoutPaginationDefault,
} from 'src/helper/gridLayout'

// type
import type { Component as Comp, ComponentMountItems } from 'src/types/component';
import type { ULID } from 'src/types';
import type { N, S } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { DropEvent } from 'ng-devui';
let gridLayoutDefault: {[k: S]: {w: N, h: N}} = {
  Button: gridLayoutButtonDefault,
  Modal: gridLayoutModalDefault,
  Form: gridLayoutFormDefault,
  Table: gridLayoutTableDefault,
  Input: gridLayoutInputDefault,
  Select: gridLayoutSelectDefault,
  Icon: gridLayoutIconDefault,
  Checkbox: gridLayoutCheckboxDefault,
  Tabs: gridLayoutTabsDefault,
  Pagination: gridLayoutPaginationDefault,
}
interface TabsData {
  props: Comp['props']
  items: Comp['items']
  ulid: ULID
  // mount: ComponentMountItems
}

@Component({
  selector: 'app-tabs',
  // standalone: true,
  // imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.sass'
})
export class TabsComponent implements OnInit{
  @Input() data!: TabsData
  compObj: {[k: S]: Comp[]}
  curPage: Page
  createChildKey: typeof createChildKey
  compatibleArray: typeof compatibleArray
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.compObj = {}
    this.curPage = this.pageService.getCurPage()!
    this.createChildKey = createChildKey
    this.compatibleArray = compatibleArray
  }
  ngOnInit() {
    this.compObj = {}
    let tree = this.componentService.getTree(this.curPage.ulid)
    if (tree) {
      let node = tree.find(this.data.ulid)
      Object.entries(node?.value.slots || {}).forEach(([k, v]) => {
        let key = createChildKey('slots', k, 'component')
        let childNode = tree.find(v)!
        this.compObj[key] = childNode.toArray()
      })
    }
  }
  getChildrenComponent(itemIndex: N | S) {
    let key = createChildKey('slots', itemIndex, 'component')
    return this.compObj[key] || []
  }
  dropH(e: DropEvent, itemIndex: N) {
    let comp: Comp
    // 因items的id会变。index不会变。所以使用index为key.
    let key = createChildKey('slots', itemIndex, 'component')
    let componentCategory = e.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[componentCategory]
    comp = initComponentMeta(
      componentCategory,
      this.curPage.appUlid, this.curPage.ulid,
      this.compObj[key]?.length ? this.compObj[key][this.compObj[key].length - 1].ulid : '',
      '', this.data.ulid,
      {area: 'slots', slotKey: String(itemIndex)},
      {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h},
    )
    if (this.compObj[key]?.length) {
      this.compObj[key].push(comp)
    } else {
      this.compObj[key] = [comp]
    }
    this.componentService.mountComponent(this.curPage.ulid, comp)
    this.componentService.reqCreateComponent(comp)
  }
  deleteComponentByUlidH(ulid: ULID, index : N) {
    let key = createChildKey('slots', index, 'component')
    this.compObj[key] = this.compObj[key].filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteByUlid(this.curPage.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
  }
}
