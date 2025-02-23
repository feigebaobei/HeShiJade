import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { asyncFn, clog } from 'src/helper';

import { pool } from 'src/helper/utils';
// type
import type { B, O, N, S } from 'src/types/base';
import type { Component as Comp, componentInstanceData } from 'src/types/component'
@Component({
  selector: 'app-layout',
  // standalone: true,
  // imports: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  headerAreaCompArr: Comp[]
  leftAreaCompArr: Comp[]
  mainAreaCompArr: Comp[]
  rightAreaCompArr: Comp[]
  footerAreaCompArr: Comp[]
  showObj: {[k: S]: B}
  styleObj: O
  mainStyleObj: O
  constructor(
    private componentService: ComponentService
  ) {
    this.headerAreaCompArr = []
    this.leftAreaCompArr = []
    this.mainAreaCompArr = []
    this.rightAreaCompArr = []
    this.footerAreaCompArr = []
    this.showObj = {
      header: false,
      left: false,
      main: false,
      right: false,
      footer: false,
    }
    this.styleObj = {}
    this.mainStyleObj = {}
  }
  ngOnInit(): void {
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', undefined, this)
    let tree = this.componentService.getTreeByKey()
    this.styleObj = {
      // 'grid-template-rows': `${this.data.props['headerHeight']} calc(100% - 66px) ${this.data.props['footerHeight']}`,
      // 'grid-template-rows': `${this.data.props['headerHeight']} auto ${this.data.props['footerHeight']}`,
      'grid-template-rows': `${this.data.props['headerHeight']} ${this.data.props['mainHeight']} ${this.data.props['footerHeight']}`,
      'grid-template-columns': `${this.data.props['leftWidth']} ${this.data.props['mainWidth']} ${this.data.props['rightWidth']}`,
    }
    this.mainStyleObj = {
      // height: this.data.props['mainHeight']
    }
    clog('this.styleObj', this.styleObj)
    asyncFn(() => {
      Object.entries(this.data.slots).forEach(([area, ulid]) => {
        switch (area) {
          case 'header':
            this.headerAreaCompArr.push(...(tree?.find(ulid)?.toArray() || []))
            this.showObj['header'] = true
            break;
          case 'left':
            this.leftAreaCompArr.push(...(tree?.find(ulid)?.toArray() || []))
            this.showObj['left'] = true
            break;
          case 'main':
            this.mainAreaCompArr.push(...(tree?.find(ulid)?.toArray() || []))
            this.showObj['main'] = true
            break;
          case 'right':
            this.rightAreaCompArr.push(...(tree?.find(ulid)?.toArray() || []))
            this.showObj['right'] = true
            break;
          case 'footer':
            this.footerAreaCompArr.push(...(tree?.find(ulid)?.toArray() || []))
            asyncFn(() => {

              this.showObj['footer'] = true
            })
            break;
        }
      })
    })
  }
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', undefined, this)
  }
  ngDoCheck() {
    pool.trigger(this.data.ulid, 'postComponentNgDoCheck', undefined, this)
  }
  ngAfterViewInit() {
    pool.trigger(this.data.ulid, 'postComponentNgAfterViewInit', undefined, this)
    pool.resolveComponentRender(this.data.pageUlid, this.data.ulid)
  }
  ngOnDestroy(): void {
    pool.trigger(this.data.ulid, 'postComponentNgOnDestroy', undefined, this)
    pool.unRegister(this.data.ulid)
  }
}
