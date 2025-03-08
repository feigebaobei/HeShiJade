import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { pool } from 'src/helper/pool';
import type { A, O } from 'src/types/base';
import type { componentInstanceData } from 'src/types/component'

let clog = console.log

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  constructor() {}
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  inputH(p: A) {
    // clog('inputH', p.target.value)
    pool.trigger(this.data.ulid, 'input', p, this)
  }
  changeH(p: A) {
    // clog('changeH', p.target.value)
    pool.trigger(this.data.ulid, 'change', p, this)
  }
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', undefined, this)
  }
  ngOnInit() {
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
