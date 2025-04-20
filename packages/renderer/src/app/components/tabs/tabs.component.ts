import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { asyncFn, createChildKey } from 'src/helper/index'
import { ComponentService } from 'src/app/service/component.service';
import { pool } from 'src/helper/pool';
import { getLoopEventParams } from 'src/helper';
// type
import type { Component as Comp, componentInstanceData } from 'src/types/component'
import type { ULID } from 'src/types';
import type { B, S, N, A, O } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-tabs',
  // standalone: true,
  // imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.sass'
})
export class TabsComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  @Input() loopIndex: N = -1
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
  activeTabChangeH(id: N | S) {
    // id = String(id)
    // clog('id', id)
    // let fnArr = pool.getEventArray(this.data.ulid, 'activeTabChange')
    // fnArr.forEach(f => {
    //   f.bind(this) // 方法体的this
    //   f && f(pool.getComponentInstance.bind(pool),
    //     pool.getPluginFn(), // 插件
    //   ) // 绑定指定方法的this
    // })
    // trigger(this.data.ulid, 'activeTabChange', getLoopEventParams(this.loopIndex, undefined), this)
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
        // let fnArr = pool.getEventArray(this.data.ulid, 'deleteTabChange')
        // fnArr.forEach(f => {
        //   f.bind(this) // 方法体的this
        //   f && f(pool.getComponentInstance.bind(pool)) // 绑定指定方法的this
        // })
        // trigger(this.data.ulid, 'deleteTabChange', getLoopEventParams(this.loopIndex, undefined), this)
        break;
    }
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', getLoopEventParams(this.loopIndex, undefined), this)
  }
  ngOnInit() {
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', getLoopEventParams(this.loopIndex, undefined), this)
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
