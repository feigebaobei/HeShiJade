import { Component, Input } from '@angular/core';
import { pool } from 'src/helper/pool';
import type { A, O } from 'src/types/base';
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
  constructor() {}
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
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
