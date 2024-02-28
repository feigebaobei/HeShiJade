import { Component, Input, OnInit, } from '@angular/core';
import { Form } from 'src/helper/items';
import type { ComponentItemInput } from 'src/types/items';
import type { Options, S } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.sass']
})
export class ItemInputComponent implements OnInit {
  @Input() itemsItem: ComponentItemInput = {
    category: 'input',
    key: '',
    label: '',
    value: '',
  }
  formData: ComponentItemInput
  selectOptions: Options<S, S>[]
  constructor() {
    this.formData = this.itemsItem
    this.selectOptions = []
  }
  ngOnInit() {
    this.selectOptions = Form.optionMap?.['category'] || []
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
