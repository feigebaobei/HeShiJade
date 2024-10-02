import { Component, Input, OnInit } from '@angular/core';
import { pool } from 'src/helper/pool';
// type
import type { Component as Comp, componentInstanceData } from 'src/types/component'
import type { ULID } from 'src/types';
import type { N, S, O, } from 'src/types/base';

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
  @Input() data!: PaginationData
  pageSizeOptions: N[]
  constructor() {
    this.pageSizeOptions = []
  }
  pageIndexChangeH(n: N) {
    clog('pageIndexChangeH', n)
    let fnArr = pool.getEventArray(this.data.ulid, 'pageIndexChange')
    fnArr.forEach(f => {
      f.bind(this) // 方法体的this
      f && f(pool.getComponentInstance.bind(pool),
        pool.getPluginFn(), // 插件
      ) // 绑定指定方法的this
    })
  }
  pageSizeChangeH(n: N) {
    clog('pageSizeChangeH', n)
    let fnArr = pool.getEventArray(this.data.ulid, 'pageSizeChange')
    fnArr.forEach(f => {
      f.bind(this) // 方法体的this
      f && f(pool.getComponentInstance.bind(pool)) // 绑定指定方法的this
    })
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  ngOnInit() {
    this.pageSizeOptions = this.data.props['pageSizeOptions'].split(',').map((item: S) => Number(item))
    pool.register(this.data.ulid, this, this.data.behavior)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
  }
}
