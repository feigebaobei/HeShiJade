import { Component } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { CompBase } from 'src/helper/pool';
// type
import type { Component as Comp } from 'src/types/component';

let clog = console.log

@Component({
  selector: 'app-card',
  // standalone: true,
  // imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})
export class CardComponent extends CompBase {
  childrenBody: Comp[]
  childrenActions: Comp[]
  constructor(
    private componentService: ComponentService,
  ) {
    super()
    this.childrenBody = []
    this.childrenActions = []

  }
  override ngOnInit(): void {
    let tree = this.componentService.getTreeByKey()
    this.childrenActions.push()
    Object.entries(this.data.slots).forEach(([area, ulid]) => {
      switch (area) {
        case 'body':
          this.childrenBody.push(...(tree?.find(ulid)?.toArray() || []))
          break;
        case 'actions':
          this.childrenActions.push(...(tree?.find(ulid)?.toArray() || []))
          break;
      }
    })
    this.pool.register(this.data.ulid, this, this.data.behavior)
    this.pool.trigger(this.data.ulid, 'postComponentNgOnInit', this.getLoopEventParams(this.loopIndex, undefined), this)
  }
}
