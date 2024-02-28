import { Component, Input, OnInit } from '@angular/core';
import { ComponentItemSelect } from 'src/types/items';
import { Form } from 'src/helper/items';
import { Options, S } from 'src/types/base'

let clog = console.log

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.sass']
})
export class ItemSelectComponent implements OnInit {
  @Input() itemsItem: ComponentItemSelect = {
    category: 'select',
    key: '',
    label: '',
    value: '',
    options: [],
  }
  formData: ComponentItemSelect
  selectOptions: Options<S, S>[]
  helpTips: S
  options: S
  constructor() {
    this.selectOptions = []
    this.formData = this.itemsItem
    this.helpTips = "请使用`\|`分隔${label},${value}"
    this.options = ''
  }
  ngOnInit() {
    this.selectOptions = Form.optionMap?.['category'] || []
    this.formData = this.itemsItem
    this.formData.options.forEach(item => {
      this.options += `${item.label}:${item.value},`
    })
    this.options.slice(0, -1)
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
    clog('vlaueInputChangeH')
  }
  valueTextareaChangeH() {
    clog('vlaueTextareaChangeH')
  }
}
