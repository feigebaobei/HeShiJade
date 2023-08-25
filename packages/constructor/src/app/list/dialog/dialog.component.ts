import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
// import type { ResponseData } from 'src/types';
import type { A } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {
  msg: {}[]
  constructor(private http: HttpClient) {
    this.msg = []
  }
  @Input() data: A
  @Output() newEvent = new EventEmitter()
  // 好像没用上
  // formData = {
  //   key: '',
  //   name: '',
  //   members: '',
  //   theme: '',
  // }
  createBtClickH() {
    this.newEvent.emit('str')
    clog('createBtClickH')
        this.msg = [
          { severity: 'info', summary: 'Absolute', content: 'str', myInfo: 'Devui' },
        ]
  }

}
