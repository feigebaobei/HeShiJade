import { Component, Input, OnInit, OnDestroy, } from '@angular/core';
import { pool } from 'src/helper/pool';
import { getLoopEventParams } from 'src/helper';
// import { pool } from 'src/helper/utils';
// type
import type { A, O, S, N, } from 'src/types/base';
import type { Component as Comp, componentInstanceData } from 'src/types/component'

let clog = console.log


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  @Input() loopIndex: N = -1
  constructor() {
  }
  buttonClickH() {
    pool.trigger(this.data.ulid, 'click', getLoopEventParams(this.loopIndex, undefined), this)
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
