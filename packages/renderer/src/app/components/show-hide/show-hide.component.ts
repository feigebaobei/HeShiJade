import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { asyncFn } from 'src/helper';
import { pool } from 'src/helper/pool';
import { getLoopEventParams } from 'src/helper';
// type
import type { B, O, N } from 'src/types/base';
import type { Component as Comp, componentInstanceData } from 'src/types/component'

let clog = console.log

@Component({
  selector: 'app-show-hide',
  // standalone: true,
  // imports: [],
  templateUrl: './show-hide.component.html',
  styleUrl: './show-hide.component.sass'
})
export class ShowHideComponent {
  @Input() data!: componentInstanceData
  @Input() loopIndex: N = -1
  childComp: Comp | null
  constructor(private componentService: ComponentService) {
    this.childComp = null
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', getLoopEventParams(this.loopIndex, undefined), this)
  }
  ngOnInit() {
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', getLoopEventParams(this.loopIndex, undefined), this)
    asyncFn(() => {
      let tree = this.componentService.getTreeByKey()
      let node = tree?.find(this.data.slots['body'])
      if (node?.toArray()[0]) {
        this.childComp = node?.toArray()[0]
      } else {
        this.childComp = null
      }
      return true
    }).then(() => {
    })
  }
  ngDoCheck() {
    pool.trigger(this.data.ulid, 'postComponentNgDoCheck', getLoopEventParams(this.loopIndex, undefined), this)
  }
  ngAfterViewInit() {
    pool.trigger(this.data.ulid, 'postComponentNgAfterViewInit', getLoopEventParams(this.loopIndex, undefined), this)
    pool.resolveComponentRender(this.data.pageUlid, this.data.ulid)
  }
  ngOnDestroy() {
    pool.trigger(this.data.ulid, 'postComponentNgOnDestroy', getLoopEventParams(this.loopIndex, undefined), this)
    pool.unRegister(this.data.ulid)
  }
}
