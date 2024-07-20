import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import {shareEvent} from 'src/helper';
import type { A } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  @Input() data: A
  constructor(private dataService: DataService) {}
  submitClickH() {
    this.dataService.req(this.data.props.url, 'post', {}).then(res => {
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
