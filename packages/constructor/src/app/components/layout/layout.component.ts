import { Component, Input, } from '@angular/core';
import shareEvent, { creatEventName } from 'src/helper/share-event';
import { asyncFn, initComponentMeta } from 'src/helper';
import { gridLayoutDefault } from 'src/helper/gridLayout';
import { text } from 'src/helper/config';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, O, S, ULID } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { CompStackComponent } from '../comp-stack/comp-stack.component';
import type { DropEvent } from 'ng-devui';
import type { Text } from 'src/types/config';

let clog = console.log

interface LayoutData {
  props: Comp['props']
  slots: Comp['slots']
  items: Comp['items']
  ulid: ULID
}
interface ShowObj {
  header: B
  left: B
  main: B
  right: B
  footer: B
}
type K = keyof ShowObj

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
  showObj: ShowObj
  curPage: Page
  text: Text
  styleObj: O
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
    this.text = text
    this.styleObj = {}
  }
  listen() {
    shareEvent.on(creatEventName('Layout', this.data.ulid, 'props', 'update'), (obj) => {
      asyncFn(() => {
        this.showObj[obj.key as K] = obj.value
      })
    })
  }
  deleteComponentByUlidH(ulid: ULID, area: S) {
    switch (area) {
      case 'header':
        this.headerAreaCompArr = this.headerAreaCompArr.filter(item => item.ulid !== ulid)
        break;
      case 'left':
        this.leftAreaCompArr = this.leftAreaCompArr.filter(item => item.ulid !== ulid)
        break;
      case 'main':
        this.mainAreaCompArr = this.mainAreaCompArr.filter(item => item.ulid !== ulid)
        break;
      case 'right':
        this.rightAreaCompArr = this.rightAreaCompArr.filter(item => item.ulid !== ulid)
        break;
      case 'footer':
        this.footerAreaCompArr = this.footerAreaCompArr.filter(item => item.ulid !== ulid)
        break;
    }
    this.componentService.deleteComponentByUlid(this.curPage.ulid, ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(item => item.ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
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
        this.componentService.mountComponent(comp)
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
        this.componentService.mountComponent(comp)
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
        this.componentService.mountComponent(comp)
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
        this.componentService.mountComponent(comp)
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
        this.componentService.mountComponent(comp)
        this.componentService.reqCreateComponent(comp)
        this.showObj.footer = false
        asyncFn(() => {
          this.showObj.footer = true
        })
        break;
    }
  }
  compStackChangeH(p: ChangeGridLayoutParams) {
    // clog('compStackChangeH', p)
  }
  ngOnInit() {
    this.setArr()
    // 这里的样式需要异步处理，否则gridstack组件不能有处理高度、浮动。
    asyncFn(() => {
      this.styleObj = {
        'grid-template-rows': `${this.data.props['headerHeight']} ${this.data.props['mainHeight']} ${this.data.props['footerHeight']}`,
        'grid-template-columns': `${this.data.props['leftWidth']} ${this.data.props['mainWidth']} ${this.data.props['rightWidth']}`,
      }
    })
    this.listen()
  }
  setArr() {
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

  }
  // ngOnChanges() {
  //   clog('changes')
  // }
}
