import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
// type
import type { N, S, D, A, ULID } from 'src/types/base';
import type { Component as Comp } from 'src/types/component';
import type { DropEvent } from 'ng-devui';
// import type { Tree, Node } from 'src/helper/tree';
import { initComponentMeta } from 'src/helper';
import { PageService } from 'src/app/service/page.service';
import { ulid } from 'ulid';

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
    // items: {
    //   category: 'fill' | 'slots'
    //   field: S
    //   width: S
    //   header: S
    //   child: ULID
    // }[]
    // this.data.items.forEach(item => {
    //   if (item['child']) {
    //     let tree = this.componentService.getTreeByKey()
    //     let node = tree?.find(item['child'])
    //     if (node) {
    //       this.compObj[item['field']] = node.toArray()
    //     } else {
    //       this.compObj[item['field']] = []
    //     }
    //   } else {
    //     this.compObj[item['field']] = []
    //   }
    // })
  }
  ngOnInit(): void {
    // clog('thid.data', this.data)
    // this.data.items: [
    //   {field: 'name', header: '姓名', width: '80px'},
    //   {field: 'a', header: 'a', width: '80px'},
    //   {field: 'd', header: 'd', width: '80px'},
    //   {field: 'id', header: 'id', width: '150px'},
    // ]
    this.data.items.forEach(item => item['category'] = 'fill')
    this.data.items.unshift(
      {
        field: 'gender', header: 'gender', width: '150px',
        category: 'slots',
        child: 'ulidulidulid',
      },
    )
    clog('thid.data', this.data)
    this.data.items.forEach(item => {
      if (item['child']) {
        let tree = this.componentService.getTreeByKey()
        let node = tree?.find(item['child'])
        if (node) {
          this.compObj[item['field']] = node.toArray()
        } else {
          this.compObj[item['field']] = []
        }
      } else {
        this.compObj[item['field']] = []
      }
    })
  }
  dropH(e: DropEvent, field: S) {
    // 在本组件内添加新组件
    let curPage = this.pageService.getCurPage()
    let comp: Comp
    if (this.compObj[field].length) {
      comp = initComponentMeta(e.dragData.item.componentCategory, curPage!.appUlid, curPage!.ulid, this.compObj[field][this.compObj[field].length - 1].ulid || '')
      this.compObj[field].push(comp)
    } else {
      comp = initComponentMeta(
        e.dragData.item.componentCategory,
        curPage!.appUlid,
        curPage!.ulid,
        ''
      )
      this.compObj[field] = [comp]
    }
    // 在service中添加新组件
    // this.componentService.mountComponent(comp, ulid, )
    // 在服务端保存新组件
    // this.componentService.reqPostCompListByPage(comp)
  }
}
