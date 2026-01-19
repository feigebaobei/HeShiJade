import { Component, Input } from '@angular/core';
import { B, Oa, S } from 'src/types/base';
// type
import type { Component as Comp, } from 'src/types/component';
import type { MenuConfig, SourceConfig, } from 'ng-devui';
import { ListenItems } from 'src/helper/ListenItems';
import { InputData } from 'src/helper/InputData';
import shareEvent, { creatEventName } from 'src/helper/share-event';

// interface BreadcrumbItem extends MenuConfig {
interface BreadcrumbItem extends SourceConfig {
  key: S,
  parentKey: S,
  label: S,
  children: BreadcrumbItem[]
  // menuList?: SourceConfig[]
  // isSearch?: B
}

// let washMenuItem = (obj: Oa): BreadcrumbItem => {
//     return {
//       key: obj['key'],
//       parentKey: obj['parentKey'],
//       name: obj['name'],
//       link: obj['link'],
//       linkType: obj['linkType'],
//       target: obj['target']
//     }
//   }


let clog = console.log

@Component({
  selector: 'app-breadcrumb',
  // standalone: true,
  // imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.sass'
})
export class BreadcrumbComponent 
// extends ListenItems<BreadcrumbItem> 
extends
InputData
{
  // menu: SourceConfig[]
  // menu: BreadcrumbItem[]
  menu: MenuConfig[]
  constructor() {
    super()
    this.menu = []
  }
  washMenuItem(item: Oa): MenuConfig {
    return {
      name: item['label'],
      link: item['link'],
      linkType: item['linkType'],
      target: item['target'],
    }
  }
  opMenu() {
    this.menu = this.data.items.map(item => this.washMenuItem(item))
  }
  listen() {
      shareEvent.on(creatEventName('Breadcrumb', this.data.ulid, 'items', 'add'), () => {
      this.opMenu()
      })
      shareEvent.on(creatEventName('Breadcrumb', this.data.ulid, 'items', 'update'), () => {
      this.opMenu()
      })
      shareEvent.on(creatEventName('Breadcrumb', this.data.ulid, 'items', 'remove'), () => {
      this.opMenu()
      })
  }
  ngOnInit() {
      this.opMenu()
      // clog('menu', this.menu)
      this.listen()
  }
}
