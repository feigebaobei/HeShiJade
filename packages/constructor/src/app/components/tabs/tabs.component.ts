import { Component, Input, OnInit, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
import { asyncFn, createChildKey as cck, initComponentMeta } from 'src/helper';
import { compatibleArray } from 'src/helper'
import { createKvMap } from 'src/helper/kvMap';
import {shareEvent, creatEventName} from 'src/helper/share-event';
import { gridLayoutDefault } from 'src/helper/gridLayout';
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, S, ULID } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { DropEvent } from 'ng-devui';
import type { CompStackComponent } from '../comp-stack/comp-stack.component';
import type { KvMap } from 'src/helper/kvMap';
import { TextBase } from 'src/helper/text';

let clog = console.log

interface TabsData {
  props: Comp['props']
  slots: Comp['slots']
  ulid: ULID
  items: Comp['items']
}

@Component({
  selector: 'app-tabs',
  // standalone: true,
  // imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.sass'
})
export class TabsComponent extends TextBase implements OnInit, AfterViewChecked, OnDestroy{
  @Input() data!: TabsData
  compObj: {[k: S]: Comp[]}
  compArr: Comp[][]
  curPage: Page
  compatibleArray: typeof compatibleArray
  itemIndexSlotKeyMap: KvMap<ULID, ULID>
  show: B
  @ViewChild('compStack') compStack!: CompStackComponent
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    super()
    this.compObj = {}
    this.compArr = []
    this.curPage = this.pageService.getCurPage()!
    this.compatibleArray = compatibleArray
    this.itemIndexSlotKeyMap = createKvMap()
    this.show = true
  }
  createChildKey(p: {slotKey?: ULID, itemIndex?: N}) {
    let k = p.slotKey || this.itemIndexSlotKeyMap.get(String(p.itemIndex)) || ''
    return cck('slots', k, 'component')
  }
  createKey(p: {slotKey: ULID} | {index: N}) {
    if ('slotKey' in p) {
      return `slots_${p.slotKey}_component`
    } else {
      return `slots_${p.index}_component`
    }
  }
  ngOnInit() {
    let tree = this.componentService.getTree(this.curPage.ulid)
    this.data.items.forEach((item, index) => {
      let slotsKey = this.data.slots[`${index}_${item['id']}`]
      if (slotsKey) {
        this.compArr.push(tree?.find(slotsKey)?.toArray() || [])
      } else {
        this.compArr.push([])
      }
    })
    // 开始监听
    this.listen()
    // 设置默认选中的tab对应的子组件列表
    new Promise((s, _j) => {
      this.show = false
      s(true)
    }).then(() => {
      asyncFn(() => {
        this.show = true
      })
    })
  }
  ngOnChanges(a: A) {
    // clog('prevUlid', a, this.data)
  }
  ngAfterViewChecked() {
    // clog('ngAfterViewChecked')
  }
  ngDoCheck() {
    // clog('ngDoCheck', this.data)
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
      let slotKey = `${itemIndex}_${this.data.items[itemIndex]['id']}`
      let prevUlid: ULID = ''
      if (this.compArr[itemIndex].length) {
        prevUlid = this.compArr[itemIndex][this.compArr[itemIndex].length - 1].ulid
      } else {
        prevUlid = ''
      }
      comp = initComponentMeta(
        componentCategory,
        this.curPage.appUlid, this.curPage.ulid,
        prevUlid,
        '', this.data.ulid,
        {area: 'slots', 
          slotKey,
        },
        {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
      )
      // 操作compObj / slots
      if (this.compObj[key]?.length) {
        this.compObj[key].push(comp)
      } else {
        this.compObj[key] = [comp]
        // 操作slots
        this.data.slots[slotKey] = comp.ulid
      }
      this.componentService.mountComponent(comp)
      if (Array.isArray(this.compArr[itemIndex])) {
        this.compArr[itemIndex].push(comp)
      } else {
        this.compArr[itemIndex] = [comp]
      }
      this.componentService.reqCreateComponent(comp)
      return true
    }).then(() => {
      this.show = true
    })
  }
  deleteComponentByUlidH(ulid: ULID, index : N) {
    new Promise((s, j) => {
      this.show = false
      s(true)
    }).then(() => {
      let key = this.createChildKey({itemIndex: index})
      this.compArr[index] = this.compArr[index].filter(item => item.ulid !== ulid)
      let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(componentItem => componentItem.ulid)
      this.componentService.deleteComponentByUlid(this.curPage.ulid, ulid)
      this.componentService.reqDeleteComponent(ulid, childrenUlid)
      this.compArr[index].splice(index, 1)
      return true
    }).then(() => {
      this.show = true
    })
  }
  activeTabChangeH() {
    asyncFn(() => {
      this.show = false
    }).then(() => {
      this.show = true
    })
  }
  ngOnDestroy(): void {
  }
  listen() {
    shareEvent.on(creatEventName('Tabs', this.data.ulid, 'items', 'add'), () => {
      this.compArr.push([])
    })
    shareEvent.on(
      creatEventName('Tabs', this.data.ulid, 'items', 'remove'),
      (options) => {
        let childComponentArr = this.compArr.splice(options.index, 1)[0]
        // 删除当前组件的相关子组件
        let childrenUlid: ULID[] = []
        childComponentArr.forEach(item => {
          childrenUlid.push(item.ulid)
          this.componentService.deleteComponentByUlid(this.curPage.ulid, item.ulid)
          this.componentService.getChildrenComponent(this.curPage.ulid, item.ulid).forEach(subItem => {
            childrenUlid.push(subItem.ulid)
          })
        })
        this.componentService.reqDeleteComponent('', [...childrenUlid])
        // 在本地删除组件的item
        let slotKey = `${options.index}_${options.item['id']}`
        // 调整slots的key
        Object.entries(this.data.slots).forEach(([key, ulidValue]) => {
          let [indexStr, idStr] = key.split('_')
          if (Number(indexStr) >= options.index) {
            delete this.data.slots[key]
            if (Number(indexStr) > options.index) {
              this.data.slots[`${Number(indexStr) - 1}_${idStr}`] = ulidValue
            }
          }
        })
        // 请求远端删除slots
        this.componentService.reqRemoveSlots(slotKey)
        // 修改所有后代组件的mount字段
        for (let i = options.index; i < this.compArr.length; i++) {
          this.compArr[i].forEach((comp) => {
            this.componentService.reqUpdateComponent('mount', 'slotKey', `${options.index}_${options.item['id']}`, comp.ulid)
          })
        }
      }
    )
    shareEvent.on(creatEventName('Tabs', this.data.ulid, 'items', 'update'), (options) => {
      if (options.key === 'id') {
        let slotsKeyForDelete = Object.keys(this.data.slots).find((slotsKey) => {
          return slotsKey.split('_')[0] === String(options.index)
        })
        if (slotsKeyForDelete) {
          // 在slots中增加新的
          let newSlotKey = `${options.index}_${options.value}`
          this.data.slots[newSlotKey] = this.data.slots[slotsKeyForDelete]
          delete this.data.slots[slotsKeyForDelete]
          // 请求更新slotKey
          this.componentService.reqUpdateComponentSlotkey(this.data.ulid, newSlotKey, slotsKeyForDelete)
          // 请求更新子组件的mount
          this.componentService.reqUpdateComponent('mount', 'slotKey', newSlotKey, this.data.slots[newSlotKey])
        }
      }
    })
    shareEvent.on(
      creatEventName('Tabs', this.data.ulid, 'items', 'reorder'),
      (index: N) => {
        clog('reorder', index)
      }
    )
  }
  identify(index: number, w: Comp['items'][number]) {
    return w['id']
  }
}
