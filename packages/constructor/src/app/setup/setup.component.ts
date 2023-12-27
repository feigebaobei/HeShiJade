import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { ComponentService } from '../service/component.service';
import { PageService } from '../service/page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ulid } from 'ulid';
// 数据
import * as componentConfig from '../../helper/component'
// 类型
import type { A, S, N, B } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { Category, Component as Comp, componentConfig as componentConfigT } from 'src/types/component';
import type { DropEvent } from 'ng-devui';
import type { App } from 'src/types/app';


let clog = console.log
let CDM: Record<S, componentConfigT> = componentConfig

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
  constructor(
    private appService: AppService,
    private pageService: PageService,
    private componentService: ComponentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.leftTabActive = 'page'
    this.rightTabActive = 'props'
    this.componentCategoryList = []
    this.componentByPage = []
    this.pageList = []
    this.msg = []
    this.pageData = []

    this.appService.appSubject$.subscribe(p => {
      this.curApp = p
    })
    this.pageService.pageSubject$.subscribe(p => {
      this.curPage = p
    })
    this.componentService.componentListByCurPage$.subscribe(compArr => {
      this.componentByPage = compArr
    })
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
    let appList = this.appService.getAppList()
    // clog('sdsd')
    if (appList.length) {
      this.appService.setCurApp(appUlid)
    } else {
      this.appService.reqAppList().then(appList => {
        if (appList.some(item => item.ulid === appUlid)) {
          this.appService.setCurApp(appUlid)
        } else {
          alert('您无此应用的权限')
        }
      })
    }
  }
  // 检查当前app是否在应用列表中
  checkApp(): Promise<B> {
    let appUlid = this.route.snapshot.queryParamMap.get('app')
    let appList = this.appService.getAppList()
    if (appList.length) {
      return Promise.resolve(appList.some(item => item.ulid === appUlid))
    } else {
      return this.appService.reqAppList().then(appList => {
        return appList.some(item => item.ulid === appUlid)
      })
    }
  }
  onDrop(e: DropEvent, targetArray: A) {
    // 请求后端保存组件时保存到本地。
    let curPage = this.pageService.getCurPage()
    let obj = {
      ulid: ulid(),
      type: e.dragData.item.type,
      prevUlid: this.componentByPage[this.componentByPage.length - 1]?.ulid || '',
      nextUlid: '',
      props: (CDM[e.dragData.item.type].props),
      behavior: (CDM[e.dragData.item.type].behavior),
      item: (CDM[e.dragData.item.type].item),
      slot: (CDM[e.dragData.item.type].slot),
      appUlid: curPage!.appUlid,
      pageUlid: curPage!.ulid,
    }
    // this.componentService.postCompListByPage(obj)
    this.componentService.postCompListByPageForLocal(obj)
  }
  stageClickH($event: A) {
    if (Array.from($event.target.classList).includes('stage')) {
      this.componentService.setCurComponent()
    }
  }
}
