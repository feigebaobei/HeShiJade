import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { cdir } from 'src/helper';
// type
import type { A } from 'src/types/base';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  @Input() data: A
  basicDataSource: A[]
  constructor(private dataService: DataService) {
    this.basicDataSource = [
      // {
      //   id: 1,
      //   name: 'name',
      //   a: 'a',
      //   d: 'd',
      // },
    ]
  }
  req() {
    this.dataService.req(this.data.props.url, this.data.props.method || 'get', {}).then(res => {
      if (res.code === 0) {
        this.basicDataSource = res.data
      } else {
        cdir({
          ulid: this.data.ulid,
          type: 'Table',
          res: res,
          message: '这个组件的接口返回的数据出错了。'
        })
      }
    })
  }
  ngOnInit() {
    this.req()
  }
}
