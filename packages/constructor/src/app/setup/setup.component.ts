import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { ComponentService } from '../service/component.service';
import { PageService } from '../service/page.service';
import { ActivatedRoute, Router } from '@angular/router';
import type { A, S, N, B } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { Component as Comp } from 'src/types/component';
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
  componentCategoryList: Comp[]
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
    // this.componentByPage = [...this.componentByPage, ...this.componentByPage]
    // 请求后端保存组件时保存到本地。
    let curPage = this.pageService.getCurPage()
    this.componentService.postCompListByPage({
      ulid: '',
      type: 'Button',
      prev: '',
      next: '',
      props: {},
      behaivor: {},
      item: {},
      slot: '',
      appUlid: curPage!.appUlid,
      pageUlid: curPage!.ulid,
    })

    // let index = e.dropIndex;
    // const fromIndex = e.dragFromIndex;
    // const item = e.dragData.item;
    // if (-1 !== index) {
    //   /* 修正同一个container排序，往下拖动index多了1个位置*/
    //   if (-1 !== fromIndex && index > fromIndex) {
    //     index--;
    //   }
    //   targetArray.splice(index, 0, fromIndex === -1 ? item : targetArray.splice(fromIndex, 1)[0]);
    // } else {
    //   targetArray.push(item);
    // }
    // if (fromIndex === -1) {
    //   this.removeItem(item, e.dragData.parent);
    // }
  }
}
