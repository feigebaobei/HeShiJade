import { Component } from '@angular/core';
import { BadgeModule } from 'ng-devui';
import { ComponentService } from 'src/app/service/component.service';
import { CompBase } from 'src/helper/pool';
// type
import type { Component as Comp } from 'src/types/component';

@Component({
  selector: 'app-badge',
  // standalone: true,
  // imports: [
  //   BadgeModule,
  // ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.sass'
})
export class BadgeComponent extends CompBase {
  childComp: Comp | null
  constructor(
    private componentService: ComponentService,
  ) {
    super()
    this.childComp = null
  }
  override extraNgOnInit(): void {
    let tree = this.componentService.getTreeByKey()
      let node = tree?.find(this.data.slots['body'])
      let t = node?.toArray()[0]
      if (t) {
        this.childComp = t
      } else {
        this.childComp = null
      }
  }

}
