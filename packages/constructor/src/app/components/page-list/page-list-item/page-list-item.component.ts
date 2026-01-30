import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconModule } from 'ng-devui';
import { MenuModule } from 'ng-devui/menu';
// type
import type { A, B, S, MenuItem } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-page-list-item',
  standalone: true,
  imports: [
    IconModule,
    MenuModule,
    CommonModule,
  ],
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
