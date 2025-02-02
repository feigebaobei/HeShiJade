import { Component, effect, ViewChild } from '@angular/core';
import { PropsDirective } from '../props.directive';
import { ComponentService } from 'src/app/service/component.service';
import { copy } from 'src/helper';
import { text } from 'src/helper/config';
// type
import type {Component as Comp, } from 'src/types/component'
import type { PropsConfigItem, Text } from 'src/types/config'
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
  Tabs as TabsPropsMeta,
  Pagination as PaginationPropsMeta,
  Flex as FlexPropsMeta,
  Grid as GridPropsMeta,
  Layout as LayoutPropsMeta,
  PageList as PageListPropsMeta,
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
  text: Text
  constructor(private componentService: ComponentService) {
    this.curComp = null
    this.componentPropsList = []
    this.msg = []
    this.propsMap = new Map()
    this.text = text
    effect(() => {
      let p = this.componentService.curComponentS.get()
      this.curComp = p
      this.componentSelectedChange()
    })
  }
  ngOnInit() {
  }
  opComponentPropsList(meta: PropsConfigItem) {
    Object.values(meta).forEach(item => {
      if ('value' in item) {
        item.value = this.curComp?.props[item.key]
      }
      if ('checked' in item) {
        item.checked = this.curComp?.props[item.key]
      }
      this.componentPropsList.push(item)
    })
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
        // Object.values(buttonPropsMeta).forEach(item => {
        //   if ('value' in item) {
        //     item.value = this.curComp?.props[item.key]
        //   }
        //   this.componentPropsList.push(item)
        // })
        this.opComponentPropsList(buttonPropsMeta)
        break
      case 'Input':
        // Object.values(inputPropsMeta).forEach(item => {
        //   item.value = this.curComp?.props[item.key]
        //   this.componentPropsList.push(item)
        // })
        this.opComponentPropsList(inputPropsMeta)
        break
      case 'Select':
        // 读取数据结构
        // 读取配置数据
        // 为数据结构赋值
        // push到数组中
        // 以props配置文件决定显示多少
        // Object.values(selectPropsMeta).forEach((item: ConfigItem) => {
        //   item.value = this.curComp!.props[item.key] // value
        //   this.componentPropsList.push(item)
        // })
        this.opComponentPropsList(selectPropsMeta)
        break
      case 'Modal':
        // Object.values(modalPropsMeta).forEach(item => {
        //   item.value = this.curComp?.props[item.key]
        //   this.componentPropsList.push(item)
        // })
        this.opComponentPropsList(modalPropsMeta)
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
        // Object.values(formPropsMeta).forEach(item => {
        //   item.value = this.curComp?.props[item.key]
        //   this.componentPropsList.push(item)
        // })
        this.opComponentPropsList(formPropsMeta)
        break
      case 'Table':
        // todo把其他组件也改为从配置文件中取配置项。
        // todo配置文件改为数组
        // Object.values(tablePropsMeta).forEach((item: ConfigItem) => {
        //   item.value = this.curComp!.props[item.key] // value
        //   this.componentPropsList.push(item)
        // })
        this.opComponentPropsList(tablePropsMeta)
        break;
      case 'Icon':
        // todo把其他组件也改为从配置文件中取配置项。
        // todo配置文件改为数组
        // Object.values(iconPropsMeta).forEach((item: ConfigItem) => {
        //   item.value = this.curComp!.props[item.key] // value
        //   this.componentPropsList.push(item)
        // })
        this.opComponentPropsList(iconPropsMeta)
        break;
      case 'Checkbox':
        this.opComponentPropsList(CheckPropsMeta)
        break;
      case 'Tabs':
        this.opComponentPropsList(TabsPropsMeta)
        break;
      case 'Pagination':
        this.opComponentPropsList(PaginationPropsMeta)
        break;
      case 'Flex':
        this.opComponentPropsList(FlexPropsMeta)
        break;
      case 'Grid':
        this.opComponentPropsList(GridPropsMeta)
        break;
      case 'Layout':
        this.opComponentPropsList(LayoutPropsMeta)
        break;
      case 'PageList':
        this.opComponentPropsList(PageListPropsMeta)
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
        if ('value' in item) {
          item.value = p.value
          this.componentService.setProps(item.key, item.value)
        }
        if ('checked' in item) {
          item.checked = p.checked
          this.componentService.setProps(item.key, item.checked)
        }
      }
    })
    let propsObj: Comp['props'] = {}
    this.componentPropsList.forEach(item => {
      switch (item.category) {
        default:
          propsObj[item.key] = item.value
          break;
        case 'switch':
          propsObj[item.key] = item.checked
          break;
      }
    })
    this.listenerChange(p.key, propsObj)
  }

  identify(index: number, w: ConfigItem) {
    // return w.id; // or use index if no id is set and you only modify at the end...
    return w.key
  }
}
