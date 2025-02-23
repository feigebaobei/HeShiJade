import { Component, EventEmitter, Input, Output, } from '@angular/core';
// type
import type { A, S, MenuItem, } from 'src/types/base';

@Component({
  selector: 'app-page-list-item',
  // standalone: true,
  // imports: [],
  templateUrl: './page-list-item.component.html',
  styleUrl: './page-list-item.component.sass'
})
export class PageListItemComponent {
  @Input() item!: MenuItem
  @Input() active: S = ''
  @Output() itemClick = new EventEmitter()
  constructor() {}
  itemClickH(key: S) {
    // clog('itemClickH item', key)
    this.itemClick.emit(key)
  }


}
