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
    pool.trigger(this.data.ulid, 'submit', undefined, this)
  }
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', undefined, this)
  }
  ngOnInit() {
    this.props = this.data.props
    this.items = this.data.items
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', undefined, this)
  }
  ngDoCheck() {
    pool.trigger(this.data.ulid, 'postComponentNgDoCheck', undefined, this)
  }
  ngAfterViewInit() {
    pool.trigger(this.data.ulid, 'postComponentNgAfterViewInit', undefined, this)
    pool.resolveComponentRender(this.data.pageUlid, this.data.ulid)
  }
  ngOnDestroy() {
    pool.trigger(this.data.ulid, 'postComponentNgOnDestroy', undefined, this)
    pool.unRegister(this.data.ulid)
  }
}
