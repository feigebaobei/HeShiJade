import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RateModule } from 'ng-devui';
import { clog } from 'src/helper';
import { CompBase } from 'src/helper/pool';
import { A, N } from 'src/types/base';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [
    // CommonModule,
    FormsModule,
    RateModule,
  ],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.sass'
})
export class RateComponent extends CompBase {
  ngModelChangeH(p: N) {
    this.pool.trigger(this.data.ulid, 'ngModelChange', this.getLoopEventParams(this.loopIndex, p), this)
  }
}
