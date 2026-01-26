import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerProModule } from 'ng-devui';
import { CompBase } from 'src/helper/pool';
import { B, D } from 'src/types/base';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [
    FormsModule,
    DatepickerProModule,
  ],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.sass'
})
export class DateRangePickerComponent extends CompBase {
  value: D[]
  constructor() {
    super()
    this.value = []
  }
  confirmEventH(p: D[]) {
    this.pool.trigger(this.data.ulid, 'confirmEvent', this.getLoopEventParams(this.loopIndex, p), this)
  }
  dropdownToggleH(p: B) {
    this.pool.trigger(this.data.ulid, 'dropdownToggle', this.getLoopEventParams(this.loopIndex, p), this)
  }
}
