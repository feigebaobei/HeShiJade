import { Component, Input } from '@angular/core';
import { getLoopEventParams } from 'src/helper';
import { pool } from 'src/helper/pool';
// type
import type { componentInstanceData } from 'src/types/component';
import type { N, O } from 'src/types/base';

@Component({
  selector: 'app-input-number',
  // standalone: true,
  // imports: [],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.sass'
})
export class InputNumberComponent {
  @Input() data!: componentInstanceData
  @Input() loopIndex: N = -1
  constructor() {}

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
