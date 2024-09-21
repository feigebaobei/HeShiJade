import { Component, Input, OnInit, OnDestroy, } from '@angular/core';
import { shareEvent } from 'src/helper';
import { pool } from 'src/helper/pool';
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
    let fnArr = pool.getEventArray(this.data.ulid, 'click')
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
    // // 注册组件实例
    // pool.registerComponentInstance(this.data.ulid, this)
    // // 注册事件
    // this.data.behavior.forEach((b) => {
    //   let f = new Function('getComponentInstance', b.fnBody)
    //   pool.registerEvent(this.data.ulid, b.event, f)
    // })
    pool.register(this.data.ulid, this, this.data.behavior)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
    // pool.unRegisterComponentInstance(this.data.ulid)
    // pool.unRegisterEvent(this.data.ulid)
  }
}