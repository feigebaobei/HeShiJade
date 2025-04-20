import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { getLoopEventParams } from 'src/helper';
import { pool } from 'src/helper/pool';
import type { A, N, O } from 'src/types/base';
import type { componentInstanceData } from 'src/types/component'

let clog = console.log

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  @Input() loopIndex: N = -1
  constructor() {}
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  inputH(p: A) {
    pool.trigger(this.data.ulid, 'input', getLoopEventParams(this.loopIndex, p.target.value), this)
  }
  changeH(p: A) {
    pool.trigger(this.data.ulid, 'change', getLoopEventParams(this.loopIndex, p.target.value), this)
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
