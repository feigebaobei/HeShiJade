import { Component, Input, } from '@angular/core';
import { pool } from 'src/helper/pool';
// type
import type { A, S, O } from 'src/types/base';
import type { Component as Comp, componentInstanceData } from 'src/types/component'
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent {
  @Input() data!: componentInstanceData
  // options: S[]
  constructor() {
    // this.options = [
      
    // ]
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  ngOnInit() {
    pool.register(this.data.ulid, this, this.data.behavior)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
  }
}
