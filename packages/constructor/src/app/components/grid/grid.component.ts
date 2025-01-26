import { Component, Input, SimpleChanges } from '@angular/core';
import { asyncFn, initComponentMeta } from 'src/helper';
import { gridLayoutDefault } from 'src/helper/gridLayout';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';

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
export class GridComponent {
  @Input() data!: GridData
  curPage: Page
  compArr: Comp[]
  show: B
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.curPage = this.pageService.getCurPage()!
    this.compArr = []
    this.show = false
  }
  listen() {}
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
      { area: 'slots', slotKey },
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
  }
  ngOnChanges(changes: SimpleChanges): void {
    clog('changes', changes)
  }
}
