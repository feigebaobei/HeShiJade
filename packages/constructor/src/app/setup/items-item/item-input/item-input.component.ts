import { Component, Input, OnInit, } from '@angular/core';
import { Form } from 'src/helper/items';
// import type { ComponentItemInput } from 'src/types/items';
import type { Options, S, N, A, ConfigItem, ConfigItemsCategoryType } from 'src/types/base';
import { FormItemCategory } from 'src/helper/items'
import { ComponentService } from 'src/app/service/component.service';

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
  @Input() index: N = -1
  formData: ConfigItem
  selectOptions: Options<S, S>[]
  constructor(private componentService: ComponentService) {
    this.formData = this.itemsItem
    // this.selectOptions = []
    this.selectOptions = FormItemCategory
  }
  ngOnInit() {
    // this.selectOptions = Form.optionMap?.['category'] || []
    this.formData = this.itemsItem
  }
  // categorySelectChangeH(v: 'input' | 'textarea' | 'select' | 'number' | 'switch') {
  categorySelectChangeH(v: ConfigItemsCategoryType) {
    this.componentService.setCurComponentCategory(this.index, v)
  }
  keyInputChangeH(v: S) {
    this.componentService.setCurComponentKey(this.index, v)
  }
  labelInputChangeH(v: S) {
    this.componentService.setCurComponentLabel(this.index, v)
  }
  valueInputChangeH(v: S) {
    this.componentService.setCurComponentValue(this.index, v)
  }
}
