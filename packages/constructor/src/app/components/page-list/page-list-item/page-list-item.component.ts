import { Component, Input } from '@angular/core';
// type
import type { A, B, S, MenuItem } from 'src/types/base';

let clog = console.log


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
  constructor() {}
  itemClickH(p: A) {
    clog('itemClickH', p)
  }

}
