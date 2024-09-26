import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { pool } from 'src/helper/pool';
import type { A, O } from 'src/types/base';
import type { componentInstanceData } from 'src/types/component'

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
  ngOnInit() {
    pool.register(this.data.ulid, this, this.data.behavior)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
  }
}
