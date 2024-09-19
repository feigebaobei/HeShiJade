import { Component, Input, OnInit, } from '@angular/core';
import { shareEvent } from 'src/helper';
import { pool } from 'src/helper/pool';
// type
import type { A, S } from 'src/types/base';
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
  }
  buttonClickH() {
    // let eventArr = this.data.behavior.filter((item: A) => item.event === 'click')
    // eventArr.forEach((item: A) => {
    //   shareEvent.emit(item.target, item.payload)
    // })
    let fQ = pool.getQueue(this.data.ulid, 'click')
    clog('fQ', fQ)
    while (!fQ?.isEmpty()) {
      let f = fQ?.dequeue()
      f && f()
    }
  }
  ngOnInit() {
    clog('button data', this.data)
    this.data.behavior.forEach((b) => {
      let f = new Function('', b.fnBody)
      clog('f', f)
      pool.bind(this.data.ulid, b.event, f)
    })
  }
}
