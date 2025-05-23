import { Component, Input, OnInit } from '@angular/core';
import { pool } from 'src/helper/pool';
import { getLoopEventParams } from 'src/helper';
// type
import type { Component as Comp, componentInstanceData } from 'src/types/component'
import type { ULID } from 'src/types';
import type { B, O, N, } from 'src/types/base';

let clog = console.log

// interface CheckboxData {
//   props: Comp['props']
//   behavior: Comp['behavior']
//   ulid: ULID
// }

@Component({
  selector: 'app-checkbox',
  // standalone: true,
  // imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.sass'
})
export class CheckboxComponent implements OnInit {
  @Input() data!: componentInstanceData
  @Input() loopIndex: N = -1
  constructor() {}
  // beforeChangeH() {
  //   return true
  // }
  changeH(value: B) {
    clog('change', value)
    let fnArr = pool.getEventArray(this.data.ulid, 'change')
    fnArr.forEach(f => {
      f.bind(this) // 方法体的this
      f && f(pool.getComponentInstance.bind(pool),
        pool.getPluginFn(), // 插件
      ) // 绑定指定方法的this
    })
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
