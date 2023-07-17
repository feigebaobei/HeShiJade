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
  formData = {
    key: '',
    name: '',
    members: '',
  }
  createBtClickH() {
    this.newEvent.emit('str')
    clog('createBtClickH')
        this.msg = [
          { severity: 'info', summary: 'Absolute', content: 'str', myInfo: 'Devui' },
        ]


    // this.http.post<ResponseData>('http://localhost:5000/apps', {
    //   key: '',
    //   name: '',
    //   ulid: '',
    //   members: '',
    // }).subscribe((res) => {
    //   if (res.code === 0) {
    //     this.msg = [
    //       { severity: 'info', summary: 'Relative', detail: `<a href="/home" target="_blank">Back to Home Page</a>` },
    //       { severity: 'info', summary: 'Absolute', content: 'str', myInfo: 'Devui' },
    //     ]
    //   }
    // })


  }

}
