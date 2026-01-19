import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { asyncFn, compatibleArray, initComponentMeta } from 'src/helper';
import { gridLayoutDefault } from 'src/helper/gridLayout';
import shareEvent, { creatEventName } from 'src/helper/share-event';
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, O, S, ULID } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { CompStackComponent } from '../comp-stack/comp-stack.component';
import type { DropEvent } from 'ng-devui';
import { TextBase } from 'src/helper/text';

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
export class FlexComponent extends TextBase implements OnInit, OnChanges {
  // @Input() data!: FlexData
  curPage: Page
  // compArr: Comp[]
  compArr: {
    comp: Comp | undefined
    styleObj: O
  }[]
  show: B
  // @ViewChild('compStack') compStack!: CompStackComponent
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    super()
    this.curPage = this.pageService.getCurPage()!
    this.compArr = []
    this.show = true
  }
  listen() {
    shareEvent.on(creatEventName('Flex', this.data.ulid, 'items', 'add'), (obj) => {
      let key = this.createSlotsKey(this.data.items.length - 1)
      this.data.slots[key] = ''
      this.compArr.push({
        comp: undefined,
        styleObj: {
          'order': this.data.items[this.data.items.length - 1]['order'],
          'flex-grow': this.data.items[this.data.items.length - 1]['flexGrow'],
          'flex-shrink': this.data.items[this.data.items.length - 1]['flexShrink'],
          'flex-basis': this.data.items[this.data.items.length - 1]['flexBasis'],
          'align-self': this.data.items[this.data.items.length - 1]['alignSelf'],
        }
      })
      this.componentService.reqUpdateComponent('slots', key, '', this.data.ulid)
    })
    shareEvent.on(creatEventName('Flex', this.data.ulid, 'items', 'remove'), ({index}) => {
      let [{comp}] = this.compArr.splice(index, 1)
      this.componentService.removeSlots(this.createSlotsKey(index))
      this.componentService.reqRemoveSlots(this.createSlotsKey(index))
      if (comp) {
        let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, comp.ulid).map(item => item.ulid)
        this.componentService.deleteComponentByUlid(this.curPage.ulid, comp.ulid)
        this.componentService.reqDeleteComponent(comp.ulid, childrenUlid)
      }
    })
    shareEvent.on(creatEventName('Flex', this.data.ulid, 'items', 'update'), ({key, value, index}) => {
      let item = this.data.items[index]
      this.compArr[index].styleObj = {
        'order': item['order'],
        'flex-grow': item['flexGrow'],
        'flex-shrink': item['flexShrink'],
        'flex-basis': item['flexBasis'],
        'align-self': item['alignSelf'],
      }
    })
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.compArr = this.compArr.filter(item => item.comp?.ulid !== ulid)
    this.componentService.deleteComponentByUlid(this.curPage.ulid, ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(item => item.ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
  }
  dropH(e: DropEvent, index: N) {
    this.show = false
    let prevUlid: ULID = ''
    let slotKey = this.createSlotsKey(index)
    let compGridLayout = gridLayoutDefault[e.dragData.item.componentCategory]
    let comp: Comp = initComponentMeta(
      e.dragData.item.componentCategory,
      this.curPage.appUlid, this.curPage.ulid,
      prevUlid,
      '', this.data.ulid,
      {area: 'slots', slotKey},
      {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
    )
    this.compArr[index] = {
      comp,
      styleObj: {
        'order': this.data.items[index]['order'],
        'flex-grow': this.data.items[index]['flexGrow'],
        'flex-shrink': this.data.items[index]['flexShrink'],
        'flex-basis': this.data.items[index]['flexBasis'],
        'align-self': this.data.items[index]['alignSelf'],
      }
    }
    this.data.slots[slotKey] = comp.ulid
    this.componentService.mountComponent(comp)
    this.componentService.reqCreateComponent(comp)
    this.componentService.reqUpdateComponent('slots', slotKey, comp.ulid, this.data.ulid)
    asyncFn(() => {
      this.show = true
    })
  }
  deleteCompH(ulid: ULID, index: N) {
    this.compArr = this.compArr.map(item => {
      if (item.comp?.ulid === ulid) {
        return {comp: undefined, styleObj: {}}
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
  
  createSlotsKey(index: N) {
    return `${index}_items`
  }
  ngOnInit() {
    let tree = this.componentService.getTree(this.curPage.ulid)
    this.data.items.forEach((item, index) => {
      let compT = tree?.find(this.data.slots[this.createSlotsKey(index)])?.value
      if (compT) {
        this.compArr.push({
          comp: compT,
          styleObj: {},
        })
      } else {
        this.compArr.push({
          comp: undefined,
          styleObj: {},
        })
      }
      this.compArr[index].styleObj = {
          'order': item['order'],
          'flex-grow': item['flexGrow'],
          'flex-shrink': item['flexShrink'],
          'flex-basis': item['flexBasis'],
          'align-self': item['alignSelf'],
        }
    })
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
  // ngDoCheck() {
  //   clog('123456y')
  // }
}
