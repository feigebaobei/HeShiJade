import { Component, Input, OnInit } from '@angular/core';
import { pool } from 'src/helper/pool';
import { getLoopEventParams } from 'src/helper';
// type
import type { Component as Comp, componentInstanceData } from 'src/types/component'
import type { ULID } from 'src/types';
import type { N, S, O, Oa, } from 'src/types/base';

let clog = console.log

interface PaginationData {
  props: Comp['props']
  behavior: Comp['behavior']
  // items: Comp['items']
  // slots: Comp['slots']
  ulid: ULID

}


@Component({
  selector: 'app-pagination',
  // standalone: true,
  // imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass'
})
export class PaginationComponent implements OnInit {
  // @Input() data!: PaginationData
  @Input() data!: componentInstanceData
  @Input() loopIndex: N = -1
  pageSizeOptions: N[]
  getData: () => Oa
  constructor() {
    this.pageSizeOptions = []
    this.getData = () => {
      return this.data.props
    }
  }
  pageIndexChangeH(n: N) {
    // clog('pageIndexChangeH', n)
    // let fnArr = pool.getEventArray(this.data.ulid, 'pageIndexChange')
    // fnArr.forEach(f => {
    //   f.bind(this) // 方法体的this
    //   f && f(
    //     // pool.getComponentInstance.bind(pool),
    //     utils,
    //     pool.getPluginFn(), // 插件
    //   ) // 绑定指定方法的this
    // })
    pool.trigger(this.data.ulid, 'pageIndexChange', getLoopEventParams(this.loopIndex, undefined), this)
  }
  pageSizeChangeH(n: N) {
    // clog('pageSizeChangeH', n)
    // let fnArr = pool.getEventArray(this.data.ulid, 'pageSizeChange')
    // fnArr.forEach(f => {
    //   f.bind(this) // 方法体的this
    //   f && f(utils, pool.getPluginFn()) // 绑定指定方法的this
    // })
    pool.trigger(this.data.ulid, 'pageSizeChange', getLoopEventParams(this.loopIndex, undefined), this)
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
    this.pageSizeOptions = this.data.props['pageSizeOptions'].split(',').map((item: S) => Number(item))
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', getLoopEventParams(this.loopIndex, undefined), this)
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
