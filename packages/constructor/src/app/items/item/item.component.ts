import { Component, EventEmitter, Input, Output, Signal, OnInit, OnChanges, } from '@angular/core';
// type
import type { ConfigItem, S, B, Options, A, } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent implements OnInit
// OnChanges 
{
  @Input() groupItem!: ConfigItem // = {} as ConfigItem
  @Input() group!: ConfigItem[] // = {} as ConfigItem
  @Output() inputChange = new EventEmitter()
  @Output() selectChange = new EventEmitter()
  @Output() switchChange = new EventEmitter()
  @Output() optionsChange = new EventEmitter<{key: 'options', value: Options<S, S>[]}>()
  hideOptions: B
  constructor() {
    this.hideOptions = false
  }
  ngOnInit(): void {
    // console.log('groupItem', this.groupItem)
    // if (this.groupItem.category === 'options') {
    //   let f = this.groupItem.hide
    //   // clog('f', f, this.groupItem)
    //   if (f) {
    //     this.hideOptions = f(this.group)
    //     clog('hideOptions', this.group, this.hideOptions)
    //   }
    // }

    // let hideF = this.groupItem.hide
    // if (hideF) {
    //   this.hideOptions === hideF(this.group)
    // }

    this._hideListener()
  }
  // ngOnChanges() {
  //   // clog('OnChanges', this.groupItem, this.group)
  // }
  _hideListener() {
    let hideF = this.groupItem.hide
    if (hideF) {
      this.hideOptions === hideF(this.group)
    }
  }
  hideListener(key: S,) {
    let hlk = (this.groupItem).hideListenerKey
    // clog('hlk', hlk, this.group)
    if (hlk === key) {
      this._hideListener()
    }
  }
  inputChangeH (v: S) {
    // console.log('inputChangeH', v)
    this.inputChange.emit({key: this.groupItem.key, value: v})
    // this.hideListener(this.groupItem.key)
  }
  selectChangeH (v: S) {
    this.selectChange.emit({key: this.groupItem.key, value: v})
    // this.hideListener(this.groupItem.key)
  }
  switchChangeH (v: B) {
    this.switchChange.emit({key: this.groupItem.key, value: v})
    // this.hideListener(this.groupItem.key)
  }
  optionsChangeH (v: Options<S, S>[]) {
    // console.log('optionsChangeH v', v)
    this.optionsChange.emit({key: this.groupItem.key as 'options', value: v})
    // this.hideListener(this.groupItem.key)
  }
}
