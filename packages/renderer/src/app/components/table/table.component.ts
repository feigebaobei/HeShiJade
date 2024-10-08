import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { DataService } from 'src/app/service/data.service';
import { cdir, clog } from 'src/helper';
import { createChildKey } from 'src/helper/index'
// import { shareEvent } from 'src/helper';
import { pool } from 'src/helper/pool';
// type
import type { A, S, ULID, O, D, ReqMethod, B, } from 'src/types/base';
import type { Component as Comp, ComponentMountItems, componentInstanceData } from 'src/types/component';

// interface basicDataSourceItem {
//   id: N,
//   firstName: S,
//   lastName: S,
//   dob: D,
//   gender: S,
//   description: S,
// }

// interface TableData {
//   props: Comp['props']
//   items: Comp['items']
//   ulid: ULID
//   mount: ComponentMountItems
// }

// let clog = console

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  @Input() data!: componentInstanceData
  basicDataSource: A[]
  createChildKey: typeof createChildKey
  compObj: {[k: S]: Comp[]}
  showList: B[]
  constructor(private dataService: DataService,
    private componentService: ComponentService
    ) {
    this.basicDataSource = [
    ]
    this.createChildKey = createChildKey
    this.compObj = {}
    this.showList= []
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
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  ngOnInit(): void {
    new Promise((s, _j) => {
      s(true)
    }).then(() => {
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
        this.showList.push(true)
      })
      return true
    })
    // shareEvent.on(this.data.ulid, (payload) => {
    //   this.basicDataSource = payload
    // })
    pool.register(this.data.ulid, this, this.data.behavior)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
  }
  // ngOnInit() {
  //   this.req()
  // }
  // dataTable组件的方法 start
  // getCheckedRows
  // setRowCheckStatus
  // setTableCheckStatus
  // getRowChildToggleStatus
  // setTableChildrenToggleStatus
  // cancelEditingStatus
  // dataTable组件的方法 end
}
