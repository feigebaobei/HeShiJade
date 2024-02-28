import { Component, Input, OnInit } from '@angular/core';
import { Form } from 'src/helper/items';
import type { ComponentItemInput } from 'src/types/items';
import type { Options, S } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent implements OnInit {
  @Input() itemsItem: ComponentItemInput = {
    category: 'input',
    key: '',
    label: '',
    value: '',
  }
  // formData: ComponentItemInput
  // selectOptions: Options<S, S>[]
  // constructor() {
  //   this.formData = this.itemsItem
  //   this.selectOptions = []
  // }
  // ngOnInit() {
  //   this.selectOptions = Form.optionMap?.['category'] || []
  // }
  // categorySelectChangeH() {
  //   clog('categorySelectChangeH12345')
  // }
  // keyInputChangeH() {
  //   clog('keyInputChangeH')
  // }
  // labelInputChangeH() {
  //   clog('labelInputChangeH')
  // }
  // valueInputChangeH() {
  //   clog('valueInputChangeH')
  // }

  constructor() {}
  ngOnInit(): void {
  }
}
