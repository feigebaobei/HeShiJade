import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
// type
import type { Component as Comp } from 'src/types/component';
import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/types';
import type { A } from 'src/types/base';

interface SuperGridItem extends GridStackWidget {
  comp: Comp
}


@Component({
  selector: 'app-comp-stack',
  // standalone: true,
  // imports: [],
  templateUrl: './comp-stack.component.html',
  styleUrl: './comp-stack.component.sass'
})
export class CompStackComponent implements OnInit{
  @Input() componentList: Comp[] = []
  _componentList: SuperGridItem[]
  gridOptions: GridStackOptions
  curComponent: Comp | undefined
  constructor(
    private componentService: ComponentService,
    private pageService: PageService,
  ) {
    this._componentList = []
    this.gridOptions = {
      margin: 2,
      float: true,
      column: 24,
    }
    this.componentService.curComponent$.subscribe(p => {
      this.curComponent = p
    })
  }
  ngOnInit() {
    this._componentList = this.componentList.map(item => {
      return {
        x: item.gridLayout.x,
        y: item.gridLayout.y,
        w: item.gridLayout.w,
        h: item.gridLayout.h,
        id: item.ulid,
        comp: item,
        noResize: item.gridLayout.noResize,
      }
    })
  }

  changeCBH($event: A) {
    // $event: {
    //   event: Event,
    //   nodes: {
    //     comp: Comp,
    //     el: DOM,
    //     w: N
    //     h: N
    //     x: N
    //     y: N
    //     grid: GridStack
    //   }[]
    //   ...
    // }
    let curNode = this._componentList.find(item => {
      return item.id === $event.nodes[0].id
    })
    if (curNode) {
      curNode.x = $event.nodes[0].x
      curNode.y = $event.nodes[0].y
      curNode.w = $event.nodes[0].w
      curNode.h = $event.nodes[0].h
      this.componentService.setComponentProp('gridLayout', {
        x: $event.nodes[0].x,
        y: $event.nodes[0].y,
        w: $event.nodes[0].w,
        h: $event.nodes[0].h,
      })
      // todo 参数改为kv对的object
      this.componentService.reqUpdateComponentProps('gridLayout', 'x', $event.nodes[0].x, curNode.comp.ulid)
      this.componentService.reqUpdateComponentProps('gridLayout', 'y', $event.nodes[0].y, curNode.comp.ulid)
      this.componentService.reqUpdateComponentProps('gridLayout', 'w', $event.nodes[0].w, curNode.comp.ulid)
      this.componentService.reqUpdateComponentProps('gridLayout', 'h', $event.nodes[0].h, curNode.comp.ulid)
    }
  }
  gridStackItemClickH($event: MouseEvent, item: SuperGridItem) {
    $event.stopPropagation()
    let curPage = this.pageService.getCurPage()
    if (curPage) {
      if (this.curComponent) {
        if (item.id !== this.curComponent.ulid) {
          this.componentService.setCurComponent(curPage.ulid, item.id)
        }
      } else {
        this.componentService.setCurComponent(curPage.ulid, item.id)
      }
    }
  }
}
