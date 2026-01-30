import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { MenuModule } from 'ng-devui/menu';
// type
import type { A, B, S, MenuItem } from 'src/types/base';
import { PageListItemComponent } from '../page-list-item/page-list-item.component';
import { CommonModule } from '@angular/common';

let clog = console.log

@Component({
  selector: 'app-page-sub-list',
  standalone: true,
  imports: [
    MenuModule,
    PageListItemComponent,
    CommonModule,
  ],
  templateUrl: './page-sub-list.component.html',
  styleUrl: './page-sub-list.component.sass'
})
export class PageSubListComponent {
  @Input() list: MenuItem[] = []
  @Input() active: S = ''
  @Output() openChange = new EventEmitter()
  @Output() itemClick = new EventEmitter()
  constructor() {}
  openChangeH(isOpen: B, key: S) {
    // clog('openChangeH inner', isOpen, key)
    this.openChange.emit({isOpen, key})
  }
  openChangeInnerH(obj: {isOpen: B, key: S}) {
    // clog('openChangeH inner', obj)
    this.openChange.emit(obj)
  }
  itemClickH(key: S) {
    // clog('itemClickH sublist ', key)
    this.itemClick.emit(key)
  }
  itemClickInnerH(key: S) {
    this.itemClick.emit(key)
  }
}
