import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
// import type { ResponseData } from 'src/types';
import type { A, N } from 'src/types/base';
import { VERSION } from 'src/helper';

let clog = console.log

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {
  msg: {}[]
  initVersion: N
  constructor(private http: HttpClient) {
    this.msg = []
    this.initVersion = VERSION
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
