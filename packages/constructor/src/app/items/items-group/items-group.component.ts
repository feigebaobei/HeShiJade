import { Component, Input, ViewChild, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { compatibleArray, createDebounceFn } from 'src/helper/index'
import { debounceTime } from 'src/helper/config';
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
  @Output() remove = new EventEmitter()
  reqChangeItems: F
  // inputChangeDebounce: F
  inputChangeH: F
  selectChangeH: F
  switchChangeH: F
  optionsChangeH: F
  itemList: newConfigItem[]
  eventMap: Map<S, {f: F, targetKey: S, item: newConfigItem}[]>
  constructor(private componentService: ComponentService) {
    this.reqChangeItems = createDebounceFn(this.componentService.reqChangeItems, debounceTime, this.componentService)
    this.itemList = []
    this.eventMap = new Map()

    this.inputChangeH = createDebounceFn((p: {
        key: 'label' | 'key' | 'value'
        value: S
      }, subIndex: N) => {
      this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
      // this.componentService.reqChangeItems(this.index, p.key, p.value)
      this.reqChangeItems(this.index, p.key, p.value)
      let item = this.itemList[subIndex]
      if ('value' in item) {
        item.value = p.value
      }
      this.listenerChange(item)
    }, debounceTime)
    this.selectChangeH = createDebounceFn((p: {
        key: 'category'
        value: S
      }, subIndex: N) => {
      this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
      this.reqChangeItems(this.index, p.key, p.value)
      let item = this.itemList[subIndex]
      if ('value' in item) {
        item.value = p.value
      }
      this.listenerChange(item)
    }, debounceTime)
    this.switchChangeH = createDebounceFn((p: {
      key: 'checked'
      checked: B
    }, subIndex: N) => {
      this.componentService.setItemsOfCurComponent(this.index, p.key, p.checked)
      this.reqChangeItems(this.index, p.key, p.checked)
      let item = this.itemList[subIndex]
      if ('checked' in item) {
        item.checked = p.checked
      }
      this.listenerChange(item)
    }, debounceTime)
    this.optionsChangeH = createDebounceFn((p: {key: 'options', value: Options<S, S>[]}) => {
      this.componentService.setItemsOfCurComponent(this.index, p.key, p.value)
      this.reqChangeItems(this.index, p.key, p.value)
    }, debounceTime)
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
        if (this.eventMap.has(item.hideListenerKey)) {
          this.eventMap.get(item.hideListenerKey)!.push(this.createEventMapItem(item))
        } else {
          this.eventMap.set(item.hideListenerKey, [this.createEventMapItem(item)])
        }
      }
    })
  }
  listenerChange(item: newConfigItem) {
    compatibleArray(this.eventMap.get(String(item.key))).forEach(ele => {
      ele.item.hideCalc = ele.f(this.itemList)
    })
  }
  createEventMapItem(item: newConfigItem) {
    return {
      f: (obj: newConfigItem[]) => {
        let f = item.hide
        if (f) {
          return f(obj)
        } else {
          return true
        }
      },
      targetKey: item.key,
      item, // 引用
    }
  }
  deleteButtonClickH() {
    this.remove.emit()
  }
}
