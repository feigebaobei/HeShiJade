import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { ComponentService } from '../service/component.service';
import type { A, S, N } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { Component as Comp } from 'src/types/component';
import { PageService } from '../service/page.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  componentList: Comp[]
  pageList: Page[]
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
    this.componentList = []
    this.pageList = []
    clog('this.router', this.router)
    clog('this.route', this.route)
  }
  viewBtClickH() {}

  activeTabChange(tab: A) {
    console.log(tab);
  }
  ngOnInit(): void {
    // 检查app
    this.checkApp()
    // 请求pageList
    this.pageService.getPageList().then(res => {
      this.pageList = res
    })
    // 请求componentList
    this.componentService.getComponentList().then(res => {
      this.componentList = res
    }).catch(error => {
      clog('error', error)
    })
  }
  checkApp() {
    if (this.appService.appList.length) {
      return this.appService.appList.some(item => item.ulid === this.route.snapshot.queryParamMap.get('app'))
    } else {
      return false
    }

  }
}
