import { Component, ViewChild } from '@angular/core';
import { PropsDirective } from '../props.directive';
import { ComponentService } from 'src/app/service/component.service';
import { copy } from 'src/helper';
// type
import type {Component as Comp, } from 'src/types/component'
import type { PropsConfigItem } from 'src/types/config'
// import type {
//   ComponentPropsMetaRaw as CPMR,
//   ComponentPropsMetaItemRaw as CPMIR,
//   ComponentPropsMetaItem as ConfigItem,
//   SelectOptionsItem
// } from 'src/types/props'
import type { A, ConfigItem, S, F, } from 'src/types/base';
// data
// import * as 
import {
  Button as buttonPropsMeta,
  Input as inputPropsMeta,
  Select as selectPropsMeta,
  Modal as modalPropsMeta,
  Form as formPropsMeta,
  Table as tablePropsMeta,
  Icon as iconPropsMeta,
  Checkbox as CheckPropsMeta,
} from '../../../helper/props'

let clog = console.log

@Component({
  selector: 'app-props-box',
  templateUrl: './props-box.component.html',
  styleUrls: ['./props-box.component.sass']
})
export class PropsBoxComponent {
  @ViewChild(PropsDirective, {static: true}) propsDirective!: PropsDirective
  curComp?: Comp | null
  // componentPropsMeta: CPMR
  componentPropsMeta: PropsConfigItem = {
    key: {
      category: 'select',
      options: [
          {label: 'button', value: 'button'},
          {label: 'submit', value: 'submit'},
          {label: 'reset', value: 'reset'},
      ],
      value: 'button',
      label: '类型',
      key: '',
    },
  }
  componentPropsList: ConfigItem[]
  msg: {}[]
  propsMap: Map<S, {f: F, targetKey: S}>
  constructor(private componentService: ComponentService) {
    this.curComp = null
    this.componentPropsList = []
    this.msg = []
    this.componentService.curComponent$.subscribe(p => {
      this.curComp = p
      this.componentSelectedChange()
    })
    this.propsMap = new Map()
  }
  ngOnInit() {
  }
  componentSelectedChange() {
    // 先清空
    this.componentPropsList = []
    // 再赋值
    // 取出模板再赋值当前值
    // todo 可优化为从map对象中取映射值
    // todo 优化为从配置文件中取出可配置项
    switch(this.curComp?.type) {
      case 'Button':
        // Object.entries(this.curComp.props).forEach(([key, value]) => {
        //   let o: ConfigItem = JSON.parse(JSON.stringify(buttonPropsMeta[key]))
        //   o.key = key
        //   o.value = value
        //   this.componentPropsList.push(o)
        // })
        Object.values(buttonPropsMeta).forEach(item => {
          item.value = this.curComp?.props[item.key]
          this.componentPropsList.push(item)
        })
        break
      case 'Input':
        // Object.entries(this.curComp.props).forEach(([key, value]) => {
        //   let o: ConfigItem = JSON.parse(JSON.stringify(inputPropsMeta[key]))
        //   o.key = key
        //   o.value = value
        //   this.componentPropsList.push(o)
        // })
        Object.values(inputPropsMeta).forEach(item => {
          item.value = this.curComp?.props[item.key]
          this.componentPropsList.push(item)
        })
        break
      case 'Select':
        // 读取数据结构
        // 读取配置数据
        // 为数据结构赋值
        // push到数组中
        // 以props配置文件决定显示多少
        Object.values(selectPropsMeta).forEach((item: ConfigItem) => {
          item.value = this.curComp!.props[item.key] // value
          this.componentPropsList.push(item)
        })
        break
      case 'Modal':
        // Object.entries(this.curComp.props).forEach(([key, value]) => {
        //   let o: ConfigItem = JSON.parse(JSON.stringify(modalPropsMeta[key]))
        //   o.key = key
        //   o.value = value
        //   this.componentPropsList.push(o)
        // })
        Object.values(modalPropsMeta).forEach(item => {
          item.value = this.curComp?.props[item.key]
          this.componentPropsList.push(item)
        })
        break
      // case 'Table':
      //   break
      case 'Form':
        // Object.entries(this.curComp.props).forEach(([key, value]) => {
        //   let o: ConfigItem = JSON.parse(JSON.stringify(formPropsMeta[key]))
        //   o.key = key
        //   o.value = value
        //   this.componentPropsList.push(o)
        // })
        Object.values(formPropsMeta).forEach(item => {
          item.value = this.curComp?.props[item.key]
          this.componentPropsList.push(item)
        })
        break
      case 'Table':
        // todo把其他组件也改为从配置文件中取配置项。
        // todo配置文件改为数组
        Object.values(tablePropsMeta).forEach((item: ConfigItem) => {
          item.value = this.curComp!.props[item.key] // value
          this.componentPropsList.push(item)
        })
        break;
      case 'Icon':
        // todo把其他组件也改为从配置文件中取配置项。
        // todo配置文件改为数组
        Object.values(iconPropsMeta).forEach((item: ConfigItem) => {
          item.value = this.curComp!.props[item.key] // value
          this.componentPropsList.push(item)
        })
        break;
      case 'Checkbox':
        Object.values(CheckPropsMeta).forEach((item: ConfigItem) => {
          item.value = this.curComp!.props[item.key] // value
          this.componentPropsList.push(item)
        })
        break;
      default:
        this.componentPropsMeta = {}
        break
    }
    this.componentPropsList = this.componentPropsList.map(item => {
      let f = item.hide
      if (f) {
        return {
          ...item,
          hideCalc: f(this.componentPropsList)
        }
      } else {
        return {
          ...item,
          hideCalc: false
        }
      }
    })
    this.componentPropsList.forEach(item => {
      if (item.hideListenerKey) {
        this.propsMap.set(item.hideListenerKey, {
          f: (propsObj: ConfigItem) => {
            let f = item.hide
            if (f) {
              return f(propsObj)
            } else {
              return true
            }
          },
          targetKey: item.key
        })
      }
      // return list
    })
  }
  compUlidClickH (ref: HTMLElement) {
    copy(ref.innerText).then(() => {
      this.msg = [{ severity: 'success', summary: '', content: '已经复制' }];
    })
  }
  listenerChange(listenerKey: S, propsObj: Comp['props']) {
    let obj = this.propsMap.get(listenerKey)
    if (obj) {
      let t = this.componentPropsList.find(item => item.key === obj.targetKey)
      if (t) {
        t.hideCalc = obj.f(propsObj)
      }
    }
  }
  itemChangeH(p: A) {
    this.componentPropsList.forEach(item => {
      if (item.key === p.key) {
        item.value = p.value
      }
    })
    let propsObj: Comp['props'] = {}
    this.componentPropsList.forEach(item => {
      propsObj[item.key] = item.value
    })
    this.listenerChange(p.key, propsObj)
  }
}
