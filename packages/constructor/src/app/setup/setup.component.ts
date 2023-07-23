import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../service/component.service';
import type { A, S, N } from 'src/types/base';
import type { Page } from 'src/types/page';
import type { Component as Comp } from 'src/types/component';
import { PageService } from '../service/page.service';

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
    private componentService: ComponentService,
    private pageService: PageService,
  ) {
    this.pageKey = ''
    this.appKey = ''
    this.leftTabActive = 'page'
    this.rightTabActive = 'props'
    this.componentList = []
    this.pageList = []
  }
  viewBtClickH() {}

  activeTabChange(tab: A) {
    console.log(tab);
  }
  ngOnInit(): void {
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
}
