import { Component } from '@angular/core';
import { 
  // IconModule, 
  TimePickerModule } from 'ng-devui';
import { InputData } from 'src/helper/InputData';
import { A, S } from 'src/types/base';
import type { AppendToBodyDirection } from 'ng-devui/utils';

let clog = console.log

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [
    TimePickerModule,
    // IconModule,
  ],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.sass'
})
export class TimePickerComponent extends InputData{
  // direction: S[]
  direction: AppendToBodyDirection[]
  constructor() {
    super()
    this.direction = []
  }
  initDirection() {
    this.direction = this.data.props['direction'].map((item: A) => item.value)
  }
  ngOnInit() {
    this.initDirection()
  }
}
