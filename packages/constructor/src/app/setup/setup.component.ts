import { Component } from '@angular/core';
import type{ A, S, N } from 'src/types/base';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass']
})
export class SetupComponent {
  // tabActiveId: string | number = 'tab2';
  appKey: S
  pageKey: S
  leftTabActive: S | N
  rightTabActive: S | N
  constructor() {
    this.pageKey = ''
    this.appKey = ''
    this.leftTabActive = 'page'
    this.rightTabActive = 'props'
  }
  viewBtClickH() {}

  activeTabChange(tab: A) {
    console.log(tab);
  }
}
