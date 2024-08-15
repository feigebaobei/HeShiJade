import { Component, Input, OnInit } from '@angular/core';
import { createChildKey } from 'src/helper/index'
import { ComponentService } from 'src/app/service/component.service';
// type
import type { Component as Comp } from 'src/types/component';
import type { ULID } from 'src/types';
import { B, S } from 'src/types/base';

interface TabsData {
  props: Comp['props']
  behavior: Comp['behavior']
  items: Comp['items']
  slots: Comp['slots']
  ulid: ULID
}

@Component({
  selector: 'app-tabs',
  // standalone: true,
  // imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.sass'
})
export class TabsComponent implements OnInit {
  @Input() data!: TabsData
  createChildKey: typeof createChildKey
  compObj: {[k: S]: Comp[]}
  constructor(private componentService: ComponentService) {
    this.createChildKey = createChildKey
    this.compObj = {}
  }
  ngOnInit() {
    let tree = this.componentService.getTreeByKey()
    Object.entries(this.data.slots).forEach(([k, v]) => {
      let node = tree?.find(v)
      if (node) {
        this.compObj[createChildKey('items', k, 'component')] = node.toArray()
      }
    })
  }
}
