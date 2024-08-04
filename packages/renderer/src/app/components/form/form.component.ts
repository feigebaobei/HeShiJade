import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import {shareEvent} from 'src/helper';
import type { A, S } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() data: A
  props: A
  items: A
  rules: A
  first: S
  constructor(private dataService: DataService) {
    this.props = {} // this.data.props
    this.items = {} //this.data.items
    this.first = 'str'
    this.rules = {
      validators: [
        { required: true },
      ],
      message: 'Enter a'
    }
  }
  ngOnInit() {
    this.props = this.data.props
    this.items = this.data.items
    clog('props', this.props, this.items)
  }
  ngOnChanges() {
    clog('ngOnChanges')
  }
  submitClickH() {
    clog(this.data)
    let data: A = {}
    this.data.items.forEach((item: A) => {
      data[item.key] = item.value
    })
    this.dataService.req(this.data.props.url, 'post', data).then(res => {
      let eventArr = this.data.behavior.filter((item: A) => item.event === 'submit')
      eventArr.forEach((item: A) => {
        if (res.code === 0) {
          shareEvent.emit(item.target, res.data)
        } else {
          // todo 提示
        }
      })
    })
  }
}
