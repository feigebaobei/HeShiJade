import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { asyncFn } from 'src/helper';
import { pool } from 'src/helper/utils';
// type
import type { B, O } from 'src/types/base';
import type { Component as Comp, componentInstanceData } from 'src/types/component'

let clog = console.log

@Component({
  selector: 'app-flex',
  // standalone: true,
  // imports: [],
  templateUrl: './flex.component.html',
  styleUrl: './flex.component.sass'
})
export class FlexComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  compArr: Comp[]
  show: B
  styleObj: O
  constructor(
    private componentService: ComponentService
  ) {
    this.compArr = []
    this.show = false
    this.styleObj = {}
  }
  ngOnInit() {
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', undefined, this)
    asyncFn(() => {
      this.show = false
      this.styleObj = {
        'justify-content': this.data.props['justifyContent'],
        'align-items': this.data.props['alignItems'],
        'flex-direction': this.data.props['flexDirection'],
        'flex-wrap': this.data.props['flexWrap'],
        'row-gap': this.data.props['rowGap'],
        'column-gap': this.data.props['columnGap'],
        'padding': this.data.props['padding'],
        'margin': this.data.props['margin'],
      }
      let tree = this.componentService.getTreeByKey()
      this.compArr = tree?.find(this.data.slots[`0_${this.data.ulid}`])?.toArray() || []
    }).then(() => {
      this.show = true
    })
  }
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', undefined, this)
  }
  ngDoCheck() {
    pool.trigger(this.data.ulid, 'postComponentNgDoCheck', undefined, this)
  }
  ngAfterViewInit() {
    pool.trigger(this.data.ulid, 'postComponentNgAfterViewInit', undefined, this)
    pool.resolveComponentRender(this.data.pageUlid, this.data.ulid)
  }
  ngOnDestroy(): void {
    pool.trigger(this.data.ulid, 'postComponentNgOnDestroy', undefined, this)
    pool.unRegister(this.data.ulid)
  }
}
