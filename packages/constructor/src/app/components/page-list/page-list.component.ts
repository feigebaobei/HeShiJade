import { Component, TemplateRef, ViewChild, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
// type
import type { A, B, S, MenuItem } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-page-list',
  // standalone: true,
  // imports: [],
  templateUrl: './page-list.component.html',
  styleUrl: './page-list.component.sass'
})
export class PageListComponent {
  menu: MenuItem[]
  active: S
  // @ViewChild('myTemplate', {static: true}) myTemplateRef!: TemplateRef<A>
  constructor(
    private componentService: ComponentService
  ) {
    this.active = ''
    this.menu = [
      {
        key: 'one',
        name: 'one',
        icon: 'icon-op-list',
        isOpen: false,
        isDisabled: false,
        isRenderer: true,
        children: [],
      },
      {
        key: 'two',
        name: 'two',
        icon: 'icon-op-list',
        isOpen: false,
        isDisabled: false,
        isRenderer: true,
        children: [
          {
            key: 'two-one',
            name: 'two-one',
            icon: 'icon-op-list',
            isOpen: false,
            isDisabled: false,
            isRenderer: true,
            children: [],
          },
          {
            key: 'two-two',
            name: 'two-two',
            icon: 'icon-op-list',
            isOpen: false,
            isDisabled: false,
            isRenderer: true,
            children: [],
          },
        ],
      },
      {
        key: 'three',
        name: 'three',
        icon: 'icon-op-list',
        isOpen: false,
        isDisabled: false,
        isRenderer: true,
        children: [],
      },
    ]
  }
  itemClickH(p: A) {
    clog('itemClickH', p)
  }
  openChangeH(a: A, b: A) {
    clog('openChangeH', a, b)
  }
  ngOnInit() {}
  ngOnChanges() {}
}
