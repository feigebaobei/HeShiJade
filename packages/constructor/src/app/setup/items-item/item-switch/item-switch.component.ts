import { Component, Input, OnInit } from '@angular/core';
import { ComponentItemSwitch } from 'src/types/items';
import type { Options, S } from 'src/types/base'
import { Form } from 'src/helper/items';

let clog = console.log

@Component({
  selector: 'app-item-switch',
  templateUrl: './item-switch.component.html',
  styleUrls: ['./item-switch.component.sass']
})
export class ItemSwitchComponent implements OnInit {
  @Input() itemsItem: ComponentItemSwitch = {
    category: 'switch',
    key: '',
    label: '',
    checked: false,
  }
  formData: ComponentItemSwitch
  selectOptions: Options<S, S>[]
  constructor () {
    this.formData = this.itemsItem
    this.selectOptions = []
  }
  ngOnInit() {
    this.formData = this.itemsItem
    this.selectOptions = Form.optionMap?.['category'] || []
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
