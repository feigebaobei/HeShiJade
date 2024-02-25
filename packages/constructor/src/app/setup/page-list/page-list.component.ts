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
// import type { Page } from 'src/types';
import type { Page } from 'src/types/page';
import type { A, S, ULID } from 'src/types/base'
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
  // @Input() pageList: Page[]
  pageList: Page[]
  msg: {}[]
  // curPageUlid: S
  curPage?: Page | null
  constructor(
    private dialogService: DialogService,
    // private appService: AppService,
    private pageService: PageService,
  ) {
    this.pageList = []
    this.pageService.pageList$.subscribe(pl => {
      // clog('pl', pl)
      this.pageList = pl
      if (pl.length) {
        this.pageService.setCurPage(pl[0].ulid)
      }
    })
    this.curPage = null
    this.pageService.pageSubject$.subscribe(p => {
      this.curPage = p
    })
    this.msg = []
    // this.appService.appList$.subscribe(appList => {
    //   this.opPageList(appList.map(item => item.ulid))
    // })
    // 移到page.service.ts中了
    // this.appService.appSubject$.subscribe(curApp => {
    //   this.opPageList(String(curApp?.ulid))
    // })
  }
  ngOnInit(): void {
    this.init()
  }
  init() {
    // this.pageService.recast()
    // .then(arr => {
    //   this.pageList = arr
    //   clog('this.pagelist', this.pageList, arr)
    // })
    

  }
  // 设置应用ulid对应的page
  // opPageList(appUlidList: ULID[]) {
  //   if () {}
  //   this.initMap(appUlidList)
  // }
  // opPageList(appUlid: ULID) {
  //   let arr = this.pageService.getPageList(appUlid)
  //   if (!arr.length) {
  //     this.pageService.reqPageList(appUlid)
  //   }
  // }
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
            this.pageService.add(data).then(() => {
              // 提示
              // 关闭
              // 刷新页面列表
              this.msg = [
                { severity: 'success', summary: '创建成功', content: '', myInfo: 'Devui' },
              ]
              results.modalInstance.hide(); // 成功才关闭
              // if (!this.appService.getCurApp()?.firstPageUlid) {
              //   this.appService.recast().then(() => {
              //     this.pageService.recast()
              //   })
              // } else {
              //   this.pageService.recast()
              // }
              this.pageService.setCurPage(this.pageList[this.pageList.length].ulid)
            }).catch(() => {
              this.msg = [
                { severity: 'error', summary: '创建失败', content: '', myInfo: 'Devui' },
              ]
            })
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
    this.pageService.recast()
  }
}
