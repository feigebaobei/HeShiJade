import { Component, Input, ViewChild } from '@angular/core';
import { compatibleArray } from 'src/helper';
import { AppService } from 'src/app/service/app.service';
// 指令
import { StackDirective } from '../stack.directive';
// 组件
// type
import type { A, Oa, S, N } from 'src/types/base';
import type { Component as Comp, } from 'src/types/component';
import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/types';

let clog = console.log
interface SuperGridItem extends GridStackWidget {
  comp: Comp
  x: N
  y: N
  w: N
  h: N
}

// data

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.sass']
})
export class StackComponent {
  @Input() componentList: Comp[] = []
  @Input() loopIndex: N = -1
  _componentList: SuperGridItem[]
  gridOptions: GridStackOptions
  componentRef: A
  layout: N
  @ViewChild(StackDirective, {static: true}) stack!: StackDirective;
  constructor(private appServer: AppService,) {
    // let componentRef
    this._componentList = []
    this.gridOptions = {
      margin: 2,
      float: true,
      column: 24,
    }
    this.layout = 0
  }
  ngOnInit() {
    this.init()
  }
  init() {
    this._componentList = []
    // clog('init', this.componentList)
    // todo 解决这里为什么有时为undefined的问题
    compatibleArray(this.componentList).forEach(item => {
      this._componentList.push({
        x: item.gridLayout.x,
        y: item.gridLayout.y,
        w: item.gridLayout.w,
        h: item.gridLayout.h,
        id: item.ulid,
        comp: item,
        // noResize: item.gridLayout.noResize,
        noResize: true,
      })
    })
    this.layout = this.appServer.getCurApp()?.layout || 0
  }
  changeCBH($event: A) {
  }
  identify(index: number, w: GridStackWidget) {
    return w.id; // or use index if no id is set and you only modify at the end...
    // return index
  }
}
