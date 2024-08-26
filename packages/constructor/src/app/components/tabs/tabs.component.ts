import { Component, Input, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
import { asyncFn, createChildKey, initComponentMeta } from 'src/helper';
import { compatibleArray } from 'src/helper'
import { shareEvent } from 'src/helper';
import { shareEventName } from 'src/helper/config';
import { createKvMap } from 'src/helper/kvMap';
import { ulid } from 'ulid';
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
import type { B, N, S } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { DropEvent } from 'ng-devui';
import type { GridLayoutDefault } from "src/types/component"
import type { CompStackComponent } from '../comp-stack/comp-stack.component';
import type { KvMap } from 'src/helper/kvMap';

let clog = console.log

let gridLayoutDefault: {[k: S]: GridLayoutDefault} = {
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
  slots: Comp['slots']
  ulid: ULID
  items: Comp['items']
  // mount: ComponentMountItems
}

@Component({
  selector: 'app-tabs',
  // standalone: true,
  // imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.sass'
})
export class TabsComponent implements OnInit, AfterViewChecked{
  @Input() data!: TabsData
  compObj: {[k: S]: Comp[]}
  curPage: Page
  createChildKey: typeof createChildKey
  compatibleArray: typeof compatibleArray
  componentList: Comp[]
  kvMap: KvMap<ULID, ULID>
  show: B
  @ViewChild('compStack') compStack!: CompStackComponent
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.compObj = {}
    this.curPage = this.pageService.getCurPage()!
    this.createChildKey = createChildKey
    this.compatibleArray = compatibleArray
    this.componentList = []
    this.kvMap = createKvMap()
    this.show = true
  }
  ngOnInit() {
    this.compObj = {}
    let tree = this.componentService.getTree(this.curPage.ulid)
    if (tree) {
      let node = tree.find(this.data.ulid)
      Object.entries(node?.value.slots || {}).forEach(([k, v]) => {
        let key = createChildKey('slots', k, 'component')
        let childNode = tree.find(v)
        this.compObj[key] = compatibleArray(childNode?.toArray())
      })
    }
    // this.setComponentList('0')
    Array.from(Object.entries(this.data.slots)).forEach(([k, _v], index) => { // 当无子元素时，不运行此回调。
      // this.kvMap.set(k, v)
      this.kvMap.set(String(index), k) // 记录items的下标与slotsKey的对应关系。
    })
    clog('this.kvMap', this.kvMap)
    let activeTab = this.data.props['activeTab']
    let items = this.data.items
    let curIndex = 0
    for(let i = 0; i < items.length; i++) {
      if (items[i]['id'] === activeTab) {
        curIndex = i
        break
      }
    }
    let slotKey = this.kvMap.get(String(curIndex))
    if (slotKey) {
      this.setComponentList(slotKey)
    }
    clog('init', this)
    this.listen()
  }
  listen() {
    shareEvent.listen(shareEventName.TABSAADDITEM, (payload) => {
      clog('shareEventName', payload)
      let u = ulid()
      this.kvMap.set(String(payload.index), u)
      this.componentService.reqAddSlots(u, '')
    })
  }
  ngAfterViewChecked() {
    // clog('AfterViewChecked', this.componentList)
  }
  setComponentList(slotKey: ULID) {
    // let k = this.data.props['activeTab']
    let key = createChildKey('slots', slotKey, 'component')
    this.componentList = compatibleArray(this.compObj[key])
    clog('this.componentList', this.componentList)
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
      // {area: 'slots', slotKey: String(itemIndex)},
      {area: 'slots', slotKey: this.kvMap.get(String(itemIndex))},
      {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
    )
    if (this.compObj[key]?.length) {
      this.compObj[key].push(comp)
    } else {
      this.compObj[key] = [comp]
    }
    this.componentService.mountComponent(this.curPage.ulid, comp)
    this.componentService.reqCreateComponent(comp)
    clog('dropH', comp, this.getChildrenComponent(itemIndex))
    asyncFn(() => {
      this.compStack.init()
    })
  }
  deleteComponentByUlidH(ulid: ULID, index : N) {
    let key = createChildKey('slots', index, 'component')
    this.compObj[key] = this.compObj[key].filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteByUlid(this.curPage.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
    asyncFn(() => {
      this.compStack.init()
    })
  }
  activeTabChangeH() {
    this.show = false
    // todo 改为随机惟一值后再优化
    let activeTab = this.data.props['activeTab']
    let i = 0
    Array.from(Object.entries(this.data.items)).forEach(([k, v], index: N) => {
      if (v['id'] === activeTab) {
        i = index
      }
    })
    this.setComponentList(this.kvMap.get(String(i)))
    asyncFn(() => {
      this.show = true
      // this.compStack.init()
    }, 0)
  }
  // identify(index: number, items: Comp['items']) {
  // identify(index: number) {
  //   clog('identify', index)
  //   return index
  // }
}
