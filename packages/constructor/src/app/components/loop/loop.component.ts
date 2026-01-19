import { Component, effect, Input, } from '@angular/core';
import { gridLayoutDefault } from 'src/helper/gridLayout';
import { asyncFn, createChildKey } from 'src/helper/index'
import shareEvent, { creatEventName } from 'src/helper/share-event';
import { initComponentMeta } from 'src/helper';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
import { Page } from 'src/types/page';
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, S, ULID, O, } from 'src/types/base';
import type { DropEvent } from 'ng-devui';
import { TextBase } from 'src/helper/text';

let clog = console.log

interface LoopData {
  props: Comp['props']
  slots: Comp['slots']
  ulid: ULID
}

@Component({
  selector: 'app-loop',
  // standalone: true,
  // imports: [],
  templateUrl: './loop.component.html',
  styleUrl: './loop.component.sass'
})
export class LoopComponent extends TextBase {
  // @Input() data!: LoopData
  childComp: Comp | null
  curPage: Page
  msgs: O[]
  mockArr: N[]
  styleObj: O
  itemStyleObj: O
  curComponent: Comp | undefined
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    super()
    this.childComp = null
    this.curPage = this.pageService.getCurPage()!
    this.msgs = []
    this.mockArr = []
    this.styleObj = {}
    this.itemStyleObj = {}
    effect(() => {
      this.curComponent = this.componentService.curComponentS.get()
    })
  }
  listen() {
    // 只有loop/layout组件监听了props的更新事件。
    // todo 检查是否可以换成别的逻辑。
    shareEvent.on(creatEventName('Loop', this.data.ulid, 'props', 'update'), (obj) => {
      this.setStyle()
    })
  }
  dropH(e: DropEvent) {
    if (this.childComp) {
      this.msgs = [{ severity: 'error', summary: '提示', content: '循环组件最多有一种子组件。' }]
      return
    }
    let componentCategory = e.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[componentCategory]
    this.childComp = initComponentMeta(
      componentCategory,
      this.curPage.appUlid, this.curPage.ulid,
      '',
      '', this.data.ulid,
      { area: 'slots', slotKey: 'body' },
      { x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize },
    )
    this.componentService.mountComponent(this.childComp)
    this.componentService.reqCreateComponent(this.childComp)
  }
  gridStackItemClickH($event: MouseEvent, item: Comp) {
    $event.stopPropagation()
    let curPage = this.pageService.getCurPage()
    if (curPage) {
      if (this.curComponent) {
        if (item.ulid !== this.curComponent.ulid) {
          this.componentService.setCurComponent(curPage.ulid, item.ulid)
        }
      } else {
        this.componentService.setCurComponent(curPage.ulid, item.ulid)
      }
    }
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.childComp = null
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteComponentByUlid(this.curPage.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
  }
  setStyle() {
    switch (this.data.props['layout']) {
      case 'flex':
        this.styleObj = {
          'justify-content': this.data.props['justifyContentFlex'],
          'align-items': this.data.props['alignItemsFlex'],
          'flex-direction': this.data.props['flexDirection'],
          'flex-wrap': this.data.props['flexWrap'],
          'row-gap': this.data.props['rowGap'],
          'column-gap': this.data.props['columnGap'],
        }
        this.itemStyleObj = {
          'flex-grow': this.data.props['flexGrow'],
          'flex-shrink': this.data.props['flexShrink'],
          'flex-basis': this.data.props['flexBasis'],
          'height': this.data.props['itemHeight'],
        }
        break;
      case 'grid':
        this.styleObj = {
          'grid-template-columns': this.data.props['gridTemplateColumns'],
          'grid-template-rows': this.data.props['gridTemplateRows'],
          'grid-auto-flow': this.data.props['gridAutoFlow'],
          'justify-items': this.data.props['justifyItemsGrid'],
          'align-items': this.data.props['alignItemsGrid'],
          'align-content': this.data.props['alignContentGrid'],
        }
        this.itemStyleObj = {
          // width: '250px'
        }
        break;
      default:
        this.styleObj = {}
        this.itemStyleObj = {}
        break;
    }
  }
  ngOnInit() {
    let tree = this.componentService.getTree(this.curPage.ulid)
    let node = tree?.find(this.data.ulid)
    let bodyNode = node?.children[createChildKey('slots', 'body', 'node')]
    let arr = bodyNode?.toArray()
    if (arr?.length) {
      this.childComp = arr[0]
    }
    this.mockArr = new Array(this.data.props['mockCount'] || 0).fill(1)
    asyncFn(() => { this.setStyle() }, 0)
    this.listen()
  }
}
