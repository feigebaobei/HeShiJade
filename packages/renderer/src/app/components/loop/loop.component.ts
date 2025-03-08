import { Component, computed, Input } from '@angular/core';
import { asyncFn, createChildKey } from 'src/helper/index'
import { pool } from 'src/helper/pool';
// type
import type { Component as Comp, componentInstanceData } from 'src/types/component'
import type { ULID } from 'src/types';
import type { B, S, N, A, O } from 'src/types/base';
import { ComponentService } from 'src/app/service/component.service';

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
  compArr: componentInstanceData[]
  loopValue: componentInstanceData['props'][]
  childComp: Comp | undefined
  constructor(private componentService: ComponentService) {
    // for dev
    this.loopValue = [
      {
        error: false,
        placeholder: '请输入',
        showGlowStyle: true,
        size: '',
        styleType: 'default',
        value: '',
      },
      {
        error: false,
        placeholder: '请输入',
        showGlowStyle: true,
        size: '',
        styleType: 'default',
        value: '',
      },
      {
        error: false,
        placeholder: '请输入',
        showGlowStyle: true,
        size: '',
        styleType: 'default',
        value: '',
      },
    ];
    this.compArr = []
    this.childComp = undefined
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
    })
  }
  setLoopValue(a: componentInstanceData['props'][]) {
    this.loopValue = a
  }
  setLoopValueByIndex(v: componentInstanceData['props'], index: N) {
    this.loopValue[index] = v
  }
  objArr = computed(() => {
    if (this.childComp) {
      return this.loopValue.map(item => {
        return {
          ...this.childComp,
          props: item,
        } as Comp
      })
    } else {
      return []
    }
  })
  ngOnChanges() {
    pool.trigger(this.data.ulid, 'postComponentNgOnChanges', undefined, this)
  }
  ngOnInit() {
    pool.register(this.data.ulid, this, this.data.behavior)
    pool.trigger(this.data.ulid, 'postComponentNgOnInit', undefined, this)
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
    clog('objArr', this.objArr())
  }
  ngDoCheck() {
    pool.trigger(this.data.ulid, 'postComponentNgDoCheck', undefined, this)
  }
  ngAfterViewInit() {
    pool.trigger(this.data.ulid, 'postComponentNgAfterViewInit', undefined, this)
    pool.resolveComponentRender(this.data.pageUlid, this.data.ulid)
  }
  ngOnDestroy() {
    pool.trigger(this.data.ulid, 'postComponentNgOnDestroy', undefined, this)
    pool.unRegister(this.data.ulid)
  }

}
