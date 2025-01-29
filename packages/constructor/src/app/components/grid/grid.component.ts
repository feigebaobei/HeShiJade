import { Component, Input, SimpleChanges } from '@angular/core';
import { asyncFn, initComponentMeta } from 'src/helper';
import { gridLayoutDefault } from 'src/helper/gridLayout';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import shareEvent, { creatEventName } from 'src/helper/share-event';

// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, O, S, ULID } from 'src/types/base';
import type { DropEvent } from 'ng-devui';
import type { Page } from 'src/types/page';

let clog = console.log

interface GridData {
  props: Comp['props']
  slots: Comp['slots']
  items: Comp['items']
  ulid: ULID
}

@Component({
  selector: 'app-grid',
  // standalone: true,
  // imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.sass'
})
// todo 整理compArr cArr arrComp compObj show
export class GridComponent {
  @Input() data!: GridData
  curPage: Page
  compArr: Comp[]
  cArr: Comp[][]
  arrComp: (Comp | undefined)[]
  compObj: {[k: S]: Comp[]}
  show: B
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.curPage = this.pageService.getCurPage()!
    this.compArr = []
    this.compObj = {}
    this.show = false
    this.cArr = []
    this.arrComp = []
  }
  listen() {
    shareEvent.on(creatEventName('Grid', this.data.ulid, 'items', 'add'), (obj) => {
      // let key = `${this.data.items.length - 1}_`
      // if (this.data.items.length) {
      //   key
      // }
      let key = this.createSlotsKey(this.data.items.length - 1)
      this.data.slots[key] = ''
      // this.compObj[key] = []
      this.arrComp.push(undefined)
      this.componentService.reqUpdateComponent('slots', key, '', this.data.ulid)
    })
    shareEvent.on(creatEventName('Grid', this.data.ulid, 'items', 'remove'), ({item, index}) => {
      this.arrComp[index] = undefined
      // this.data.slots[`${index}_`] = ''
      this.componentService.removeSlots(`${index}_`)
      this.componentService.reqRemoveSlots(`${index}_`)
    })
    // shareEvent.on(creatEventName('Grid', this.data.ulid, 'items', 'reorder'), (obj) => {
    // })
  }
  createSlotsKey(index: N) {
    return `${index}_items`
  }
  dropH(e: DropEvent, index: N) {
    // this.show = false
    // let prevUlid: ULID
    // if (this.compArr.length) {
    //   prevUlid = this.compArr[this.compArr.length - 1].ulid
    // } else {
    //   prevUlid = ''
    // }
    // let slotKey = `${this.compArr.length}_${this.data.ulid}`
    // let compGridLayout = gridLayoutDefault[e.dragData.item.componentCategory]
    // let comp: Comp = initComponentMeta(
    //   e.dragData.item.componentCategory,
    //   this.curPage.appUlid, this.curPage.ulid,
    //   prevUlid,
    //   '', this.data.ulid,
    //   { area: 'slots', slotKey },
    //   {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
    // )
    // this.compArr.push(comp)
    // this.data.slots[slotKey] = comp.ulid
    // this.componentService.mountComponent(this.curPage.ulid, comp)
    // this.componentService.reqCreateComponent(comp)

    // asyncFn(() => {
    //   this.show = false
    //   let prevUlid: ULID
    //   if (this.cArr[index].length) {
    //     prevUlid = this.cArr[index][this.cArr[index].length - 1].ulid
    //   } else {
    //     prevUlid = ''
    //   }
    //   let slotKey = `${this.cArr[index].length}_items}`
    //   let compGridLayout = gridLayoutDefault[e.dragData.item.componentCategory]
    //   let comp: Comp = initComponentMeta(
    //   e.dragData.item.componentCategory,
    //   this.curPage.appUlid, this.curPage.ulid,
    //   prevUlid,
    //   '', this.data.ulid,
    //   { area: 'slots', slotKey },
    //   {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
    // )
    // this.compArr.push(comp)
    
    asyncFn(() => {
      this.show = false
      let prevUlid: ULID = ''
      let slotKey = this.createSlotsKey(index)
      let compGridLayout = gridLayoutDefault[e.dragData.item.componentCategory]
      let comp: Comp = initComponentMeta(
        e.dragData.item.componentCategory,
        this.curPage.appUlid, this.curPage.ulid,
        prevUlid,
        '', this.data.ulid,
        { area: 'slots', slotKey }, 
        {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
      )
      this.arrComp[index] = comp
      this.data.slots[slotKey] = comp.ulid
      this.componentService.mountComponent(this.curPage.ulid, comp)
      this.componentService.reqCreateComponent(comp)
      // todo 测试
      
      this.componentService.reqUpdateComponent('slots', slotKey, comp.ulid, this.data.ulid)
    }).then(() => {
      this.show = true
    })
  }
  deleteCompH(ulid: ULID, index: N) {
    // this.compArr = this.compArr.filter(item => item.ulid !== ulid)
    this.arrComp = this.arrComp.map(item => {
      if (item?.ulid === ulid) {
        return undefined
      } else {
        return item
      }
    })
    this.componentService.deleteComponentByUlid(this.pageService.getCurPage()!.ulid, ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.pageService.getCurPage()!.ulid, ulid).map(item => item.ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid).then(() => {
      this.componentService.reqUpdateComponent('slots', this.createSlotsKey(index), '', this.data.ulid)
    })
  }
  ngOnInit() {
    let tree = this.componentService.getTree(this.curPage.ulid)
    // let ulid = this.data.slots[`0_${this.data.ulid}`]
    // if (ulid) {
    //   this.compArr = tree?.find(ulid)?.toArray() || []
    // } else {
    //   this.compArr = []
    // }
    // Array.from(Object.entries(this.data.slots)).forEach(([k, v]) => {
    //   // this.compObj[k] = tree?.find(v)?.toArray() || []
    //   // this.cArr.push(this.compObj[k])
    //   this.cArr.push()
    // })
    // clog('arr', this.cArr)

    // Array.from(Object.entries(this.data.slots)).forEach(([_key, ulid]) => {
    //   clog('key', _key, ulid)
    //   let t = tree?.find(ulid)?.value
    //   this.arrComp.push(t)
    // })
    this.data.items.forEach((item, index) => {
      this.arrComp.push(tree?.find(this.data.slots[this.createSlotsKey(index)])?.value)
    })
    clog('aaaa', this.arrComp)
    this.listen()
    asyncFn(() => {
      this.show = false
    }).then(() => {
      this.show = true
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    clog('changes', changes)
  }
}
