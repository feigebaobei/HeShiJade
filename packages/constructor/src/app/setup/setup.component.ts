import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { ComponentService } from '../service/component.service';
import { PageService } from '../service/page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ulid } from 'ulid';
import type { A, S, N, B } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { Category, Component as Comp } from 'src/types/component';
import type { DropEvent } from 'ng-devui';

let clog = console.log

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
    // clog('this.router', this.router)
    // clog('this.route', this.route)
  }
  viewBtClickH() {}

  activeTabChange(tab: A) {
    console.log(tab);
  }
  ngOnInit(): void {
    // 处理page
    this.pageService.recast()
    this.pageService.pageList$.subscribe(pl => {
      this.pageList = pl
      this.componentService.initMap(pl.map(item => item.ulid))
    })
    // 检查app
    this.checkApp().then((bool) => {
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
      // 请求当前页面的组件
      this.componentService.getCompListByPage().then(res => {
        this.componentByPage = res
      })
    }).catch(() => {
      this.msg = [
        { severity: 'error', summary: '提示', content: '您没有该应用的权限。'}
      ]
      this.router.navigate(['/list'])
    })

  }
  checkApp(): Promise<B> {
    let appUlid = this.route.snapshot.queryParamMap.get('app')
    let pl = this.appService.getAppList()
    // clog('appUlid', appUlid, pl)
    if (pl.length) {
      return Promise.resolve(pl.some(item => item.ulid === appUlid))
    } else {
      return this.appService.reqAppList().then(appList => {
        // clog('appList', appList)
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
      props: {},
      behaivor: {},
      item: {},
      slot: '',
      appUlid: curPage!.appUlid,
      pageUlid: curPage!.ulid,
    }).then((res: Comp[]) => {
      this.componentByPage = res
    })
  }
  stageClickH($event: A) {
    if (Array.from($event.target.classList).includes('stage')) {
      this.componentService.setCurComponent()
    }
  }
}
