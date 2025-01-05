import { Component, effect, OnInit, ViewChild, } from '@angular/core';
import { AppService } from '../service/app.service';
import { ComponentService } from '../service/component.service';
import { PageService } from '../service/page.service';
import { ActivatedRoute } from '@angular/router';
import { asyncFn, initComponentMeta } from 'src/helper'
// module
import { ItemsModule } from '../items/items.module';
import { BehaviorModule } from '../behavior/behavior.module';
import { PropsModule } from '../props/props.module';
import { ComponentsModule } from '../components/components.module';
import { PageListModule } from '../page-list/page-list.module';
import { CommonModule, Location } from '@angular/common';
// import { GridstackModule } from 'gridstack/dist/angular'
// 组件
// import { ComponentListComponent } from './component-list/component-list.component';
import { ComponentListModule } from '../component-list/component-list.module';
// devui
import { ToastModule, TabsModule, ButtonModule, DragDropModule, } from 'ng-devui';
// 数据
import {
  Button as gridLayoutButtonDefault,
  Modal as gridLayoutModalDefault,
  Form as gridLayoutFormDefault,
  Table as gridLayoutTableDefault,
  Input as gridLayoutInputDefault,
  Select as gridLayoutSelectDefault,
  Icon as gridLayoutIconDefault,
  Checkbox as gridLayoutCheckboxDefault,
  Tabs as gridLayoutTabsDefault,
  Pagination as gridLayoutPaginationDefault,
} from 'src/helper/gridLayout'
// 类型
import type { A, S, N, B, ULID, } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { Category, Component as Comp,
  //  componentConfig as componentConfigT
   } from 'src/types/component';
import type { DropEvent } from 'ng-devui';
import type { App } from 'src/types/app';
import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/types';
import type { GridLayoutDefault } from "src/types/component"
// import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/angular';
import type { CompStackComponent } from '../components/comp-stack/comp-stack.component';

// let componentDefaultConfigAll = all

let clog = console.log
// let CDM: Record<S, componentConfigT> = componentConfig

interface SuperGridItem extends GridStackWidget {
  comp: Comp
}

