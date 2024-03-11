import { Component, Input, OnInit, } from '@angular/core';
import { Form } from 'src/helper/items';
// import type { ComponentItemInput } from 'src/types/items';
import type { Options, S, ConfigItem } from 'src/types/base';
import { FormItemCategory } from 'src/helper/items'

let clog = console.log

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.sass']
})
export class ItemInputComponent implements OnInit {
  @Input() itemsItem: ConfigItem = {
    category: 'input',
    key: '',
    label: '',
    value: '',
  }
  formData: ConfigItem
  selectOptions: Options<S, S>[]
  constructor() {
    this.formData = this.itemsItem
    // this.selectOptions = []
    this.selectOptions = FormItemCategory
  }
  ngOnInit() {
    // this.selectOptions = Form.optionMap?.['category'] || []
    this.formData = this.itemsItem
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
