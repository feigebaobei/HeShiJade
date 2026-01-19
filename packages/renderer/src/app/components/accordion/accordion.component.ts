import { Component } from '@angular/core';
import { CompBase } from 'src/helper/pool';
// type
import type { AccordionMenuItem } from 'ng-devui';
import type { Oa, S, A, } from 'src/types/base';
interface AccordionMenuItemNew extends AccordionMenuItem {
  key: S
  parentKey: S
  children?: AccordionMenuItemNew[]
}

let clog = console.log

@Component({
  selector: 'app-accordion',
  // standalone: true,
  // imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.sass'
})
export class AccordionComponent extends CompBase {
  menu: AccordionMenuItemNew[]
  constructor() {
    super()
    this.menu = []
  }
  washMenuItem(obj: Oa) {
    return {
      title: obj['title'],
      disabled: obj['disabled'],
      key: obj['key'],
      parentKey: obj['parentKey'],
      open: obj['open'],
      link: obj['link'],
      // children: [],
    }
  }
  find(arr: AccordionMenuItemNew[], k: S): AccordionMenuItemNew | undefined {
    let res = arr.find(item => item.key === k)
    if (res) {
      return res
    } else {
      for (let i = 0; i< arr.length; i++) {
        let t = this.find(arr[i].children || [], k)
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
      let washMenuItemList = this.data.items.map(item => this.washMenuItem(item))
      for (let i = 0; i < washMenuItemList.length;) {
        let cur = washMenuItemList[i]
        if (cur.parentKey) {
          let p = this.find(washMenuItemList, cur.parentKey)
          if (p) {
            if (Array.isArray(p.children)) {
              p.children.push(cur)
            } else {
              p.children = [cur]
            }
          }
        } else {
          i++
        }
      }
      this.menu = washMenuItemList
    }
    clog('sdfsfs', this.menu)
  }
  menuToggleH(p: A) {
    this.pool.trigger(this.data.ulid, 'menuToggle', this.getLoopEventParams(this.loopIndex, {
        item: p.item, // any;
          // {
          //   active: true,
          //   disabled: false,
          //   key: "one",
          //   link: "",
          //   open: false,
          //   parentKey: undefined,
          //   title: "one",
          // }
        open: p.open, // boolean;
        parent: p.parent, // any; // 同item
        event: p.event, // MouseEvent;
    }), this)
  }
  itemClickH(p: A) {
    // {
      // item: any;
      // prevActiveItem?: any;
      // parent: any;
      // event: MouseEvent;
    // }
    this.pool.trigger(this.data.ulid, 'itemClick', this.getLoopEventParams(this.loopIndex, {
      item: p.item,
      prevActiveItem: p.prevActiveItem,
      parent: p.parent,
      event: p.event,
    }), this)
  }
  activeItemChangeH(p: A) {
    this.pool.trigger(this.data.ulid, 'activeItemChange', this.getLoopEventParams(this.loopIndex, p), this)
    // {
    //   active: true
    //   disabled: false
    //   key: "one"
    //   link: ""
    //   open: false
    //   parentKey: undefined
    //   title: "one"
    // }
  }
  override ngOnInit(): void {
    this.pool.register(this.data.ulid, this, this.data.behavior)
    this.pool.trigger(this.data.ulid, 'postComponentNgOnInit', this.getLoopEventParams(this.loopIndex, undefined), this)
    this.opMenu()
  }
}
