import { Component, Input, TemplateRef, ViewChild, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { ListenItems } from 'src/helper/ListenItems';
import shareEvent, { createEventName } from 'src/helper/share-event';
// type
import type { A, B, S, MenuItem, ULID, Oa, } from 'src/types/base';
import type { Component as Comp } from 'src/types/component';

let clog = console.log

interface PageListData {
  props: Comp['props']
  slots: Comp['slots']
  items: Comp['items']
  ulid: ULID
}

@Component({
  selector: 'app-page-list',
  // standalone: true,
  // imports: [],
  templateUrl: './page-list.component.html',
  styleUrl: './page-list.component.sass'
})
export class PageListComponent extends ListenItems<MenuItem> {
  // @Input() data!: PageListData
  // menu: MenuItem[]
  active: S
  // @ViewChild('myTemplate', {static: true}) myTemplateRef!: TemplateRef<A>
  constructor(
    private componentService: ComponentService
  ) {
    super()
    this.active = ''
    this.menu = []
    // this.menu = [
    //   {
    //     key: 'one',
    //     name: 'one',
    //     // icon: 'icon-op-list',
    //     icon: '',
    //     isOpen: false,
    //     isDisabled: false,
    //     isRenderer: true,
    //     children: [],
    //   },
    //   {
    //     key: 'two',
    //     name: 'two',
    //     // icon: 'icon-op-list',
    //     icon: '',
    //     isOpen: false,
    //     isDisabled: false,
    //     isRenderer: true,
    //     children: [
    //       {
    //         key: 'two-one',
    //         name: 'two-one',
    //         icon: 'icon-op-list',
    //         isOpen: false,
    //         isDisabled: false,
    //         isRenderer: true,
    //         children: [],
    //       },
    //       {
    //         key: 'two-two',
    //         name: 'two-two',
    //         icon: 'icon-op-list',
    //         isOpen: false,
    //         isDisabled: false,
    //         isRenderer: true,
    //         children: [
    //           {
    //             key: 'two-two-one',
    //             name: 'two-two-one',
    //             icon: 'icon-op-list',
    //             isOpen: false,
    //             isDisabled: false,
    //             isRenderer: true,
    //             children: [],
    //           },
    //           {
    //             key: 'two-two-two',
    //             name: 'two-two-two',
    //             icon: 'icon-op-list',
    //             isOpen: false,
    //             isDisabled: false,
    //             isRenderer: true,
    //             children: [],
    //           },
    //           {
    //             key: 'two-two-three',
    //             name: 'two-two-three',
    //             icon: 'icon-op-list',
    //             isOpen: false,
    //             isDisabled: false,
    //             isRenderer: true,
    //             children: [
    //               {
    //                 key: 'two-two-three-1',
    //                 name: 'two-two-three-1',
    //                 icon: 'icon-op-list',
    //                 isOpen: false,
    //                 isDisabled: false,
    //                 isRenderer: true,
    //                 children: [],
    //               },
    //               {
    //                 key: 'two-two-three-2',
    //                 name: 'two-two-three-2',
    //                 icon: 'icon-op-list',
    //                 isOpen: false,
    //                 isDisabled: false,
    //                 isRenderer: true,
    //                 children: [],
    //               },
    //               {
    //                 key: 'two-two-three-3',
    //                 name: 'two-two-three-4',
    //                 icon: 'icon-op-list',
    //                 isOpen: false,
    //                 isDisabled: false,
    //                 isRenderer: true,
    //                 children: [
    //                   {
    //                     key: 'two-two-three-3-1',
    //                     name: 'two-two-three-4-1',
    //                     icon: 'icon-op-list',
    //                     isOpen: false,
    //                     isDisabled: false,
    //                     isRenderer: true,
    //                     children: [],
    //                   },
    //                   {
    //                     key: 'two-two-three-3-2',
    //                     name: 'two-two-three-4-2',
    //                     icon: 'icon-op-list',
    //                     isOpen: false,
    //                     isDisabled: false,
    //                     isRenderer: true,
    //                     children: [],
    //                   },
    //                   {
    //                     key: 'two-two-three-3-3',
    //                     name: 'two-two-three-4-3',
    //                     icon: 'icon-op-list',
    //                     isOpen: false,
    //                     isDisabled: false,
    //                     isRenderer: true,
    //                     children: [],
    //                   },
    //                 ],
    //               },
    //             ],
    //           },
    //           {
    //             key: 'two-two-four',
    //             name: 'two-two-four',
    //             icon: 'icon-op-list',
    //             isOpen: false,
    //             isDisabled: false,
    //             isRenderer: true,
    //             children: [],
    //           },
    //         ],
    //       },
    //       {
    //         key: 'two-three',
    //         name: 'two-three',
    //         icon: 'icon-op-list',
    //         isOpen: false,
    //         isDisabled: false,
    //         isRenderer: true,
    //         children: [],
    //       },
    //     ],
    //   },
    //   {
    //     key: 'three',
    //     name: 'three',
    //     icon: 'icon-op-list',
    //     isOpen: false,
    //     isDisabled: false,
    //     isRenderer: true,
    //     children: [],
    //   },
    // ]
  }
  override washMenuItem(obj: Oa) {
    return {
      key: obj['key'],
      name: obj['name'],
      icon: obj['icon'],
      parentKey: obj['parentKey'],
      isOpen: obj['isOpen'],
      isRenderer: obj['isRenderer'],
      isDisabled: obj['isDisabled'],
      children: [],
    }
  }
  // find(arr: MenuItem[], k: S): MenuItem | undefined {
  //   let res = arr.find(item => item.key === k)
  //   if (res) {
  //     return res
  //   } else {
  //     for (let i = 0; i < arr.length; i++) {
  //       let t = this.find(arr[i].children, k)
  //       if (t) {
  //         return t
  //       }
  //     }
  //     return
  //   }
  // }
  // opMenu() {
  //   if (!this.data.items.length) {
  //     this.menu = []
  //   } else {
  //     let washMenuItemList = (this.data.items as MenuItem[]).map(item => this.washMenuItem(item))
  //     for (let i = 0; i < washMenuItemList.length;) {
  //       let cur = washMenuItemList[i]
  //       if (cur.parentKey) {
  //         // 去挂
  //         let p = this.find(washMenuItemList, cur.parentKey)
  //         if (p) {
  //           p.children.push(cur)
  //         }
  //         washMenuItemList.splice(i, 1)
  //       } else {
  //         // 不挂
  //         i++
  //       }
  //     }
  //     this.menu = washMenuItemList
  //   }
  // }
  // listen() {
  //   shareEvent.on(createEventName('PageList', this.data.ulid, 'items', 'add'), () => {
  //     this.opMenu()
  //   })
  //   shareEvent.on(createEventName('PageList', this.data.ulid, 'items', 'update'), () => {
  //     this.opMenu()
  //   })
  //   shareEvent.on(createEventName('PageList', this.data.ulid, 'items', 'remove'), () => {
  //     this.opMenu()
  //   })
  // }
  itemClickH(key: S) {
    this.active = key
  }
  openChangeH(isOpen: B, key: S) {
    clog('openChangeH', isOpen, key)
  }
  openChangeInnerH(obj: {isOpen: B, key: S}) {
    clog('openChangeInnerH', obj)
  }
  override ngOnInit() {
    this.opMenu()
    this.listen()
  }
  ngOnChanges() {}
}
