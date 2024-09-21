import { Component, Input, OnInit, } from '@angular/core';
import { shareEvent } from 'src/helper';
import { pool } from 'src/helper/pool';
// type
import type { A, O, S } from 'src/types/base';
import type { Component as Comp } from 'src/types/component'

let clog = console.log

interface ButtonDataInterface {
  props: Comp['props']
  behavior: Comp['behavior']
  slots: Comp['slots']
  ulid: Comp['ulid']
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit {
  @Input() data!: ButtonDataInterface
  constructor() {
    // 注册组件
    // 取出behavior，注册事件
    // 为自定义回调方法，设置方法体。
    // 调用组件的指定方法
    // pool.bind(data.ulid)
    // clog('button data', this.data)
    // this.data.behavior
    // pool.bind(data.ulid, )
    // pool.registerComponentInstance(this.data.ulid,)
  }
  buttonClickH() {
    // let eventArr = this.data.behavior.filter((item: A) => item.event === 'click')
    // eventArr.forEach((item: A) => {
    //   shareEvent.emit(item.target, item.payload)
    // })

    // let fQ = pool.getEventQueue(this.data.ulid, 'click')
    // clog('fQ', fQ)
    // while (!fQ?.isEmpty()) {
    //   let f = fQ?.dequeue().bind(this)
    //   // f && f(this.getComponentInstance)
    //   // pool.getComponentInstance.bind(pool)
    //   f && f(pool.getComponentInstance.bind(pool))
    // }

    let fnArr = pool.getEventArray(this.data.ulid, 'click')
    fnArr.forEach(f => {
      f.bind(this) // 方法体的this
      f && f(pool.getComponentInstance.bind(pool)) // 绑定指定方法的this
    })
  }
  setProps(o: O) {
    clog('setProps', o)
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  // getComponentInstance() {
  //   clog('getComponentInstance 12345')
  // }
  ngOnInit() {
    // clog('button data', this.data)
    pool.registerComponentInstance(this.data.ulid, this)
    this.data.behavior.forEach((b) => {
      // let f = new Function('getComponentInstance', 'console.log(this);' + b.fnBody)
      // let f = new Function('getComponentInstance', 'console.log(this);' + "getComponentInstance('01J85BMRDJ3NYS52FX3NDEKPDZ').setProps({visible: true})")
      let f = new Function('getComponentInstance', 'console.log(this);' + "getComponentInstance('01J85BMRDJ3NYS52FX3NDEKPDZ').setProps({'width': '800px'});getComponentInstance('01J85BMRDJ3NYS52FX3NDEKPDZ').openDialog();")
      // clog('f', f)
      pool.registerEvent(this.data.ulid, b.event, f)
    })
  }
}


// let anonymous = (getComponentInstance: A) => {
//   getComponentInstance('01J85BMRDJ3NYS52FX3NDEKPDZ').setProps({visible: true})
// }