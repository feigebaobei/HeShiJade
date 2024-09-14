import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/service/page.service';
import { Page } from 'src/types/page';
// module
import { CommonModule } from '@angular/common';
import { S, ULID } from 'src/types/base';
import { asyncFn } from 'src/helper';

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
export class PageListComponent implements OnInit {
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
      let {pageKey} = this.route.snapshot.params
      let page = this.pageList.find(item => item.key === pageKey)
      if (page) {
        asyncFn(() => { // effect内可以使用宏任务去设置signal
          this.setCur(page.ulid)
        })
      }
    })
    effect(() => {
      this.cur = this.pageService.curS.get()
    })
  }
  pageItemClickH(page: Page) {
    this.pageService.setCur(page.ulid)
  }
  setCur(ulid: ULID) {
    this.pageService.setCur(ulid)
  }
  ngOnInit(): void {
    // clog('qwerty')
    // let {pageKey} = this.route.snapshot.params
    // let page = this.pageList.find()
    // this.pageService.setCur(page.ulid)
  }
  // 执行顺序
  // 1. constructor
  // 2. ngOnInit
  // 3. effect * n
}
