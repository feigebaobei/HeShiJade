import { Component } from '@angular/core';
import { PageService } from 'src/app/service/page.service';
import { Page } from 'src/types/page';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent {
  pageList: Page[]
  cur: Page | undefined
  constructor(
    private pageService: PageService
  ) {
    this.pageList = []
    this.cur = undefined
    this.pageService.list$.subscribe(pageList => {
      this.pageList = pageList
    })
    this.pageService.cur$.subscribe(page => {
      this.cur = page
    })
  }
  pageItemClickH(page: Page) {
    this.pageService.setCur(page.ulid)
  }
}
