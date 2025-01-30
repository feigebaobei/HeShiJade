import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { asyncFn, clog } from 'src/helper';

import { pool } from 'src/helper/utils';
// type
import type { B, O, N } from 'src/types/base';
import type { Component as Comp, componentInstanceData } from 'src/types/component'

@Component({
  selector: 'app-grid',
  // standalone: true,
  // imports: [],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.sass'
})
export class GridComponent implements OnInit, OnDestroy {
  @Input() data!: componentInstanceData
  compArr: {
    comp: Comp | undefined,
    styleObj: O
  }[]
  // (Comp | undefined)[]
  show: B
  styleObj: O
  constructor(
    private componentService: ComponentService
  ) {
    this.compArr = []
    this.show = false
    this.styleObj = {}
  }

  createSlotsKey(index: N) {
    return `${index}_items`
  }
  ngOnInit(): void {
    clog(this.data)
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', undefined, this)
    asyncFn(() => {
      this.show = false
      this.styleObj = {
        'grid-template-columns': this.data.props['gridTemplateColumns'],
        'grid-template-rows': this.data.props['gridTemplateRows'],
        'row-gap': this.data.props['rowGap'],
        'column-gap': this.data.props['columnGap'],
        'grid-template-areas': this.data.props['gridTemplateAreas'],
        'grid-auto-flow': this.data.props['gridAutoFlow'],
        'justify-items': this.data.props['justifyItems'],
        'align-items': this.data.props['alignItems'],
        'justify-content': this.data.props['justifyContent'],
        'align-content': this.data.props['alignContent'],
        'padding': this.data.props['padding'],
        'margin': this.data.props['margin'],
    }
      let tree = this.componentService.getTreeByKey()
      this.data.items.forEach((item, index: N) => {
        let compT = tree?.find(this.data.slots[this.createSlotsKey(index)])?.value
        if (compT) {
          this.compArr.push({
            comp: compT,
            styleObj: {
              'grid-column-start': item['gridColumnStart'],
              'grid-row-start': item['gridRowStart'],
              'grid-row-end': item['gridRowEnd'],
              'grid-area': item['gridArea'],
              'justify-self': item['justifySelf'],
              'align-self': item['alignSelf'],
            }
          })
        } else {
          this.compArr.push({
            comp: undefined,
            styleObj: {}
          })
        }
      })

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
