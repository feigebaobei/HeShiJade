import { Component, Input, OnInit, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
import { asyncFn, createChildKey as cck, initComponentMeta } from 'src/helper';
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
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { ULID } from 'src/types';
import type { A, B, N, S } from 'src/types/base';
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
export class TabsComponent implements OnInit, AfterViewChecked, OnDestroy{
  @Input() data!: TabsData
  compObj: {[k: S]: Comp[]}
  curPage: Page
  // createChildKey: typeof createChildKey
  compatibleArray: typeof compatibleArray
  componentList: Comp[]
  itemIndexSlotKeyMap: KvMap<ULID, ULID>
  show: B
  listenAddItemCb: (p: A) => void
  listenRemoveItemCb: (p: A) => void
  @ViewChild('compStack') compStack!: CompStackComponent
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.compObj = {}
    this.curPage = this.pageService.getCurPage()!
    // this.createChildKey = createChildKey
    this.compatibleArray = compatibleArray
    this.componentList = []
    this.itemIndexSlotKeyMap = createKvMap()
    this.show = true
    this.listenAddItemCb = (payload) => {
      let u = ulid()
      this.itemIndexSlotKeyMap.set(String(payload.index), u)
      // this.data.slots
      clog('listenAddItemCb shareEventName', payload, this.itemIndexSlotKeyMap)
      this.componentService.addSlots(u, '')
      this.componentService.reqAddSlots(u, '')
      clog('add items after', this.data)
    }
    this.listenRemoveItemCb = (payload) => {
      let slotKey = this.itemIndexSlotKeyMap.get(String(payload.index))
      // this.itemIndexSlotKeyMap.delete(String(payload.index))
      this.deleteItemIndexSlotKeyMap({itemIndex: payload.index})
      clog('this.itemIndexSlotKeyMap', this.itemIndexSlotKeyMap)
      let childrenUlid: ULID[] = []
      // 删除slots
      this.componentService.removeSlots(slotKey)
      this.componentService.reqRemoveSlots(slotKey)
      // 删除子组件
      let compList = compatibleArray(this.compObj[this.createChildKey({slotKey})])
      clog('compList', compList)
      compList.forEach(comp => {
        this.componentService.deleteByUlid(this.curPage.ulid, comp.ulid)
        childrenUlid.push(comp.ulid)
        childrenUlid.push(
          ...this.componentService.getChildrenComponent(this.curPage.ulid, comp.ulid).map(component => component.ulid)
        )
      })
      delete this.compObj[this.createChildKey({slotKey})]
      clog('compObj', this.compObj)
      this.componentService.reqDeleteComponent('', childrenUlid)
    }
  }
  ngOnInit() {
    this.compObj = {}
    let tree = this.componentService.getTree(this.curPage.ulid)
    if (tree) {
      let node = tree.find(this.data.ulid)
      Object.entries(node?.value.slots || {}).forEach(([slotKey, v]) => {
        let key = this.createChildKey({slotKey})
        let childNode = tree.find(v)
        this.compObj[key] = compatibleArray(childNode?.toArray())
      })
    }
    Array.from(Object.entries(this.data.slots)).forEach(([k, _v], index) => { // 当无子元素时，不运行此回调。
      this.itemIndexSlotKeyMap.set(String(index), k) // 记录items的下标与slotsKey的对应关系。
      // items的下标就是slots中的顺序
    })
    clog('this.itemIndexSlotKeyMap', this.itemIndexSlotKeyMap)
    // clog('init', this)
    // 开始监听
    this.listen()
    // 设置默认选中的tab对应的子组件列表
    this.selectTab()
  }
  ngOnDestroy(): void {
    shareEvent.off(shareEventName.TABSADDITEM + this.data.ulid, this.listenAddItemCb)
    shareEvent.off(shareEventName.TABSREMOVEITEM + this.data.ulid, this.listenRemoveItemCb)
  }
  listen() {
    shareEvent.on(shareEventName.TABSADDITEM + this.data.ulid, this.listenAddItemCb)
    shareEvent.on(shareEventName.TABSREMOVEITEM + this.data.ulid, this.listenRemoveItemCb)
  }
  createChildKey(p: {slotKey?: ULID, itemIndex?: N}) {
    let k = p.slotKey || this.itemIndexSlotKeyMap.get(String(p.itemIndex)) || ''
    return cck('slots', k, 'component')
  }
  selectTab() {
    new Promise((s, _j) => {
      s(true)
    }).then(() => {
      this.show = false
      let activeTab = this.data.props['activeTab']
      if (activeTab) {
        let index = this.data.items.findIndex(item => item['id'] === activeTab)
        let key = this.itemIndexSlotKeyMap.get(String(index))
        this.setComponentList(key)
      } else {
        this.setComponentList('')
      }
      return !!this.componentList.length
    }).then((b) => {
      asyncFn(() => {
        this.show = b
      })
    })
  }
  ngAfterViewChecked() {
    // clog('AfterViewChecked', this.componentList)
  }
  // todo 可优化为根据item的index、slotsKey
  setComponentList(slotKey: ULID) {
    // let k = this.data.props['activeTab']
    // let key = createChildKey('slots', slotKey, 'component')
    let key = this.createChildKey({slotKey})
    this.componentList = compatibleArray(this.compObj[key])
  }
  dropH(e: DropEvent, itemIndex: N) {
    new Promise((s, _j) => {
      s(true)
    }).then(() => {
      this.show = false
      let comp: Comp
      let key = this.createChildKey({itemIndex})
      let componentCategory = e.dragData.item.componentCategory
      let compGridLayout = gridLayoutDefault[componentCategory]
      // todo 可以优化到initComponentMeta内处理gridLayout
      comp = initComponentMeta(
        componentCategory,
        this.curPage.appUlid, this.curPage.ulid,
        this.compObj[key]?.length ? this.compObj[key][this.compObj[key].length - 1].ulid : '',
        '', this.data.ulid,
        {area: 'slots', slotKey: this.itemIndexSlotKeyMap.get(String(itemIndex))},
        {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
      )
      // 操作compObj / slots
      if (this.compObj[key]?.length) {
        this.compObj[key].push(comp)
      } else {
        this.compObj[key] = [comp]
        // 操作slots
        let slotKey = this.itemIndexSlotKeyMap.get(String(itemIndex))
        this.data.slots[slotKey] = comp.ulid
      }
      this.componentService.mountComponent(this.curPage.ulid, comp)
      this.componentService.reqCreateComponent(comp)
      this.setComponentList(this.itemIndexSlotKeyMap.get(String(itemIndex)))
      return true
    }).then(() => {
      asyncFn(() => {
        this.show = true
        // this.compStack.init()
      })
    })
  }
  deleteComponentByUlidH(ulid: ULID, index : N) {
    new Promise((s, j) => {
      this.show = false
      s(true)
    }).then(() => {
      let key = this.createChildKey({itemIndex: index})
      this.compObj[key] = this.compObj[key].filter(item => item.ulid !== ulid)
      this.componentList = compatibleArray(this.compObj[key])
      let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(componentItem => componentItem.ulid)
      this.componentService.deleteByUlid(this.curPage.ulid, ulid)
      this.componentService.reqDeleteComponent(ulid, childrenUlid)
      return true
    }).then(() => {
      // asyncFn(() => {
        this.show = true
      // })
    })
  }
  activeTabChangeH() {
    new Promise((s, _j) => {
      s(true)
    }).then(() => {
      this.show = false
      // todo 改为随机惟一值后再优化
      let activeTab = this.data.props['activeTab']
      let i = 0
      Array.from(Object.entries(this.data.items)).forEach(([k, v], index: N) => {
        if (v['id'] === activeTab) {
          i = index
        }
      })
      this.setComponentList(this.itemIndexSlotKeyMap.get(String(i)))
      return true
    }).then(() => {
      asyncFn(() => {
        this.show = true
        // this.compStack.init()
      }, 0)
    })
  }
  compStackChangeH(p: ChangeGridLayoutParams) {
    let component = this.componentList.find(component => {
      return component.ulid === p.ulid
    })
    if (component) {
      component.gridLayout.x = p.x
      component.gridLayout.y = p.y
      component.gridLayout.w = p.w
      component.gridLayout.h = p.h
    }
  }
  deleteItemIndexSlotKeyMap(p: {slotKey?: ULID, itemIndex?: N}) {
    let itemLength = this.data.items.length + 1 // 这样才能得到删除前的数量
    if (p.slotKey) {
      let indexStr = this.itemIndexSlotKeyMap.get(p.slotKey)
      this.itemIndexSlotKeyMap.delete(p.slotKey)
      for (let i = Number(indexStr); i < itemLength; i++) {
        this.itemIndexSlotKeyMap.set(String(i), this.itemIndexSlotKeyMap.get(String(i + 1)))
        this.itemIndexSlotKeyMap.delete(String(i))
      }
    } else if (Number(p.itemIndex) > -1) {
      this.itemIndexSlotKeyMap.delete(String(p.itemIndex))
      for(let i = Number(p.itemIndex); i < itemLength; i++) {
        this.itemIndexSlotKeyMap.set(String(i), this.itemIndexSlotKeyMap.get(String(i + 1)))
        this.itemIndexSlotKeyMap.delete(String(i))
      }
    }
  }
}
