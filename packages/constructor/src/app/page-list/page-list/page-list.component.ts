// import { HttpClient } from '@angular/common/http';
import { Component, 
  effect, 
  // Input
   OnInit } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
// import { DialogComponent } from 'src/app/list/dialog/dialog.component';
import { PageDialogComponent } from './dialog/page-dialog.component'; // 以后要换
import { AppService } from 'src/app/service/app.service';
import { PageService } from 'src/app/service/page.service';
import { ulid } from 'ulid'
import { initPageMeta } from 'src/helper/index'
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from 'src/app/service/component.service';
import { text } from 'src/helper/config';
// type
import type { Page } from 'src/types/page';
import type { A, B, N, S, ULID } from 'src/types/base'
import type { Text } from 'src/types/config';

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
  editIndex: N
  pageNameEdit: S // 编辑状态的页面名称
  text: Text
  constructor(
    private dialogService: DialogService,
    private appService: AppService,
    private pageService: PageService,
    private componentService: ComponentService,
    private route: ActivatedRoute,
  ) {
    this.pageList = []
    this.curPage = null
    this.text = text
    this.msg = []
    this.hoveredIndex = -1
    this.editIndex = -1
    this.pageNameEdit = ''
    effect(() => {
      this.curPage = this.pageService.pageS.get()
    })
  }
  ngOnInit(): void {
    this.init()
  }
  init() {
    let appUlid = String(this.route.snapshot.queryParamMap.get('app'))
    this.appService.getAppList().then((al) => {
      let app = al.find(item => item.ulid === appUlid)
      clog(app)
      return app
    }).then(app => {
      if (app) {
        this.pageService.getPageList(app.ulid).then(pl => {
          this.pageList = pl
        })
      }
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
            let app = this.appService.getCurApp()
            let data: PageData = results.modalContentInstance.data
            let page = initPageMeta(data.key, data.name,
              this.pageList.length ? this.pageList[this.pageList.length - 1].ulid : '',
              '',
              app!.ulid,
            )
            this.pageList.push(page)
            this.pageService.add(app!.ulid, page)
            this.pageService.reqPostPage(data, app!.ulid, page.ulid)
            this.appService.addPage(page.ulid)
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
    let app = this.appService.getCurApp()
    if (app) {
      this.pageService.setCurPage(app.ulid, pageUlid)
    }
    let curPage = this.pageService.getCurPage()
    if (curPage) {
      this.componentService.setCurComponent(curPage.ulid)
    }
  }
  reReqPageButtonClickH() {
    // this.pageService.reqPageList()
    // this.init()
    // this.pageService.recast()
  }
  mouseenterH(i: N) {
    this.hoveredIndex = i
  }
  mouseleaveH() {
    this.hoveredIndex = -1
  }
  editInputBlurH() {
    this.editIndex = -1
  }
  okSpanClickH() {
    this.pageList[this.editIndex].name = this.pageNameEdit
    let ulid = this.pageList[this.editIndex].ulid
    this.pageService.updateStr(ulid, 'name', this.pageNameEdit)
    this.pageService.reqUpdate(ulid, 'meta', 'name', this.pageNameEdit)
    this.editIndex = -1
  }
  iconEditClickH($event: Event, i: N) {
    this.pageNameEdit = this.pageList[i].name
    this.editIndex = i
    $event.stopPropagation()
  }
  iconDeleteClickH(i: N) {
    let page = this.pageList[i]
    // 在本组件中删除该元素
    this.pageList.splice(i, 1)
    // 清空舞台区
    this.pageService.setCurPage(this.appService.getCurApp()!.ulid, '')
    // return
    // 在store中删除
    this.pageService.deletePageByUlid(page.ulid)
    this.componentService.deleteComponentByPageUlid(page.ulid)
    // 在服务端中删除
    this.pageService.reqDeletePage(page.ulid)
  }
}
