import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { createChildKey } from 'src/helper/index'
// type
import type { N, S, D, A, ULID } from 'src/types/base';
import type { Component as Comp, ComponentMountItems } from 'src/types/component';
import type { DropEvent } from 'ng-devui';
// import type { Tree, Node } from 'src/helper/tree';
import { initComponentMeta } from 'src/helper';
import { PageService } from 'src/app/service/page.service';
// import { ulid } from 'ulid';

let clog = console.log

interface basicDataSourceItem {
  id: N,
  firstName: S,
  lastName: S,
  dob: D,
  gender: S,
  description: S,
}

interface TableData {
  props: Comp['props']
  items: Comp['items']
  ulid: ULID
  mount: ComponentMountItems
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  // @Input() data: A
  @Input() data!: TableData
  basicDataSource: basicDataSourceItem[]
  dataTableOptions: {columns: A[]}
  // @Input() props: {[k: S]: A} = {
  //   size: 'lg', // 'mini'| 'xs' |'sm'|'md'|'lg'
  // }
  compObj: {[k: S]: Comp[]}
  createChildKey: typeof createChildKey
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.basicDataSource = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        dob: new Date(1990, 12, 1),
        gender: 'Male',
        description: 'handsome man'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        gender: 'Female',
        dob: new Date(1989, 1, 1),
        description: 'interesting man'
      },
      {
        id: 3,
        firstName: 'Danni',
        lastName: 'Chen',
        gender: 'Female',
        dob: new Date(1991, 3, 1),
        description: 'pretty man',
        // expandConfig: {description: 'Danni is here'}
      },
      {
        id: 4,
        firstName: 'green',
        lastName: 'gerong',
        gender: 'Male',
        description: 'interesting man',
        dob: new Date(1991, 3, 1),
      },
    ]
    this.dataTableOptions = {
      columns: [
        {
          field: 'firstName',
          header: 'First Name',
          fieldType: 'text',
          // order: 10
        },
        {
          field: 'lastName',
          header: 'Last Name',
          fieldType: 'text',
          // order: 2
        },
        {
          field: 'gender',
          header: 'Gender',
          fieldType: 'text',
          // order: 4
        },
        {
          field: 'dob',
          header: 'Date of birth',
          fieldType: 'date',
          // order: 30
        }
      ]
    }
    this.compObj = {
      // <field>: Comp[]
    }
    this.createChildKey = createChildKey
  }
  ngOnInit(): void {
    this.compObj = {}
    let tree = this.componentService.getTreeByKey()
    this.data.items.forEach((item, index) => {
      if (item['category'] === 'slots') {
        let node = tree?.find(item['childUlid'])
        if (node) {
          // this.compObj[`items_${index}`] = node.toArray()
          this.compObj[createChildKey('items', index, 'component')] = node.toArray()
        }
      }
    })
  }
  dropH(e: DropEvent, field: S, itemIndex: N) {
    // 在本组件内添加新组件
    let curPage = this.pageService.getCurPage()
    let comp: Comp
    let key = createChildKey('items', itemIndex, 'component')
    clog('key', key)
    if (this.compObj[key]?.length) {
      comp = initComponentMeta(
        e.dragData.item.componentCategory,
        curPage!.appUlid, curPage!.ulid,
        this.compObj[key][this.compObj[key].length - 1].ulid, '', this.data.ulid,
        {area: 'items', itemIndex}
        )
      this.compObj[key].push(comp)
    } else {
      comp = initComponentMeta(
        e.dragData.item.componentCategory,
        curPage!.appUlid, curPage!.ulid,
        '', '', this.data.ulid,
        {area: 'items', itemIndex}
      )
      this.compObj[key] = [comp]
    }
    // 在service中添加新组件
    // this.componentService.mountComponent(comp, this.data.ulid, 'items', field, 'field')
    this.componentService.mountComponent(comp)
    // 在服务端保存新组件
    this.componentService.reqPostCompListByPage(comp)
  }
  deleteComponentByUlidH(ulid: ULID, index: N) {
    let key = createChildKey('items', index, 'component')
    this.compObj[key] = this.compObj[key].filter(item => item.ulid !== ulid)
    this.componentService.delete(ulid)
    this.componentService.reqDeleteComponent(ulid)
  }
}
