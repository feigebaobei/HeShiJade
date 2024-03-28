import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
// type
import { ConfigItem, S, B, Options, } from 'src/types/base';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent {
  @Input() groupItem!: ConfigItem // = {} as ConfigItem
  @Output() inputChange = new EventEmitter()
  @Output() selectChange = new EventEmitter()
  @Output() switchChange = new EventEmitter()
  @Output() optionsChange = new EventEmitter<{key: 'options', value: Options<S, S>[]}>()
  constructor() {}
  inputChangeH (v: S) {
    // console.log('inputChangeH', v)
    this.inputChange.emit({key: this.groupItem.key, value: v})
  }
  selectChangeH (v: S) {
    this.selectChange.emit({key: this.groupItem.key, value: v})
  }
  switchChangeH (v: B) {
    this.switchChange.emit({key: this.groupItem.key, value: v})
  }
  optionsChangeH (v: Options<S, S>[]) {
    // console.log('optionsChangeH v', v)
    this.optionsChange.emit({key: this.groupItem.key as 'options', value: v})
  }
}
