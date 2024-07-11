import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { createDebounceFn } from 'src/helper/index'
// import { CompDirective } from '../comp.directive'
// type
import type { A, ConfigItem, N, B, S, Options, ConfigItemSelect, F, } from 'src/types/base';

// interface T {
//   key: 'label' | 'key' | 'value'
//   value: S
// }

let clog = console.log
type newConfigItem = ConfigItem & {hideCalc: B}

@Component({
  selector: 'app-items-group',
  templateUrl: './items-group.component.html',
  styleUrls: ['./items-group.component.sass']
})
export class ItemsGroupComponent implements OnInit, OnDestroy {
  @Input() group: ConfigItem[] = []
  @Input() index: N = -1 // 第几个group
  // @ViewChild(CompDirective, {static: true, }) compHost!: CompDirective; // 正常运行
  // OptionsTemp: Options<S, A>
  reqChangeItems: F
  // inputChangeDebounce: F
  inputChangeH: F
  selectChangeH: F
  switchChangeH: F
  optionsChangeH: F
  itemList: newConfigItem[]
  eventMap: Map<S, {f: F, targetKey: S}>
  constructor(private componentService: ComponentService) {
    // let ele: ConfigItemSelect<A> | undefined = this.group.find(item => item.key === 'category') as ConfigItemSelect<A> | undefined
    // if (ele) {
    //   let selectOption = ele?.extend?.select
    //   // if (selectOption) {
    //   //   // this.OptionsTemp = selectOption
    //   // }
    // }
    // this.OptionsTemp = {}
    this.reqChangeItems = createDebounceFn(this.componentService.reqChangeItems, 400, this.componentService)
    // this.inputChangeDebounce = createDebounceFn((p: {
    //     key: 'label' | 'key' | 'value'
    //     value: S
    //   }) => {
    //     clog('inputChangeDebounce', p)
    //     this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
    //     // this.componentService.reqChangeItems(this.index, p.key, p.value)
    //   }, 400, this)
    // this.timer = 0
    this.itemList = []
    // this.itemList = this.group.map(item => {
    //   return {
    //     ...item,
    //     hideCalc: true,
    //     // hideCalc: item.hide,
    //   }
    // })
    this.eventMap = new Map()

    this.inputChangeH = createDebounceFn((p: {
        key: 'label' | 'key' | 'value'
        value: S
      }) => {
      this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
      this.componentService.reqChangeItems(this.index, p.key, p.value)
    }, 400)
    this.selectChangeH = createDebounceFn((p: {
        key: 'category'
        value: S
      }, subIndex: N) => {
      this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
      this.reqChangeItems(this.index, p.key, p.value)
      let item = this.itemList[subIndex]
      item.value = p.value
      this.listenerChange(p.key, this.itemList)
    }, 400)
    this.switchChangeH = createDebounceFn((p: {
      key: 'value'
      value: B
    }) => {
      this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
      this.reqChangeItems(this.index, p.key, p.value)
    }, 400)
    this.optionsChangeH = createDebounceFn((p: {key: 'options', value: Options<S, S>[]}) => {
      this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
      this.reqChangeItems(this.index, p.key, p.value)
    }, 400)
  }
  ngOnInit() {
    this.initCalc()
    // clog('this.itemList', this.itemList)
  }
  ngOnDestroy() {
    // this.compHost.viewContainerRef.clear();
  }
  initCalc() {
    this.itemList = this.group.map((item) => {
      let f = item.hide
      if (f) {
        return {
          ...item,
          hideCalc: f(this.group)
        }
      } else {
        return {
          ...item,
          hideCalc: false
        }
      }
    })
    this.itemList.forEach(item => {
      if (item.hideListenerKey) {
        this.eventMap.set(
          `compId${item.hideListenerKey}`,
          {
            f: (obj: newConfigItem[]) => {
              let f = item.hide
              if (f) {
                // f(this.itemList)
                return f(obj)
              } else {
                return true
              }
            },
            targetKey: item.key,
          }
        )
      }
    })
    // clog('eventMap', this.eventMap)
  }
  listenerChange(listenerKey: S, group: newConfigItem[]) {
    let obj = this.eventMap.get(`compId${listenerKey}`)
    if (obj) {
      let t = this.itemList.find(item => item.key === obj!.targetKey)
      if (t) {
        t.hideCalc = obj.f(group)
      }
      clog('curItem', this.itemList)
    }
  }
  // inputChangeH(p: {
  //   key: 'label' | 'key' | 'value'
  //   value: S
  // }) {
  //   this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
  //   this.componentService.reqChangeItems(this.index, p.key, p.value)
  //   // this.reqChangeItems(this.index, p.key, p.value)
  // }
  // inputChangeH(p: {
  //   key: 'label' | 'key' | 'value'
  //   value: S
  // }) {
  //   clog('inputChangeH')
  //   // this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
  //   // this.componentService.reqChangeItems(this.index, p.key, p.value)
  //   // this.reqChangeItems(this.index, p.key, p.value)
  //   this.inputChangeDebounce(p)
  // }
  // inputChangeH: createDebounceFn((p) => {
  //   clog('inputChangeH p', p)
  // }, 400)
  // selectChangeH(p: {
  //   key: 'category'
  //   value: S
  // }, subIndex: N) {
  //   this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
  //   this.reqChangeItems(this.index, p.key, p.value)
  //   let item = this.itemList[subIndex]
  //   item.value = p.value
  //   this.listenerChange(p.key, this.itemList)
  // }
  // switchChangeH(p: {
  //   key: 'value'
  //   value: B
  // }) {
  //   this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
  //   this.reqChangeItems(this.index, p.key, p.value)
  // }
  // optionsChangeH(p: {key: 'options', value: Options<S, S>[]}) {
  //   this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
  //   this.reqChangeItems(this.index, p.key, p.value)
  // }
}
