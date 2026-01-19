import { Component, Input } from '@angular/core';
import { PageService } from 'src/app/service/page.service';
import { pool } from 'src/helper/utils';
import { getLoopEventParams } from 'src/helper';
// type
import type { MenuItem, ULID, S, Oa, O, N, B, } from 'src/types/base';
// import { Component } from 'src/types/component';
import type { Component as Comp, componentInstanceData } from 'src/types/component'

let clog = console.log

interface PageListData {
  props: Comp['props']
  behavior: Comp['behavior']
  slots: Comp['slots']
  items: Comp['items']
  ulid: ULID
  pageUlid: ULID
}
@Component({
  selector: 'app-page-list',
  // standalone: true,
  // imports: [],
  templateUrl: './page-list.component.html',
  styleUrl: './page-list.component.sass'
})
export class PageListComponent {
  @Input() data!: PageListData
  @Input() loopIndex: N = -1
  menu: MenuItem[]
  active: S
  getData: () => Oa
  constructor(
    private pageService: PageService
  ) {
    this.active = ''
    this.menu = []
    this.getData = () => {
      return this.data.props
    }
  }
  washMenuItem(obj: Oa) {
    return {
      key: obj['key'],
      name: obj['name'],
      icon: obj['icon'],
      parentKey: obj['parentKey'],
      isOpen: obj['isOpen'],
      isRenderer: obj['isRenderer'],
      isDisabled: obj['isDisabled'],
      children: [],
    }
  }
  find(arr: MenuItem[], k: S): MenuItem | undefined {
    let res = arr.find(item => item.key === k)
    if (res) {
      return res
    } else {
      for (let i = 0; i < arr.length; i++) {
        let t = this.find(arr[i].children, k)
        if (t) {
          return t
        }
      }
      return
    }
  }
  opMenu() {
    if (!this.data.items.length) {
      this.menu = []
    } else {
      let washMenuItemList = (this.data.items as MenuItem[]).map(item => this.washMenuItem(item))
      for (let i = 0; i < washMenuItemList.length;) {
        let cur = washMenuItemList[i]
        if (cur.parentKey) {
          // 去挂
          let p = this.find(washMenuItemList, cur.parentKey)
          if (p) {
            p.children.push(cur)
          }
          washMenuItemList.splice(i, 1)
        } else {
          // 不挂
          i++
        }
      }
      this.menu = washMenuItemList
    }
  }
  itemClickH(key: S) {
    this.active = key
    this.pageService.setCurByKey(key)
    pool.trigger(this.data.ulid, 'itemClick', getLoopEventParams(this.loopIndex, key), this)
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  openChangeH(isOpen: B, key: S) {
    // clog('openChangeH', isOpen, key)
    pool.trigger(this.data.ulid, 'openChange', getLoopEventParams(this.loopIndex, {isOpen, key}), this)
  }
  openChangeInnerH(obj: {isOpen: B, key: S}) {
    // clog('openChangeInnerH', obj)
    pool.trigger(this.data.ulid, 'openChange', getLoopEventParams(this.loopIndex, {isOpen: obj.isOpen, key: obj.key}), this)
  }
  ngOnInit() {
    this.opMenu()
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', getLoopEventParams(this.loopIndex, undefined), this)
  }
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', getLoopEventParams(this.loopIndex, undefined), this)
  }
  ngDoCheck() {
    pool.trigger(this.data.ulid, 'postComponentNgDoCheck', getLoopEventParams(this.loopIndex, undefined), this)
  }
  ngAfterViewInit() {
    pool.trigger(this.data.ulid, 'postComponentNgAfterViewInit', getLoopEventParams(this.loopIndex, undefined), this)
    pool.resolveComponentRender(this.data.pageUlid, this.data.ulid)
  }
  ngOnDestroy() {
    pool.trigger(this.data.ulid, 'postComponentNgOnDestroy', getLoopEventParams(this.loopIndex, undefined), this)
    pool.unRegister(this.data.ulid)
  }

}
