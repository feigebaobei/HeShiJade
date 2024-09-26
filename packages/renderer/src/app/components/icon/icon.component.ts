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
  ngOnInit() {
    pool.register(this.data.ulid, this, this.data.behavior)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
  }
}
