import { Component } from '@angular/core';
import { TimePickerModule } from 'ng-devui';
import { AppendToBodyDirection } from 'ng-devui/utils';
import { CompBase } from 'src/helper/pool';
import { A, S } from 'src/types/base';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [
    TimePickerModule,
  ],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.sass'
})
export class TimePickerComponent extends CompBase {
  direction: AppendToBodyDirection[]
  constructor() {
    super()
    this.direction = []
  }
  selectedTimeChangeH(p: S) {
    this.pool.trigger(this.data.ulid, 'selectedTimeChange', this.getLoopEventParams(this.loopIndex, p), this)
  }
  override extraNgOnInit(): void {
    this.direction = this.data.props['direction'].map((item: A) => item.value)
  }
}
