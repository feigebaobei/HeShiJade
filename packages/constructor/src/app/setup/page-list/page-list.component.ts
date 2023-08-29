import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
// import { DialogComponent } from 'src/app/list/dialog/dialog.component';
import { PageDialogComponent } from './dialog/page-dialog.component'; // 以后要换
import { AppService } from 'src/app/service/app.service';
import { PageService } from 'src/app/service/page.service';
import { ulid } from 'ulid'
// import type { Page } from 'src/types';
import type { Page } from 'src/types/page';
import type { A, S } from 'src/types/base'
import type { ResponseData } from 'src/types';

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
  // pageList: Page[]
  // @Input() pageList: Page[]
  pageList: Page[]
  msg: {}[]
  // curPageUlid: S
  curPage?: Page | null
  constructor(private dialogService: DialogService,
    private http: HttpClient,
    private appService: AppService,
    private pageService: PageService,
    ) {
    this.pageList = []
    this.msg = []
    // this.curPageUlid = ''
    this.curPage = null
  }
  ngOnInit(): void {
    this.init()
  }
  init() {
  //   // 日后从service中取得
  //   // this.pageList = [
  //   //   { name: 'first', key: 'first', ulid: '1234567890qwertyuiopasdfga'},
  //   //   { name: 'second', key: 'second', ulid: '1234567890qwertyuiopasdfgb'},
  //   //   { name: 'third', key: 'third', ulid: '1234567890qwertyuiopasdfgc'},
  //   // ]
    // this.pageService.pageSubject$.subscribe((page) => {
    //   this.curPage = page
    // })
    this.pageService.reqPageList().then(arr => {
      this.pageList = arr
      clog('this.pagelist', this.pageList, arr)
    })
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
            this.http.post<ResponseData>('http://localhost:5000/pages', {
              key: data.key,
              name: data.name,
              ulid: ulid(),
              appUlid: this.appService.getCurApp()?.ulid,
            }).subscribe((res) => {
              if (res.code === 0) {
                this.msg = [
                  { severity: 'success', summary: '创建成功', content: '', myInfo: 'Devui' },
                ]
                results.modalInstance.hide(); // 成功才关闭
                this.pageService.reqPageList().then(res => {
                  this.pageList = res
                  if (this.pageList.length) {
                    this.pageService.setCurPage(this.pageList[this.pageList.length - 1].ulid)
                  }
                })
              } else {
                this.msg = [
                  { severity: 'error', summary: '创建失败', content: '', myInfo: 'Devui' },
                ]
              }
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
    this.init()
  }
}
