// import { HttpClient } from '@angular/common/http';
import { Component, 
  // Input
   OnInit } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
// import { DialogComponent } from 'src/app/list/dialog/dialog.component';
import { PageDialogComponent } from './dialog/page-dialog.component'; // 以后要换
import { AppService } from 'src/app/service/app.service';
import { PageService } from 'src/app/service/page.service';
import { ulid } from 'ulid'
import { initPageMeta } from 'src/helper/index'
// import type { Page } from 'src/types';
import type { Page } from 'src/types/page';
import type { A, B, N, S, ULID } from 'src/types/base'
import { ComponentService } from 'src/app/service/component.service';
// import type { ResponseData } from 'src/types';

let clog = console.log

interface PageData {
  key: S
  name: S
}
@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit {
  pageList: Page[]
  msg: {}[]
  // curPageUlid: S
  curPage?: Page | null
  hoveredIndex: N
  constructor(
    private dialogService: DialogService,
    private appService: AppService,
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.pageList = []
    // this.pageService.pageList$.subscribe(pl => {
    //   this.pageList = pl
    //   if (pl.length) {
    //     this.pageService.setCurPage(pl[0].ulid) // 设置第一个页面为默认打开的页面
    //   }
    // })
    this.curPage = null
    this.pageService.pageSubject$.subscribe(p => {
      this.curPage = p
    })
    this.msg = []
    this.hoveredIndex = -1
  }
  ngOnInit(): void {
    this.init()
  }
  init() {
    let app = this.appService.getCurApp()
    if (app) {
      this.pageService.getPageList(app.ulid).then(pl => {
        this.pageList = pl
      })
    }
  }
  onDrop(dropEvent : A, arr: Page[]) {
    let {dragFromIndex, dropIndex} = dropEvent
    arr.splice(dropIndex, 0, ...arr.splice(dragFromIndex, 1))
  }
  createPageButtonClickH() {
    let results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '创建新页面',
      content: PageDialogComponent,
      backdropCloseable: true,
      onClose: () => clog('close'),
      data: {
        key: 'p0',
        name: 'p0',
      },
      buttons: [
        {
          cssClass: 'primary',
          text: '创建',
          disabled: false,
          handler: ($event: Event) => {
            let data: PageData = results.modalContentInstance.data
            let page = initPageMeta(data.key, data.name, ulid(), this.pageList[this.pageList.length - 1].ulid || '', '')
            this.pageList.push(page)
            this.pageService.add(page)
            this.pageService.reqPostPage(data, page.ulid)
            results.modalInstance.hide();
          }
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide()
          }
        },
      ]
    })
  }
  pageItemClickH(pageUlid: S) {
    this.pageService.setCurPage(pageUlid)
  }
  reReqPageButtonClickH() {
    // this.pageService.reqPageList()
    // this.init()
    // this.pageService.recast()
  }
  mouseoverH(i: N) {
    this.hoveredIndex = i
  }
  mouseoutH() {
    this.hoveredIndex = -1
  }
  iconClickH(i: N) {
    let page = this.pageList[i]
    // 在本组件中删除该元素
    this.pageList.splice(i, 1)
    // 在store中删除
    this.pageService.deletePageByUlid(page.ulid)
    this.componentService.deleteComponentByPageUlid(page.ulid)
    // this.pageService.getPageList().then((pl) => {
    //   clog(pl)
    // })
    // clog(this.componentService._map)
    // // 在服务端中删除
    this.pageService.reqDeletePage(page.ulid)
  }
}
