import { Component } from '@angular/core';
import { MenuConfig } from 'ng-devui';
import { CompBase } from 'src/helper/pool';
import { Oa } from 'src/types/base';

@Component({
  selector: 'app-breadcrumb',
  // standalone: true,
  // imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.sass'
})
export class BreadcrumbComponent extends CompBase {
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
  override ngOnInit(): void {
    this.pool.register(this.data.ulid, this, this.data.behavior)
    this.pool.trigger(this.data.ulid, 'postComponentNgOnInit', this.getLoopEventParams(this.loopIndex, undefined), this)
    this.opMenu()
  }

}
