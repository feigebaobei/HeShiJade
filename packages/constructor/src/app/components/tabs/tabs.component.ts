import { Component, Input, OnInit } from '@angular/core';
// type
import type { Component as Comp, ComponentMountItems } from 'src/types/component';
import type { ULID } from 'src/types';
import { S } from 'src/types/base';

interface TabsData {
  props: Comp['props']
  items: Comp['items']
  ulid: ULID
  // mount: ComponentMountItems
}

@Component({
  selector: 'app-tabs',
  // standalone: true,
  // imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.sass'
})
export class TabsComponent implements OnInit{
  @Input() data!: TabsData
  // activeTab: S = 'id'
  constructor() {
    // this.activeTab = 'tab1' // this.data.props['activeTab']
  }
  ngOnInit() {
    // this.activeTab = this.data.props['activeTab'] || 'id'
  }
}
