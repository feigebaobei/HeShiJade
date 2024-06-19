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

// let componentDefaultConfigAll = all

let clog = console.log
// let CDM: Record<S, componentConfigT> = componentConfig

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
        this.componentService.getComponentList(this.curPage).then((cl) => {
          this.componentByPage = cl
        })
      }
    })
    // this.componentService.componentListByCurPage$.subscribe(compArr => {
    //   this.componentByPage = compArr
    // })
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
          this.pageService.setCurPage(this.curApp!.ulid, pl[0])
          return true
        } else {
          return Promise.reject('无页面')
        }
      })
    }).catch((msg) => {
      clog(msg)
    })
  }
  // 检查当前app是否在应用列表中
  // checkApp(): Promise<B> {
  //   let appUlid = this.route.snapshot.queryParamMap.get('app')
  //   return this.appService.getAppList().then(appList => {
  //     if (appList.length) {
  //       return Promise.resolve(appList.some(item => item.ulid === appUlid))
  //     } else {
  //       return this.appService.reqAppList().then(appList => {
  //         return appList.some(item => item.ulid === appUlid)
  //       })
  //     }
  //   })
  //   // let appList = this.appService.getAppList()
  //   // if (appList.length) {
  //   //   return Promise.resolve(appList.some(item => item.ulid === appUlid))
  //   // } else {
  //   //   return this.appService.reqAppList().then(appList => {
  //   //     return appList.some(item => item.ulid === appUlid)
  //   //   })
  //   // }
  // }
  onDrop(e: DropEvent, targetArray: A) {
    // 请求后端保存组件时保存到本地。
    let curPage = this.pageService.getCurPage()
    let obj: Comp = initComponentMeta(
      e.dragData.item.componentCategory, 
      curPage!.appUlid, curPage!.ulid, 
      this.componentByPage[this.componentByPage.length - 1]?.ulid || '', '', '',
      {area: ''},
    )
    this.componentByPage.push(obj)
    // this.componentService.mountComponent(obj, this.componentByPage[this.componentByPage.length - 1].ulid, 'next')
    this.componentService.mountComponent(obj)
    this.componentService.reqPostCompListByPage(obj).then(() => {
      clog('成功在远端保存组件')
    }).catch(error => {
      clog('error', error)
    })
    // this.componentService.postCompListByPageForLocal(obj)
  }
  stageClickH($event: A) {
    if (Array.from($event.target.classList).includes('stage')) {
      this.componentService.setCurComponent()
    }
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.componentByPage = this.componentByPage.filter(item => item.ulid !== ulid)
    this.componentService.deleteByUlid(this.curPage!.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid)
  }
}
