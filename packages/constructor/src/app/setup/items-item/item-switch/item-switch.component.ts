import { Component, Input, OnInit } from '@angular/core';
// import { ComponentItemSwitch } from 'src/types/items';
import type { Options, S, ConfigItemSwitch, } from 'src/types/base'
import { Form, FormItemCategory } from 'src/helper/items';

let clog = console.log

@Component({
  selector: 'app-item-switch',
  templateUrl: './item-switch.component.html',
  styleUrls: ['./item-switch.component.sass']
})
export class ItemSwitchComponent implements OnInit {
  @Input() itemsItem: ConfigItemSwitch = {
    category: 'switch',
    key: '',
    label: '',
    options: [
      {label: 'true', value: true},
      {label: 'false', value: false},
    ],
    // checked: false,
    value: false,
  }
  formData: ConfigItemSwitch
  selectOptions: Options<S, S>[]
  constructor () {
    this.formData = this.itemsItem
    this.selectOptions = []
  }
  ngOnInit() {
    this.formData = this.itemsItem
    // this.selectOptions = Form.optionMap?.['category'] || []
    this.selectOptions = FormItemCategory
  }
  categorySelectChangeH() {
    clog('categorySelectChangeH12345')
  }
  keyInputChangeH() {
    clog('keyInputChangeH')
  }
  labelInputChangeH() {
    clog('labelInputChangeH')
  }
  valueInputChangeH() {
    clog('valueInputChangeH')
  }
}
