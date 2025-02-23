import { Component, Input, Output, EventEmitter, } from '@angular/core';
// type
import type { S, MenuItem, B } from 'src/types/base';
@Component({
  selector: 'app-page-sub-list',
  // standalone: true,
  // imports: [],
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
