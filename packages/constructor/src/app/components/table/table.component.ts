import { AfterViewInit, Component, Input, OnInit, ViewChild,
  // ChangeDetectorRef,
 } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { asyncFn, createChildKey } from 'src/helper/index'
import { initComponentMeta } from 'src/helper';
import { PageService } from 'src/app/service/page.service';
import { compatibleArray } from 'src/helper/index'
import { shareEvent, createEventName } from 'src/helper/share-event';
// 数据
import { gridLayoutDefault } from 'src/helper/gridLayout';
// import { text } from 'src/helper/config';
// type
import type { N, S, D, B, ULID, A } from 'src/types/base';
import type { Component as Comp, ComponentMountItems } from 'src/types/component';
import type { DropEvent } from 'ng-devui';
import type { Page } from 'src/types/page';
import type { DataTableComponent } from 'ng-devui/data-table';
import type { CompStackComponent } from '../comp-stack/comp-stack.component'; 
import { TextBase } from 'src/helper/text';
// import type { Text } from 'src/types/config';

// let gridLayoutDefault: {[k: S]: GridLayoutDefault} = {
//   Button: gridLayoutButtonDefault,
//   Modal: gridLayoutModalDefault,
//   Form: gridLayoutFormDefault,
//   Table: gridLayoutTableDefault,
//   Input: gridLayoutInputDefault,
//   Select: gridLayoutSelectDefault,
//   Icon: gridLayoutIconDefault,
//   Checkbox: gridLayoutCheckboxDefault,
//   Tabs: gridLayoutTabsDefault,
//   Pagination: gridLayoutPaginationDefault,
// }


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
  slots: Comp['slots']
  ulid: ULID
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent extends TextBase implements OnInit, 
AfterViewInit
 {
  // @Input() data!: TableData
  basicDataSource: basicDataSourceItem[]
  compArr: Comp[][]
  createChildKey: typeof createChildKey
  curPage: Page
  // componentList: Comp[] // 未被使用到。todo delete 2025.07.01+
  showList: B[] // 是否显示指定列的组件
  // text: Text
  // @ViewChild(DataTableComponent, { static: true }) datatable: DataTableComponent;
  @ViewChild('datatable') datatable!: DataTableComponent
  @ViewChild('compStack') compStack!: CompStackComponent
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
    // private cdRef: ChangeDetectorRef
  ) {
    super()
    // 若使用4行占位，则使用table的slots列的组件不能都响应，只能当前行可以响应。
    // 所以不得以改为一行。
    // 日后想办法改为4行占位吧。
    // todo 在comp-stack中增加了trackBy.再尝试一次4行占位。
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
    this.compArr = []
    this.createChildKey = createChildKey
    this.curPage = this.pageService.getCurPage()!
    // this.componentList = []
    this.showList = []
    // this.text = text
  }
  ngOnInit(): void {
    let tree = this.componentService.getTree(this.curPage.ulid)
    // todo 删除所有使用childUlid的地方
    this.data.items.forEach((item, index) => {
      let slotsKey = this.data.slots[`${index}_${item['field']}`]
      if (slotsKey) {
        this.compArr.push(tree?.find(slotsKey)?.toArray() || [])
      } else {
        this.compArr.push([])
      }
      this.showList.push(true)
    })
    this.listen()
    new Promise((s, _j) => {
      this.showList = this.showList.fill(false)
      s(true)
    }).then(() => {
      asyncFn(() => {
        this.showList = this.showList.fill(true)
      })
    })
  }
  listen() {
    shareEvent.on(createEventName('Table', this.data.ulid, 'items', 'add'), (_obj) => {
      this.showList.push(true)
      this.compArr.push([])
    })
    shareEvent.on(createEventName('Table', this.data.ulid, 'items', 'remove'), ({index, item}) => {
      // 处理当前组件内的是否显示
      this.showList.splice(index, 1)
      let childComponentArr = this.compArr[index]
      // 删除service中的后代组件
      let childrenUlid: ULID[] = []
      childComponentArr.forEach(comp => {
        childrenUlid.push(comp.ulid)
        this.componentService.deleteComponentByUlid(this.curPage.ulid, comp.ulid)
        this.componentService.getChildrenComponent(this.curPage.ulid, comp.ulid).forEach(subItem => {
          childrenUlid.push(subItem.ulid)
        })
      })
      // 删除远端的后代组件
      this.componentService.reqDeleteComponent('', childrenUlid)
      // 处理当前组件内的子组件
      this.compArr.splice(index, 1)
      // 整理当前组件内的slots
      Object.entries(this.data.slots).forEach(([k, v], subIndex) => {
        let [indexStr, field] = k.split('_')
        let indexNum = Number(indexStr)
        if (indexNum >= index) {
          delete this.data.slots[`${subIndex}_${item.field}`]
          if (indexNum > index) {
            this.data.slots[`${indexNum - 1}_${field}`] = v
          }
        }
      })
      // 删除远端的slots
      this.componentService.reqRemoveSlots(`${index}_${item.field}`)
    })
    shareEvent.on(createEventName('Table', this.data.ulid, 'items', 'update'), ({key, value, index}) => {
      // {key, value, index}
      if (key === 'field') {
        let slotsKeyForDelete = Object.keys(this.data.slots).find((slotsKey) => {
          return slotsKey.split('_')[0] === String(index)
        })
        if (slotsKeyForDelete) {
          // 更新、删除当前组件的slotKey
          this.data.slots[`${index}_${value}`] = this.data.slots[slotsKeyForDelete]
          delete this.data.slots[slotsKeyForDelete]
          // 请求更新slotKey
          this.componentService.reqUpdateComponentSlotkey(this.data.ulid, `${index}_${value}`, slotsKeyForDelete)
        }
      }
    })
    // shareEvent.on(createEventName('Table', this.data.ulid, 'items', 'reorder'), () => {
    // })
  }
  dropH(e: DropEvent, field: S, itemIndex: N) {
    // 在本组件内添加新组件
    // let curPage = this.pageService.getCurPage()
    new Promise((s, _j) => {
      s(true)
    }).then(() => {
      this.showList[itemIndex] = false
      let comp: Comp
      // let key = createChildKey('items', itemIndex, 'component')
      let componentCategory = e.dragData.item.componentCategory
      let compGridLayout = gridLayoutDefault[componentCategory]
      let slotsKey = this.getSlotsKey(itemIndex)
      comp = initComponentMeta(
        componentCategory,
        this.curPage.appUlid, this.curPage.ulid,
        this.compArr[itemIndex][this.compArr[itemIndex].length - 1]?.ulid, '', this.data.ulid,
        {area: 'slots', slotKey: slotsKey}, // 这里的slotKey应该与配置项的field的默认值相同
        {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
        )
      this.compArr[itemIndex].push(comp)
      // 在service中添加新组件
      this.componentService.mountComponent(comp)
      // 更新当前组件的slots
      if (!this.data.slots[slotsKey]) {
        this.data.slots[slotsKey] = comp.ulid
        this.componentService.reqAddSlots(slotsKey, comp.ulid)
      }
      // 在服务端保存新组件
      this.componentService.reqCreateComponent(comp)
      return
    }).then(() => {
      asyncFn(() => {
        this.showList[itemIndex] = true
      })
    })
    // this.cdRef.detectChanges()
  }
  getSlotsKey(itemIndex: N) {
    return `${itemIndex}_${this.data.items[itemIndex]['field']}`
  }
  deleteComponentByUlidH(ulid: ULID, index: N) {
    this.showList[index] = false
    let compForDelete = this.compArr[index].find(comp => comp.ulid === ulid)!
    this.compArr[index] = this.compArr[index].filter(item => item.ulid !== ulid)
    if (this.data.slots[this.getSlotsKey(index)] === ulid) {
      this.data.slots[this.getSlotsKey(index)] = ''
    }
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(comp => comp.ulid)
    this.componentService.deleteComponentByUlid(this.curPage.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
    asyncFn(() => {
      // this.compStack.init()
      this.showList[index] = true
    })
  }
  changeH(obj: A, index: N) {
    this.showList[index] = false
    this.compArr[index].forEach(comp => {
      comp.gridLayout.x = obj.x
      comp.gridLayout.y = obj.y
      comp.gridLayout.w = obj.w
      comp.gridLayout.h = obj.h
    })
    asyncFn(() => {
      this.showList[index] = false
    }).then(() => {
      this.showList[index] = true
    })
  }
  ngAfterViewInit() {
    // clog('ngAfterViewInit datatable', this, this.datatable, this.compStack)
    // 这时才有得到datatable组件
    // clog('')
  }
  // deleteCompH(ulid: ULID, index: N) {
  //   clog('deleteCompH', ulid, index)
  //   let key = createChildKey('items', index, 'component')
  //   this.compObj[key] = this.compObj[key].filter(item => item.ulid !== ulid)
  //   clog(this.compObj[key])
  //   // Array.from(Object.keys(this.compObj)).forEach(key => {
  //   //   this.compObj[key] = [] // this.compObj[key]
  //   //   // this.compObj = {}
  //   // })
  //   // this.cdRef.detectChanges()
  //   asyncFn(() => {
  //     this.compStack.init()
  //   })
  // }
}
