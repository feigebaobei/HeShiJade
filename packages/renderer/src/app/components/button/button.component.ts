import { Component, Input, OnInit, OnDestroy, } from '@angular/core';
import { pool } from 'src/helper/pool';
// import { pool } from 'src/helper/utils';
// type
import type { A, O, S } from 'src/types/base';
import type { Component as Comp, componentInstanceData } from 'src/types/component'

let clog = console.log

// interface ButtonDataInterface {
//   props: Comp['props']
//   behavior: Comp['behavior']
//   slots: Comp['slots']
//   ulid: Comp['ulid']
// }

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  constructor() {
  }
  buttonClickH() {
    // let fnArr = pool.getEventArray(this.data.ulid, 'click')
    // fnArr.forEach(f => {
    //   f.bind(this) // 方法体的this
    //   f && f(pool.getComponentInstance.bind(pool),  // 绑定指定方法的this
    //     pool.getPluginFn(), // 插件
    //   )
    // })
    pool.trigger(this.data.ulid, 'click', undefined, this)
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  ngOnInit() {
    pool.register(this.data.ulid, this, this.data.behavior)
  }
  ngAfterViewInit() {
    pool.resolveComponentRender(this.data.pageUlid, this.data.ulid)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
  }
}
