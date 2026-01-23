import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerProModule } from 'ng-devui';
import shareEvent, { creatEventName } from 'src/helper/share-event';
import { TextBase } from 'src/helper/text';
import { D, N } from 'src/types/base';


let clog = console.log

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [
    FormsModule,
    // DatepickerProModule,
    DatepickerProModule,
  ],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.sass'
})
export class DateRangePickerComponent extends TextBase {
  // value: D[]
  // range: N[]
  // 因底层组件在处理ngModel/calenderRange的值（它是数组）中只有一个元素时会报错，所以现阶段不支持此配置项。
  // startIndexOfWeek: N
  constructor() {
    super()
    // this.startIndexOfWeek = 3
    // this.value = []
    // this.range = []
  }
  // initValue() {
  //   this.value = []
  //   if (this.data.props['startDate']) {
  //     this.value.push(this.data.props['startDate'])
  //     if (this.data.props['endDate']) {
  //       this.value.push(this.data.props['endDate'])
  //     }
  //   } else {
  //     if (this.data.props['endDate']) {
  //       this.value = [, this.data.props['endDate']]
  //     }
  //   }
  // }
  // initRange() {
  //   this.range = [this.data.props['minYear'] || 1970, this.data.props['maxYear'] || 2099 ]
  // }
  // InitStartIndexOfWeek() {
  //   this.startIndexOfWeek = Number(this.data.props['startIndexOfWeek'])
  // }
  ngOnInit() {
    // this.InitStartIndexOfWeek()
    // this.initValue()
    // this.initRange()
    // shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'props', 'remove'), ({key, value}) => {
    //   clog('key', key)
    //   switch (key) {
    //     case 'startDate':
    //     case 'endDate':
    //       this.initValue()
    //       break;
    //   }
    // })
    // shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'props', 'update'), ({key, value}) => {
    //   clog('key', key)
    //   switch (key) {
    //     case 'startDate':
    //     case 'endDate':
    //       this.initValue()
    //       break;
    //     case 'minYear':
    //     case 'maxYear':
    //       // this.initRange()
    //       break;
    //   }
    // })
  }
}
