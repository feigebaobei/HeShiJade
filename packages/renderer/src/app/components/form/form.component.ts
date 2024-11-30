import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { pool } from 'src/helper/pool';
import type { A, O, Oa, } from 'src/types/base';
import type { componentInstanceData } from 'src/types/component'
// import {trigger} from 'src/helper/utils'

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
  getData: () => Oa
  constructor(private dataService: DataService) {
    this.props = {} // this.data.props
    this.items = {} // this.data.items
    this.rules = {
      validators: [
        { required: true },
      ],
      message: 'Enter a'
    }
    this.getData = () => {
      let r: Oa = {}
      this.items.forEach((item: A) => {
        r[item.key] = item.value
      })
      return r
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
    // 触发submit事件
    // let fnArr = pool.getEventArray(this.data.ulid, 'submit')
    // fnArr.forEach(f => {
    //   f.bind(this) // 方法体的this
    //   f && f(
    //     utils,
    //     pool.getPluginFn(), // 插件
    //     // res
    //   )
    // })
    pool.trigger(this.data.ulid, 'submit', undefined, this)
  }
  ngOnInit() {
    this.props = this.data.props
    this.items = this.data.items
    pool.register(this.data.ulid, this, this.data.behavior)
    // 触发postRenderer事件
    // pool.trigger(this.data.ulid, 'postComponentRender', undefined, this)
    // utils.
    pool.trigger(this.data.ulid, 'postComponentRender', undefined, this)
  }
  ngAfterViewInit() {
    pool.resolveComponentRender(this.data.pageUlid, this.data.ulid)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
  }
}
