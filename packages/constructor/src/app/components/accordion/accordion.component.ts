import { Component, Input } from '@angular/core';
import { TextBase } from 'src/helper/text';
import { Oa, S } from 'src/types/base';
import shareEvent, { creatEventName } from 'src/helper/share-event';
// type
import type { Component as Comp } from 'src/types/component';
import type { AccordionMenuItem } from 'ng-devui';

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
export class AccordionComponent extends TextBase {
  @Input() data!: {props: Comp['props'], items: Comp['items'], ulid: Comp['ulid']}
  menu: AccordionMenuItemNew[]
  constructor() {
    super()
    this.menu = []
  }
  washMenuItem(obj: Oa): AccordionMenuItemNew {
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
  // 找到parent
  find(arr: AccordionMenuItemNew[], k: S): AccordionMenuItemNew | undefined {
    let res = arr.find(item => item.key === k)
    if (res) {
      return res
    } else {
      for (let i = 0; i < arr.length; i++) {
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
      let washMenuItemList = (this.data.items).map(item => this.washMenuItem(item))
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
          washMenuItemList.splice(i, 1)
        } else {
          i++
        }
      }
      this.menu = washMenuItemList
    }
  }
  listen() {
    shareEvent.on(creatEventName('Accordion', this.data.ulid, 'items', 'add'), () => {
      this.opMenu()
    })
    shareEvent.on(creatEventName('Accordion', this.data.ulid, 'items', 'update'), () => {
      this.opMenu()
    })
    shareEvent.on(creatEventName('Accordion', this.data.ulid, 'items', 'remove'), () => {
      this.opMenu()
    })
  }
  ngOnInit() {
    this.opMenu()
    this.listen()
  }
}
