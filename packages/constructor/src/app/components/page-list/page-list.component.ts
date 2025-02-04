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
        // icon: 'icon-op-list',
        icon: '',
        isOpen: false,
        isDisabled: false,
        isRenderer: true,
        children: [],
      },
      {
        key: 'two',
        name: 'two',
        // icon: 'icon-op-list',
        icon: '',
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
            children: [
              {
                key: 'two-two-one',
                name: 'two-two-one',
                icon: 'icon-op-list',
                isOpen: false,
                isDisabled: false,
                isRenderer: true,
                children: [],
              },
              {
                key: 'two-two-two',
                name: 'two-two-two',
                icon: 'icon-op-list',
                isOpen: false,
                isDisabled: false,
                isRenderer: true,
                children: [],
              },
              {
                key: 'two-two-three',
                name: 'two-two-three',
                icon: 'icon-op-list',
                isOpen: false,
                isDisabled: false,
                isRenderer: true,
                children: [
                  {
                    key: 'two-two-three-1',
                    name: 'two-two-three-1',
                    icon: 'icon-op-list',
                    isOpen: false,
                    isDisabled: false,
                    isRenderer: true,
                    children: [],
                  },
                  {
                    key: 'two-two-three-2',
                    name: 'two-two-three-2',
                    icon: 'icon-op-list',
                    isOpen: false,
                    isDisabled: false,
                    isRenderer: true,
                    children: [],
                  },
                  {
                    key: 'two-two-three-3',
                    name: 'two-two-three-4',
                    icon: 'icon-op-list',
                    isOpen: false,
                    isDisabled: false,
                    isRenderer: true,
                    children: [
                      {
                        key: 'two-two-three-3-1',
                        name: 'two-two-three-4-1',
                        icon: 'icon-op-list',
                        isOpen: false,
                        isDisabled: false,
                        isRenderer: true,
                        children: [],
                      },
                      {
                        key: 'two-two-three-3-2',
                        name: 'two-two-three-4-2',
                        icon: 'icon-op-list',
                        isOpen: false,
                        isDisabled: false,
                        isRenderer: true,
                        children: [],
                      },
                      {
                        key: 'two-two-three-3-3',
                        name: 'two-two-three-4-3',
                        icon: 'icon-op-list',
                        isOpen: false,
                        isDisabled: false,
                        isRenderer: true,
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                key: 'two-two-four',
                name: 'two-two-four',
                icon: 'icon-op-list',
                isOpen: false,
                isDisabled: false,
                isRenderer: true,
                children: [],
              },
            ],
          },
          {
            key: 'two-three',
            name: 'two-three',
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
  itemClickH(key: S) {
    clog('itemClickH', key)
    this.active = key
  }
  openChangeH(isOpen: B, key: S) {
    clog('openChangeH', isOpen, key)
  }
  openChangeInnerH(obj: {isOpen: B, key: S}) {
    clog('openChangeInnerH', obj)
  }
  ngOnInit() {}
  ngOnChanges() {}
}