let gridLayoutDefault: {[k: S]: GridLayoutDefault} = {
  Button: gridLayoutButtonDefault,
  Modal: gridLayoutModalDefault,
  Form: gridLayoutFormDefault,
  Table: gridLayoutTableDefault,
  Input: gridLayoutInputDefault,
  Select: gridLayoutSelectDefault,
  Icon: gridLayoutIconDefault,
  Checkbox: gridLayoutCheckboxDefault,
  Tabs: gridLayoutTabsDefault,
  Pagination: gridLayoutPaginationDefault,
}

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    // DevUIModule,
    ToastModule,
    TabsModule,
    ButtonModule,
    DragDropModule,
    // GridstackModule,

    ItemsModule,
    BehaviorModule,
    PropsModule,
    ComponentsModule,
    PageListModule,
    // ComponentListComponent,
    ComponentListModule,
    CommonModule,
  ],
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass']
})
export class SetupComponent implements OnInit {
  curApp: App | undefined
  curPage: Page | undefined
  curComponent: Comp | undefined
  leftTabActive: S | N
  rightTabActive: S | N
  componentCategoryList: Category[]
  componentByPage: SuperGridItem[]
  pageList: Page[]
  msg: {}[]
  pageData: A[]
  gridOptions: GridStackOptions // todo 删除gridStack相关的代码
  componentList: Comp[]
  show: B
  @ViewChild('compStack') compStack!: CompStackComponent
  constructor(
    private appService: AppService,
    private pageService: PageService,
    private componentService: ComponentService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.leftTabActive = 'page'
    this.rightTabActive = 'props'
    this.componentCategoryList = []
    this.componentByPage = []
    this.pageList = []
    this.msg = []
    this.pageData = []
    this.componentList = []
    effect(() => {
      let p =this.pageService.pageS.get()
      this.curPage = p
      // 取出当前页面的组件
      if (this.curPage) {
        this.componentService.getComponentList(this.curPage).then((componentList) => {
          this.show = false
          this.componentByPage = []
          this.componentList = componentList
          componentList.forEach(component => {
            this.componentByPage.push({
              x: component.gridLayout.x,
              y: component.gridLayout.y,
              w: component.gridLayout.w,
              h: component.gridLayout.h,
              id: component.ulid,
              comp: component,
              noResize: component.gridLayout.noResize,
            })
          })
          asyncFn(() => {
            this.show = true
          })
        })
      } else {
        this.componentByPage = []
        this.componentList = []
        asyncFn(() => {
          this.show = true
        })
      }
    })
    this.gridOptions = {
      margin: 2,
      // padding: 8,
      float: true,
      column: 24,
    }
    this.curComponent = undefined
    effect(() => {
      this.curComponent = this.componentService.curComponentS.get()
    })
    this.show = true
  }
  viewBtClickH() {
    window.open(`${location.protocol}//${location.hostname}:${4210}/${this.appService.getCurApp()?.key}/dev/${this.curPage?.key}`, '_blank')
  }
  gobackButtonClickH() {
    this.location.back()
  }
  activeTabChange(tab: A) {
    console.log(tab);
  }
  ngOnInit(): void {
    this.opApp().then(() => { // 取组件列表 setCurPage
      return this.pageService.getPageList(this.curApp!.ulid).then(pl => {
        if (pl[0]) {
          this.pageService.setCurPage(this.curApp!.ulid, pl[0].ulid)
          return true
        } else {
          return Promise.reject('无页面')
        }
      })
    })
  }
  opApp() {
    let appUlid = String(this.route.snapshot.queryParamMap.get('app'))
    return this.appService.getAppList().then(appList => {
      if (appList) {
        this.appService.setCurApp(appUlid)
        return true
      } else {
        // alert('您无此应用的权限')
        return Promise.reject('您无此应用的权限')
      }
    }).then(() => { // 取当前应用 setCurApp
      this.curApp = this.appService.getCurApp()
      if (this.curApp) {
        return true
      } else {
        return Promise.reject('该应用不存在')
      }
    }).catch((msg) => {
      clog(msg)
    })
  }
  onDrop(e: DropEvent) {
    // 请求后端保存组件时保存到本地。
    let curPage = this.curPage
    if (!curPage) {
      this.msg = [{ severity: 'error', summary: '', content: '当前未选中页面，无法创建组件。请先选中页面。' }];
      return
    }
    let heightMax = 0
    this.componentByPage.forEach(item => {
      let n = (item.y || 0) + (item.h || 0)
      if (n > heightMax) {
        heightMax = n
      }
    })
    let componentCategory: S = e.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[componentCategory]
    let compObj: Comp = initComponentMeta(
      componentCategory, 
      curPage!.appUlid, curPage!.ulid, 
      this.componentByPage[this.componentByPage.length - 1]?.comp.ulid || '', '', '',
      {area: ''},
      {x: 0, y: heightMax, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize}
    )
    let gridObj = {
        ...compObj.gridLayout,
        id: compObj.ulid,
        comp: compObj
      }
    this.componentByPage.push(gridObj)
    this.componentList.push(compObj)
    this.componentService.mountComponent(curPage!.ulid, compObj)
    this.componentService.reqCreateComponent(compObj).then(() => {
      clog('成功在远端保存组件')
    }).catch(error => {
      clog('error', error)
    })
    asyncFn(() => {
      this.compStack.init()
    })
  }
  stageClickH($event: A) {
    let classList = Array.from($event.target.classList)
    if (classList.includes('grid-stack') || classList.includes('center')) {
      if (this.curPage) {
        clog('stageClickH', this.curPage)
        this.componentService.setCurComponent(this.curPage.ulid, '')
      }
    }
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.componentByPage = this.componentByPage.filter(item => item.id !== ulid)
    this.componentList = this.componentList.filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.curPage!.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteComponentByUlid(this.curPage!.ulid, ulid) // todo rename deleteNodeByUlid
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
    // 这里不用使用comStack.init()
  }
  identify(index: number, w: GridStackWidget) {
    return w.id; // or use index if no id is set and you only modify at the end...
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
    let curNode = this.componentByPage.find(item => {
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
  resizeH($event: A) {
    // $event: {
    //   el: DOM,
    //   event: Event
    // }
    clog('resizeH', $event)
  }
  gridStackItemClickH($event: MouseEvent, item: SuperGridItem) {
    $event.stopPropagation()
    let curPage = this.curPage
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
  ngOnDestroy() {
    this.pageService.setCurPage(this.curApp?.ulid || '', '')
    // 可能还需要清空当前应用
  }
}
