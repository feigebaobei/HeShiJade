import { Component, Input, } from '@angular/core';
import shareEvent, { creatEventName } from 'src/helper/share-event';
import { asyncFn, initComponentMeta } from 'src/helper';
import { gridLayoutDefault } from 'src/helper/gridLayout';
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, O, S, ULID } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { CompStackComponent } from '../comp-stack/comp-stack.component';
import type { DropEvent } from 'ng-devui';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';

let clog = console.log

interface LayoutData {
  props: Comp['props']
  slots: Comp['slots']
  items: Comp['items']
  ulid: ULID
}

@Component({
  selector: 'app-layout',
  // standalone: true,
  // imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {
  @Input() data!: LayoutData
  headerAreaCompArr: Comp[]
  leftAreaCompArr: Comp[]
  mainAreaCompArr: Comp[]
  rightAreaCompArr: Comp[]
  footerAreaCompArr: Comp[]
  showObj: {
    header: B
    left: B
    main: B
    right: B
    footer: B
  }
  curPage: Page
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.curPage = this.pageService.getCurPage()!
    this.headerAreaCompArr = []
    this.leftAreaCompArr = []
    this.mainAreaCompArr = []
    this.rightAreaCompArr = []
    this.footerAreaCompArr = []
    this.showObj = {
      header: true,
      left: true,
      main: true,
      right: true,
      footer: true,
    }
  }
  listen() {
    shareEvent.on(creatEventName('Layout', this.data.ulid, 'props', 'update'), ({key, value}) => {
    })
  }
  
  deleteComponentByUlidH(ulid: ULID, area: S) {
  }
  
  dropH(e: DropEvent, area: S) {
    let componentCategory = e.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[e.dragData.item.componentCategory]
    let comp: Comp
    let prevUlid: ULID
    let slotKey: S
    switch (area) {
      case 'header':
        prevUlid = ''
        slotKey = 'header'
        comp = initComponentMeta(
          componentCategory,
          this.curPage.appUlid, this.curPage.ulid,
          prevUlid,
          '', this.data.ulid,
          {area: 'slots', slotKey},
          {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
        )
        if (this.headerAreaCompArr.length) {
          comp.prevUlid = this.headerAreaCompArr[this.headerAreaCompArr.length - 1].ulid
          this.headerAreaCompArr.push(comp)
        } else {
          this.headerAreaCompArr = [comp]
          this.data.slots[slotKey] = comp.ulid
        }
        this.componentService.mountComponent(this.curPage.ulid, comp)
        this.componentService.reqCreateComponent(comp)
        this.showObj.header = false
        asyncFn(() => {
          this.showObj.header = true
        })
        break;
      case 'left':
        prevUlid = ''
        slotKey = 'left'
        comp = initComponentMeta(
          componentCategory,
          this.curPage.appUlid, this.curPage.ulid,
          prevUlid,
          '', this.data.ulid,
          {area: 'slots', slotKey},
          {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
        )
        if (this.leftAreaCompArr.length) {
          comp.prevUlid = this.leftAreaCompArr[this.leftAreaCompArr.length - 1].ulid
          this.leftAreaCompArr.push(comp)
        } else {
          this.leftAreaCompArr = [comp]
          this.data.slots[slotKey] = comp.ulid
        }
        this.componentService.mountComponent(this.curPage.ulid, comp)
        this.componentService.reqCreateComponent(comp)
        this.showObj.left = false
        asyncFn(() => {
          this.showObj.left = true
        })
        break;
      case 'main':
        prevUlid = ''
        slotKey = 'main'
        comp = initComponentMeta(
          componentCategory,
          this.curPage.appUlid, this.curPage.ulid,
          prevUlid,
          '', this.data.ulid,
          {area: 'slots', slotKey},
          {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
        )
        if (this.mainAreaCompArr.length) {
          comp.prevUlid = this.mainAreaCompArr[this.mainAreaCompArr.length - 1].ulid
          this.mainAreaCompArr.push(comp)
        } else {
          this.mainAreaCompArr = [comp]
          this.data.slots[slotKey] = comp.ulid
        }
        this.componentService.mountComponent(this.curPage.ulid, comp)
        this.componentService.reqCreateComponent(comp)
        this.showObj.main = false
        asyncFn(() => {
          this.showObj.main = true
        })
        break;
      case 'right':
        prevUlid = ''
        slotKey = 'right'
        comp = initComponentMeta(
          componentCategory,
          this.curPage.appUlid, this.curPage.ulid,
          prevUlid,
          '', this.data.ulid,
          {area: 'slots', slotKey},
          {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
        )
        if (this.rightAreaCompArr.length) {
          comp.prevUlid = this.rightAreaCompArr[this.rightAreaCompArr.length - 1].ulid
          this.rightAreaCompArr.push(comp)
        } else {
          this.rightAreaCompArr = [comp]
          this.data.slots[slotKey] = comp.ulid
        }
        this.componentService.mountComponent(this.curPage.ulid, comp)
        this.componentService.reqCreateComponent(comp)
        this.showObj.right = false
        asyncFn(() => {
          this.showObj.right = true
        })
        break;
      case 'footer':
        prevUlid = ''
        slotKey = 'footer'
        comp = initComponentMeta(
          componentCategory,
          this.curPage.appUlid, this.curPage.ulid,
          prevUlid,
          '', this.data.ulid,
          {area: 'slots', slotKey},
          {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
        )
        if (this.footerAreaCompArr.length) {
          comp.prevUlid = this.footerAreaCompArr[this.footerAreaCompArr.length - 1].ulid
          this.footerAreaCompArr.push(comp)
        } else {
          this.footerAreaCompArr = [comp]
          this.data.slots[slotKey] = comp.ulid
        }
        this.componentService.mountComponent(this.curPage.ulid, comp)
        this.componentService.reqCreateComponent(comp)
        this.showObj.footer = false
        asyncFn(() => {
          this.showObj.footer = true
        })
        break;
    }
  }
  compStackChangeH(p: ChangeGridLayoutParams) {}
  ngOnInit() {
    let tree = this.componentService.getTree(this.curPage.ulid)
    Object.entries(this.data.slots).forEach(([key, value]) => {
      switch (key) {
        case 'header':
          this.headerAreaCompArr.push(...(tree?.find(value)?.toArray() || []))
          break;
        case 'left':
          this.leftAreaCompArr.push(...(tree?.find(value)?.toArray() || []))
          break;
        case 'main':
          this.mainAreaCompArr.push(...(tree?.find(value)?.toArray() || []))
          break;
        case 'right':
          this.rightAreaCompArr.push(...(tree?.find(value)?.toArray() || []))
          break;
        case 'footer':
          this.footerAreaCompArr.push(...(tree?.find(value)?.toArray() || []))
          break;
      }
    })
    this.listen()
  }
  // ngOnChanges() {
  //   clog('changes')
  // }
}
