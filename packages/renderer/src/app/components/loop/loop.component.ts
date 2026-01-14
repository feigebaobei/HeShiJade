import { Component, computed, Input, signal, WritableSignal } from '@angular/core';
import { asyncFn, createChildKey } from 'src/helper/index'
import { pool } from 'src/helper/pool';
import { getLoopEventParams } from 'src/helper';
import { ComponentService } from 'src/app/service/component.service';
// type
import type { Component as Comp, componentInstanceData } from 'src/types/component'
import type { ULID } from 'src/types';
import type { B, S, N, A, O } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-loop',
  // standalone: true,
  // imports: [],
  templateUrl: './loop.component.html',
  styleUrl: './loop.component.sass'
})
export class LoopComponent {
  @Input() data!: componentInstanceData
  @Input() loopIndex: N = -1
  compArr: componentInstanceData[]
  loopValue: componentInstanceData['props'][]
  childComp: Comp | undefined
  styleObj: O
  itemStyleObj: O
  // dataArr: Comp[]
  dataArr: WritableSignal<Comp[]>
  constructor(private componentService: ComponentService) {
    this.loopValue = [];
    this.compArr = []
    this.childComp = undefined
    this.styleObj = {}
    this.itemStyleObj = {}
    // this.dataArr = []
    this.dataArr = signal([])
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  setLoopValue(a: componentInstanceData['props'][]) {
    this.loopValue = a
    clog('setLoopValue', this.loopValue)
    this.setDataArr()
  }
  setLoopValueByIndex(v: componentInstanceData['props'], index: N) {
    this.loopValue[index] = v
    this.setDataArr()
  }
  setDataArr() {
    // if (this.childComp) {
    //   this.dataArr = this.loopValue.map(item => {
    //     return {
    //       ...this.childComp,
    //       props: item,
    //     } as Comp
    //   })
    // } else {
    //   this.dataArr = []
    // }
    if (this.childComp) {
      let arr = this.loopValue.map(item => {
        return {
          ...this.childComp,
          props: item
        } as Comp
      })
      this.dataArr.set(arr)
    } else {
      this.dataArr.set([])
    }
  }
  // objArr = computed(() => {
  //   clog('computed', !!this.childComp, this.loopValue)
  //   if (this.childComp) {
  //     return this.loopValue.map(item => {
  //       return {
  //         ...this.childComp,
  //         props: item,
  //       } as Comp
  //     })
  //   } else {
  //     return []
  //   }
  // })
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', getLoopEventParams(this.loopIndex, undefined), this)
  }
  ngOnInit() {
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', getLoopEventParams(this.loopIndex, undefined), this)
    // asyncFn(() => {}).then(() => {})
    let tree = this.componentService.getTreeByKey()
    let ulid = this.data.slots['body']
    if (ulid) {
      this.childComp = tree?.find(ulid)?.value
      clog('childComp', this.childComp)
      // if (compT) {

      //   // this.loopValue = {
      //   //   ...compT,
      //   // }
      //   // this.loopValue.forEach(item => {
      //   //   this.compArr.push
      //   // })
      // }
    }
    // clog('objArr', this.objArr())
    switch (this.data.props['layout']) {
      case 'flex':
        this.styleObj = {
          'justify-content': this.data.props['justifyContentFlex'],
          'align-items': this.data.props['alignItemsFlex'],
          'flex-direction': this.data.props['flexDirection'],
          'flex-wrap': this.data.props['flexWrap'],
          'row-gap': this.data.props['rowGap'],
          'column-gap': this.data.props['columnGap'],
          // height: '200px',
        }
        this.itemStyleObj = {
          'flex-grow': this.data.props['flexGrow'],
          'flex-shrink': this.data.props['flexShrink'],
          'flex-basis': this.data.props['flexBasis'],
          'height': this.data.props['itemHeight'],
        }
        break;
      case 'grid':
        this.styleObj = {
          'grid-template-columns': this.data.props['gridTemplateColumns'],
          'grid-template-rows': this.data.props['gridTemplateRows'],
          'grid-auto-flow': this.data.props['gridAutoFlow'],
          'justify-items': this.data.props['justifyItemsGrid'],
          'align-items': this.data.props['alignItemsGrid'],
          'align-content': this.data.props['alignContentGrid'],
        }
        this.itemStyleObj = {}
        break;
      default:
        this.styleObj = {}
        this.itemStyleObj = {}
        break;
    }

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
