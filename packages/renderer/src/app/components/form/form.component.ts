import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { pool } from 'src/helper/pool';
import { getLoopEventParams } from 'src/helper';
import type { A, O, Oa, S, B, N, } from 'src/types/base';
import type { componentInstanceData } from 'src/types/component'

let clog = console.log

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  @Input() loopIndex: N = -1
  props: A
  items: A
  rules: A
  emptyRules: A
  getData: () => Oa
  constructor(private dataService: DataService) {
    this.props = {} // this.data.props
    this.items = [] // this.data.items
    // this.rules = {}
    this.rules = {
      validators: [
        {
          required: true,
          message: '请输入',
        },
      ],
      // message: 'Enter a'
    }
    this.emptyRules = {
      validators: [],
    }
    // todo 移到原型对象上
    this.getData = () => {
      let r: Oa = {}
      this.items.forEach((item: A) => {
        switch (item.category) {
          case 'switch':
            r[item.key] = item.checked
            break;
          default:
            r[item.key] = item.value
            break;
        }
      })
      return r
    }
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  updateVisible(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.items.forEach((item: A) => {
        if (item.key === k) {
          item.visible = v
        }
      })
    })
  }
  inputNgModelChangeH(v: S, k: S) {
    pool.trigger(this.data.ulid, 'changeFormItemValue', 
      getLoopEventParams(this.loopIndex, {
        key: k, value: v,
      }), this)
  }
  selectNgModelChangeH(v: S, k: S) {
    pool.trigger(this.data.ulid, 'changeFormItemValue', getLoopEventParams(this.loopIndex, {
      key: k, value: v
    }), this)
  }
  toggleChangeH(v: B, k: S) {
    pool.trigger(this.data.ulid, 'changeFormItemValue', getLoopEventParams(this.loopIndex, {
      // key: k, value: v
      key: k, checked: v
    }), this)
  }
  submitClickH() {
    let data: A = {}
    this.data.items.forEach((item: A) => {
      data[item.key] = item.value
    })
    pool.trigger(this.data.ulid, 'submit', getLoopEventParams(this.loopIndex, undefined), this)
  }
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', getLoopEventParams(this.loopIndex, undefined), this)
  }
  ngOnInit() {
    this.props = this.data.props
    this.items = this.data.items
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
