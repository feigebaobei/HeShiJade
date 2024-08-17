import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { ComponentService } from '../service/component.service';
import { PageService } from '../service/page.service';
import { ActivatedRoute } from '@angular/router';
import { ulid } from 'ulid';
import { initComponentMeta } from 'src/helper'

// 数据
// import * as componentDefaultConfigAll from '../../helper/component'
// import {componentDefaultConfigAll} from 'src/helper/component'
// import all from '../../helper/component'
// 类型
import type { A, S, N, B, ULID, } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { Category, Component as Comp,
  //  componentConfig as componentConfigT
   } from 'src/types/component';
import type { DropEvent } from 'ng-devui';
import type { App } from 'src/types/app';
import type { GridStackOptions, GridStackWidget } from 'gridstack';

// let componentDefaultConfigAll = all

let clog = console.log
// let CDM: Record<S, componentConfigT> = componentConfig

// type SuperGridItem = GridStackWidget extends {
//   comp: Comp
// }
interface SuperGridItem extends GridStackWidget {
  comp: Comp
}


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass']
})
export class SetupComponent implements OnInit {
  // tabActiveId: string | number = 'tab2';
  // appKey: S
  // pageKey: S
  curApp: App | undefined
  curPage: Page | undefined
  leftTabActive: S | N
  rightTabActive: S | N
  componentCategoryList: Category[]
  componentByPage: Comp[]
  pageList: Page[]
  msg: {}[]
  pageData: A[]
  gridOptions: GridStackOptions
  // gridItem: GridStackWidget
  gridItem: SuperGridItem[]
  constructor(
    private appService: AppService,
    private pageService: PageService,
    private componentService: ComponentService,
    private route: ActivatedRoute,
    // private router: Router,
  ) {
    this.leftTabActive = 'page'
    this.rightTabActive = 'props'
    this.componentCategoryList = []
    this.componentByPage = []
    this.pageList = []
    this.msg = []
    this.pageData = []
    // this.appService.appSubject$.subscribe(p => {
    //   this.curApp = p
    // })
    this.pageService.pageSubject$.subscribe(p => {
      this.curPage = p
      if (this.curPage) {
        this.componentService.getComponentList(this.curPage).then((componentList) => {
          this.componentByPage = componentList
          componentList.forEach(component => {
            this.gridItem.push({
              id: component.ulid,
              comp: component,
            })
          })
        })
        clog('this.gridItem', this.gridItem)
      }
    })
    this.gridOptions = {
      margin: 5,
      // children: [
      //   {x: 0, y: 0, minW: 2, content: 'item1'},
      //   {x: 1, y: 0, content: 'item2'},
      //   {x: 0, y: 1, content: 'item3'},
      // ],
    }
    this.gridItem = [
      // {x:0, y:0, minW:2, id:'1'}, // must have unique id used for trackBy
      // {x:1, y:0, id:'2'},
      // {x:0, y:1, id:'3'},
    ]
  }
  viewBtClickH() {
    window.open(`${location.protocol}//${location.hostname}:${4210}/${this.appService.getCurApp()?.key}/dev/${this.pageService.getCurPage()?.key}`, '_blank')
  }
  activeTabChange(tab: A) {
    console.log(tab);
  }
  ngOnInit(): void {
    this.opApp()
  }
  opApp() {
    let appUlid = String(this.route.snapshot.queryParamMap.get('app'))
    this.appService.getAppList().then(appList => {
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
    }).then(() => { // 取组件列表 setCurPage
      return this.pageService.getPageList(this.curApp!.ulid).then(pl => {
        if (pl[0]) {
          this.pageService.setCurPage(this.curApp!.ulid, pl[0].ulid)
          return true
        } else {
          return Promise.reject('无页面')
        }
      })
    }).catch((msg) => {
      clog(msg)
    })
  }
  onDrop(e: DropEvent, targetArray: A) {
    // 请求后端保存组件时保存到本地。
    let curPage = this.pageService.getCurPage()
    let obj: Comp = initComponentMeta(
      e.dragData.item.componentCategory, 
      curPage!.appUlid, curPage!.ulid, 
      this.componentByPage[this.componentByPage.length - 1]?.ulid || '', '', '',
      {area: ''},
    )
    // this.componentByPage.push(obj)
    this.gridItem.push({id: obj.ulid, comp: obj})
    this.componentService.mountComponent(curPage!.ulid, obj)
    this.componentService.reqPostCompListByPage(obj).then(() => {
      clog('成功在远端保存组件')
    }).catch(error => {
      clog('error', error)
    })
    // this.componentService.postCompListByPageForLocal(obj)
  }
  stageClickH($event: A) {
    if (Array.from($event.target.classList).includes('center')) {
      if (this.curPage) {
        clog('stageClickH', this.curPage)
        this.componentService.setCurComponent(this.curPage.ulid, '')
      }
    }
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.componentByPage = this.componentByPage.filter(item => item.ulid !== ulid)
    let compUlid = this.componentService.getChildrenComponent(this.curPage!.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteByUlid(this.curPage!.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, compUlid)
  }
  identify(index: number, w: GridStackWidget) {
    return w.id; // or use index if no id is set and you only modify at the end...
  }
  changeCBH(a: A) {
    clog('changeCBH', a)
  }
  resizeH(a: A) {
    clog('resizeH', a)
  }
}
