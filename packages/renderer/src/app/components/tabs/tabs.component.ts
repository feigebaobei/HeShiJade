import { Component, Input, OnInit } from '@angular/core';
import { asyncFn, createChildKey } from 'src/helper/index'
import { ComponentService } from 'src/app/service/component.service';
// type
import type { Component as Comp } from 'src/types/component';
import type { ULID } from 'src/types';
import { B, S, N, A, } from 'src/types/base';

let clog = console.log

interface TabsData {
  props: Comp['props']
  behavior: Comp['behavior']
  items: Comp['items']
  slots: Comp['slots']
  ulid: ULID
}

@Component({
  selector: 'app-tabs',
  // standalone: true,
  // imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.sass'
})
export class TabsComponent implements OnInit {
  @Input() data!: TabsData
  activeTab: S
  createChildKey: typeof createChildKey
  compObj: {[k: S]: Comp[]}
  show: B
  indexSlotKeyMap: Map<N, ULID>
  constructor(private componentService: ComponentService) {
    this.activeTab = '' // this.data.props['activeTab']
    this.createChildKey = createChildKey
    this.compObj = {}
    this.show = true
    this.indexSlotKeyMap = new Map()
  }
  ngOnInit() {
    new Promise((s, _j) => {
      s(true)
    }).then(() => {
      this.show = false
      this.activeTab = this.data.props['activeTab']
      let tree = this.componentService.getTreeByKey()

      Object.entries(this.data.slots).forEach(([k, v], index) => {
        this.indexSlotKeyMap.set(index, k)
        let node = tree?.find(v)
        if (node) {
          this.compObj[createChildKey('slots', k, 'component')] = node.toArray()
        }
      })
      return true
    }).then(() => {
      asyncFn(() => {
        this.show = true
      })
    })
  }
  activeTabChangeH(id: N | S) {
    id = String(id)
    clog('id', id)
  }
  addOrDeleteTabChangeH(o: A) {
    // clog('o', o)
    // let {id, operatioin} = o
    let id: S = o.id
    let operatioin: S = o.operatioin
    switch (operatioin) {
      case 'add': // 当前不支持
        break;
      case 'delete':

        break;
    }
  }
}
