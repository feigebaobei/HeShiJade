import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { DataService } from 'src/app/service/data.service';
import { cdir, clog } from 'src/helper';
import { createChildKey } from 'src/helper/index'
// type
import type { A, S, ULID, N, D, ReqMethod, } from 'src/types/base';
import type { Component as Comp, ComponentMountItems } from 'src/types/component';

// interface basicDataSourceItem {
//   id: N,
//   firstName: S,
//   lastName: S,
//   dob: D,
//   gender: S,
//   description: S,
// }

interface TableData {
  props: Comp['props']
  items: Comp['items']
  ulid: ULID
  mount: ComponentMountItems
}

// let clog = console

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  // @Input() data: A
  @Input() data!: TableData
  basicDataSource: A[]
  createChildKey: typeof createChildKey
  compObj: {[k: S]: Comp[]}
  constructor(private dataService: DataService,
    private componentService: ComponentService
    ) {
    this.basicDataSource = [
      // {
      //   id: 1,
      //   name: 'name',
      //   a: 'a',
      //   d: 'd',
      // },
    ]
    this.createChildKey = createChildKey
    this.compObj = {}
  }
  ngOnInit(): void {
    this.req()
    this.compObj = {}
    let tree = this.componentService.getTreeByKey()
    this.data.items.forEach((item, index) => {
      if (item['category'] === 'slots') {
        let node = tree?.find(item['childUlid'] || '')
        if (node) {
          this.compObj[createChildKey('items', index, 'component')] = node.toArray()
        }
      }
    })
    clog('compObj',this.compObj)
  }
  req() {
    this.dataService.req((this.data.props['url'] as S), ((this.data.props['method'] || 'get') as ReqMethod), {}).then(res => {
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
  // ngOnInit() {
  //   this.req()
  // }
}
