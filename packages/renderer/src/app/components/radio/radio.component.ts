import { Component, Input } from '@angular/core';
// type
import { A, N, B, S, } from 'src/types/base';
import type { componentInstanceData } from 'src/types/component';
import { pool } from 'src/helper/utils';
import { CompBase } from 'src/helper/pool';
import { getLoopEventParams } from 'src/helper';
import { RadioModule } from 'ng-devui';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

let clog = console.log

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [
    RadioModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.sass'
})
export class RadioComponent extends CompBase {
  // @Input() override data!: componentInstanceData
  // @Input() override loopIndex: N = -1
  constructor() {
    super()
  }
  valueChange(p: S) {
    pool.trigger(this.data.ulid, 'change', getLoopEventParams(this.loopIndex, p), this)
  }
}

