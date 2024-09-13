import { Component, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/service/page.service';
import { Page } from 'src/types/page';
// module
import { CommonModule } from '@angular/common';

let clog = console.log

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent {
  pageList: Page[]
  cur: Page | undefined
  constructor(
    private pageService: PageService,
    private route: ActivatedRoute
  ) {
    this.pageList = []
    this.cur = undefined
    // this.pageService.list$.subscribe(pageList => {
    //   this.pageList = pageList
    //   // 选中url中pageKey对应的页面
    //   this.route.paramMap.subscribe(data => {
    //     let pageKey = data.get('pageKey')
    //     let page = this.pageList.find(item => item.key === pageKey)
    //     if (page) {
    //       this.pageService.setCur(page.ulid)
    //     }
    //   })
    // })
    // 选中url中pageKey对应的页面
    // this.route.paramMap.subscribe(data => {
    //   let pageKey = data.get('pageKey')
    //   clog('pageKey pageKey pageKey', this.pageList, this.pageList.length)
    //   let page = this.pageList.find(item => item.key === pageKey)
    //   if (page) {
    //     this.pageService.setCur(page.ulid)
    //   }
    // })
    effect(() => {
      let pageList = this.pageService.listS.get()
      this.pageList = pageList
      // clog(this.route.params)
      // this.route.params
    })
    effect(() => {
      this.cur = this.pageService.curS.get()
    })
  }
  pageItemClickH(page: Page) {
    this.pageService.setCur(page.ulid)
  }
}
