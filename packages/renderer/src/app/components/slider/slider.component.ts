import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'ng-devui';
import { CompBase } from 'src/helper/pool';
import { N } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    FormsModule,
    SliderModule,
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.sass'
})
export class SliderComponent extends CompBase {
  afterChangeH(p: N) {
    this.pool.trigger(this.data.ulid, 'afterChange', this.getLoopEventParams(this.loopIndex, p), this)
  }
}
