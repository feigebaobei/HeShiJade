import { Component, Input, } from '@angular/core';
// type
import type { A, B, S, MenuItem } from 'src/types/base';

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
  constructor() {}

}
