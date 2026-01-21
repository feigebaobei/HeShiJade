import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerProModule } from 'ng-devui';
import { CompBase } from 'src/helper/pool';
// type
import type { B, D } from 'src/types/base';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    DatepickerProModule,
    FormsModule,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.sass'
})
export class DatePickerComponent extends CompBase {
  value?: D
  constructor () {
    super()
  }
  confirmEventH(p: D) {
    this.pool.trigger(this.data.ulid, 'confirmEvent', this.getLoopEventParams(this.loopIndex, p), this)
  }
  dropdownToggleH(p: B) {
    this.pool.trigger(this.data.ulid, 'dropdownToggle', this.getLoopEventParams(this.loopIndex, p), this)
  }
  opValue() {
    if (this.data.props['value']) {
      this.value = new Date(this.data.props['value'])
    } else {
      this.value = undefined
    }
  }
  override extraNgOnInit(): void {
    this.opValue()
  }
  override extraSetProps(): void {
    this.opValue()
  }
}
