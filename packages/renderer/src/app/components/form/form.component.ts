import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
// import { shareEvent } from 'src/helper';
import { pool } from 'src/helper/pool';
import type { A, O } from 'src/types/base';
import type { componentInstanceData } from 'src/types/component'
import * as utils from 'src/helper/utils'

let clog = console.log

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  props: A
  items: A
  rules: A
  constructor(private dataService: DataService) {
    this.props = {} // this.data.props
    this.items = {} // this.data.items
    this.rules = {
      validators: [
        { required: true },
      ],
      message: 'Enter a'
    }
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  submitClickH() {
    let data: A = {}
    this.data.items.forEach((item: A) => {
      data[item.key] = item.value
    })

    let fnArr = pool.getEventArray(this.data.ulid, 'submit')
    fnArr.forEach(f => {
      f.bind(this) // 方法体的this
      f && f(
        // pool.getComponentInstance.bind(pool), // 绑定指定方法的this
        utils,
        pool.getPluginFn(), // 插件
        // res
      )
    })
    // this.dataService.req(this.data.props['url'], 'post', data).then(res => {
    //   clog('submit res', res)
    //   // let fnArr = pool.getEventArray(this.data.ulid, 'submit')
    //   // fnArr.forEach(f => {
    //   //   f.bind(this) // 方法体的this
    //   //   f && f(
    //   //     // pool.getComponentInstance.bind(pool), // 绑定指定方法的this
    //   //     utils,
    //   //     pool.getPluginFn(), // 插件
    //   //     res
    //   //   )
    //   // })

    //   // let eventArr = this.data.behavior.filter((item: A) => item.event === 'submit')
    //   // eventArr.forEach((item: A) => {
    //   //   if (res.code === 0) {
    //   //     // shareEvent.emit(item.target, res.data)
    //   //   } else {
    //   //     // todo 提示
    //   //   }
    //   // })
    // })
  }
  ngOnInit() {
    this.props = this.data.props
    this.items = this.data.items
    pool.register(this.data.ulid, this, this.data.behavior)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
  }
}
