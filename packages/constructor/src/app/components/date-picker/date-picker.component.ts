import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerModule, DatepickerProModule } from 'ng-devui';
import shareEvent, { creatEventName } from 'src/helper/share-event';
import { TextBase } from 'src/helper/text';
import { N, S } from 'src/types/base';

let clog = console.log


@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    // DatepickerModule,
    FormsModule,
    DatepickerProModule,
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.sass'
})
export class DatePickerComponent extends TextBase {
  value?: Date
  constructor() {
    super()
  }
  ngOnInit() {
    // 初始化
    if (this.data.props['value']) {
      this.value = new Date(this.data.props['value'])
    } else {
      this.value = undefined
    }
    // 监听&设置
    shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'props', 'update'), (({key, value}) => {
      this.value = new Date(value)
    }))
    shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'props', 'remove'), (({key}) => {
      switch (key) {
        case 'value':
          this.value = undefined
          break;
      }
    }))
  }
}
