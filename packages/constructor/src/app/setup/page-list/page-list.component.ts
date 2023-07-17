import { Component, OnInit } from '@angular/core';
import type { Page } from 'src/types';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit {
  pageList: Page[]
  constructor() {
    this.pageList = []
  }
  ngOnInit(): void {
    this.init()
  }
  init() {
    this.pageList = [
      { name: 'first', key: 'first', ulid: '1234567890qwertyuiopasdfga'},
      { name: 'second', key: 'second', ulid: '1234567890qwertyuiopasdfgb'},
      { name: 'third', key: 'third', ulid: '1234567890qwertyuiopasdfgc'},
    ]
  }
}
