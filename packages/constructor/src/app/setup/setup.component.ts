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


let clog = console.log
let CDM: Record<S, componentConfigT> = componentConfig

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass']
})
export class SetupComponent implements OnInit {
  // tabActiveId: string | number = 'tab2';
  appKey: S
  pageKey: S
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
    // ActivatedRoute
  ) {
    this.pageKey = ''
    this.appKey = ''
    this.leftTabActive = 'page'
    this.rightTabActive = 'props'
    this.componentCategoryList = []
    this.componentByPage = []
    this.pageList = []
    this.msg = []
    this.pageData = []

    this.componentService.componentListByCurPage$.subscribe(compArr => {
      this.componentByPage = []
      this.componentByPage = compArr
      clog('change', compArr, this.componentByPage)
    })
    this.pageService.pageList$.subscribe(p => {
      this.pageList = p
    })
  }
  viewBtClickH() {}

  activeTabChange(tab: A) {
    console.log(tab);
  }
  ngOnInit(): void {
    clog('appList', this.appService.getAppList())
    // 当直接进入配置页面或在配置页面刷新时应用列表为空
    // 若应用列表为空，则请求应用列表。
    if (this.appService.getAppList().length) {
      // this.appService.reqAppList().then(() => {
      //   this.appService.setCurApp(String(this.route.snapshot.queryParamMap.get('app')))
      // })
    }
    // 处理page
    // this.pageService.recast()
    // this.pageService.pageList$.subscribe(pageList => {
    //   this.pageList = pageList
    //   this.componentService.initMap(pageList.map(item => item.ulid))
    // })
    // this.pageService.reqPageList()
    // 检查app
    this.checkApp().then((bool) => {
      // 设置当前应用
      if (bool) {
        let appUlid = String(this.route.snapshot.queryParamMap.get('app'))
        this.appService.setCurApp(appUlid)
        return
      } else {
        return Promise.reject()
      }
    }).then(() => {
      // 请求组件的种类
      this.componentService.getCategoryList().then(res => {
        this.componentCategoryList = res
      }).catch(error => {
        clog('error', error)
      })
      // 请求当前应用的页面列表
      return this.pageService.reqPageList() // .then()
    })
    .then(() => {
      // 设置no.1page为当前页面
      let pageList = this.pageService.getPageList()
      this.pageService.setCurPage(pageList[0].ulid)
      // 
      // 请求当前页面的组件
      // this.componentService.getCompListByPage().then(res => {
      //   // this.componentByPage = res
      //   this.componentByPage = []
      // })
      this.componentService.getCompListByPage()
    })
    .catch(() => {
      this.msg = [
        { severity: 'error', summary: '提示', content: '您没有该应用的权限。'}
      ]
      this.router.navigate(['/list'])
    })

  }
  // 检查当前app是否在应用列表中
  checkApp(): Promise<B> {
    let appUlid = this.route.snapshot.queryParamMap.get('app')
    let appList = this.appService.getAppList()
    if (appList.length) {
      return Promise.resolve(appList.some(item => item.ulid === appUlid))
      // if (b) {
      //   this.appService.setCurApp(String(appUlid))
      // }
      // return b
      // return Promise.resolve(true)
    } else {
      return this.appService.reqAppList().then(appList => {
        // clog('appList', appList)
        // this.appService.setCurApp(String(appUlid))
        return appList.some(item => item.ulid === appUlid)
      })
    }
  }
  onDrop(e: DropEvent, targetArray: A) {
    clog('stage onDrop', e, targetArray)
    // 请求后端保存组件时保存到本地。
    let curPage = this.pageService.getCurPage()
    this.componentService.postCompListByPage({
      ulid: ulid(),
      type: e.dragData.item.type, // 'Button',
      prev: '',
      next: '',
      props: (CDM[e.dragData.item.type].props),
      behavior: (CDM[e.dragData.item.type].behavior),
      item: (CDM[e.dragData.item.type].item),
      slot: (CDM[e.dragData.item.type].slot),
      appUlid: curPage!.appUlid,
      pageUlid: curPage!.ulid,
    })
    // .then((res: Comp[]) => {
    //   this.componentByPage = res
    // })
  }
  stageClickH($event: A) {
    if (Array.from($event.target.classList).includes('stage')) {
      this.componentService.setCurComponent()
    }
  }
}
