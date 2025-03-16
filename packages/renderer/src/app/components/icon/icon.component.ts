import { Component, Input } from '@angular/core';
import { pool } from 'src/helper/pool';
import { getLoopEventParams } from 'src/helper';
import type { A, O, N, } from 'src/types/base';
import type { Component as Comp, componentInstanceData } from 'src/types/component'
@Component({
  selector: 'app-icon',
  // standalone: true,
  // imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.sass'
})
export class IconComponent {
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
