import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { asyncFn, compatibleArray, initComponentMeta } from 'src/helper';
// import shareEvent from 'src/helper/share-event';
import { gridLayoutDefault } from 'src/helper/gridLayout';
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, O, S, ULID } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { CompStackComponent } from '../comp-stack/comp-stack.component';
import type { DropEvent } from 'ng-devui';

let clog = console.log

interface FlexData {
  props: Comp['props']
  slots: Comp['slots']
  items: Comp['items']
  ulid: ULID
}

@Component({
  selector: 'app-flex',
  // standalone: true,
  // imports: [],
  templateUrl: './flex.component.html',
  styleUrl: './flex.component.sass'
})
export class FlexComponent implements OnInit, OnChanges {
  @Input() data!: FlexData
  curPage: Page
  compArr: Comp[]
  show: B
  // @ViewChild('compStack') compStack!: CompStackComponent
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.curPage = this.pageService.getCurPage()!
    this.compArr = []
    this.show = true
  }
  listen() {
    // shareEvent.on()
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.compArr = this.compArr.filter(item => item.ulid !== ulid)
    this.componentService.deleteComponentByUlid(this.curPage.ulid, ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(item => item.ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
  }
  compStackChangeH(p: ChangeGridLayoutParams) {
    let component = this.compArr.find(comp => {
      return comp.ulid === p.ulid
    })
    if (component) {
      component.gridLayout.x = p.x
      component.gridLayout.y = p.y
      component.gridLayout.w = p.w
      component.gridLayout.h = p.h
    }
  }
  dropH(e: DropEvent) {
    this.show = false
    let prevUlid: ULID
    if (this.compArr.length) {
      prevUlid = this.compArr[this.compArr.length - 1].ulid
    } else {
      prevUlid = ''
    }
    let slotKey = `0_${this.data.ulid}`
    let compGridLayout = gridLayoutDefault[e.dragData.item.componentCategory]
    let comp: Comp = initComponentMeta(
      e.dragData.item.componentCategory,
      this.curPage.appUlid, this.curPage.ulid,
      prevUlid,
      '', this.data.ulid,
      {area: 'slots', slotKey},
      {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
    )
    this.compArr.push(comp)
    this.data.slots[slotKey] = comp.ulid
    this.componentService.mountComponent(this.curPage.ulid, comp)
    this.componentService.reqCreateComponent(comp)
    asyncFn(() => {
      this.show = true
    })
  }
  
  ngOnInit() {
    let tree = this.componentService.getTree(this.curPage.ulid)
    let ulid = this.data.slots[`0_${this.data.ulid}`]
    if (ulid) {
      this.compArr = tree?.find(ulid)?.toArray() || []
    } else {
      this.compArr = []
    }
    this.listen()
    asyncFn(() => {
      this.show = false
    }).then(() => {
      this.show = true
    })
    // setInterval(() => {
    //   clog('读取data', this.data)
    // }, 2000)
  }
  ngOnChanges(changes: SimpleChanges): void {
    clog('changes', changes)
  }
  // ngDoCheck() {
  //   clog('123456y')
  // }
}
