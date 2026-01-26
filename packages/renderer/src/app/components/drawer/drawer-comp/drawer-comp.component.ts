import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { clog, createChildKey } from 'src/helper';
import { ULID } from 'src/types';
// type
import type { Component as Comp } from 'src/types/component';
import { ComponentsModule } from '../../components.module';
import { IconModule } from 'ng-devui';
import { A, F } from 'src/types/base';

@Component({
  selector: 'app-drawer-comp',
  // standalone: true,
  // imports: [
  //   IconModule,
  //   ComponentsModule,
  // ],
  templateUrl: './drawer-comp.component.html',
  styleUrl: './drawer-comp.component.sass'
})
export class DrawerCompComponent {
  @Input() data!: A // {ulid: ULID, props: Comp['props']}
  @Input() close!: A // {ulid: ULID, props: Comp['props']}
  @Input() fullScreen!: F
  componentListBody: Comp[]
  componentListFooter: Comp[]
  constructor(
    private componentService: ComponentService,
  ) {
    this.componentListBody = []
    this.componentListFooter = []
  }
  fullScreenClickH() {
    this.fullScreen()
  }
  iconClickH(event: Event) {
    this.close(event)
  }
  ngOnInit() {
    // clog('init', this.data)
    let tree = this.componentService.getTreeByKey()
    if (tree) {
      let node = tree.find(this.data.ulid)
      let bodyKey = createChildKey('slots', 'body', 'node')
      let footerKey = createChildKey('slots', 'footer', 'node')
      let bodyNode = node?.children[bodyKey]
      this.componentListBody = bodyNode?.toArray() || []
      let footerNode = node?.children[footerKey]
      this.componentListFooter = footerNode?.toArray() || []
    }
  }
}
