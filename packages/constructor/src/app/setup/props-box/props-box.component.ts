import { Component, Input, ViewChild } from '@angular/core';
import { PropsDirective } from 'src/app/props.directive';
import { ComponentService } from 'src/app/service/component.service';
// type
import type {Component as Comp, } from 'src/types/component'
import type { PropsConfigItem } from 'src/types/config'
// import type {
//   ComponentPropsMetaRaw as CPMR,
//   ComponentPropsMetaItemRaw as CPMIR,
//   ComponentPropsMetaItem as ConfigItem,
//   SelectOptionsItem
// } from 'src/types/props'
import type { A, ConfigItem, } from 'src/types/base';
// data
// import * as 
import {
  Button as buttonPropsMeta,
  Input as inputPropsMeta,
  Select as selectPropsMeta,
  Modal as modalPropsMeta,
  Form as formPropsMeta,
  Table as tablePropsMeta,
} from '../../../helper/props'

let clog = console.log

@Component({
  selector: 'app-props-box',
  templateUrl: './props-box.component.html',
  styleUrls: ['./props-box.component.sass']
})
export class PropsBoxComponent {
  // @Input() data: A
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
  constructor(private componentService: ComponentService) {
    this.curComp = null
    this.componentPropsList = []
    this.msg = []
    this.componentService.compSubject$.subscribe(p => {
      this.curComp = p
      this.componentSelectedChange()
    })
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
        Object.entries(this.curComp.props).forEach(([key, value]) => {
          let o: ConfigItem = JSON.parse(JSON.stringify(buttonPropsMeta[key]))
          o.key = key
          o.value = value
          this.componentPropsList.push(o)
        })
        break
      case 'Input':
        Object.entries(this.curComp.props).forEach(([key, value]) => {
          let o: ConfigItem = JSON.parse(JSON.stringify(inputPropsMeta[key]))
          o.key = key
          o.value = value
          this.componentPropsList.push(o)
        })
        break
      case 'Select':
        // 读取数据结构
        // 读取配置数据
        // 为数据结构赋值
        // push到数组中
        // this.componentPropsMeta = selectPropsMeta
        // Object.keys(this.componentPropsMeta).forEach((key) => {
        //   let o: ConfigItem = {
        //     ...this.componentPropsMeta[key],
        //     propKey: key,
        //     componentUlid: this.curComp!.ulid
        //   }
        //   // 赋值
        //   o.overFields.forEach(field => {
        //     o[field] = this.curComp?.props[key]
        //   })
        //   this.componentPropsList.push(o)
        // })
        
        Object.entries(this.curComp.props).forEach(([key, value]) => {
          let o: ConfigItem = JSON.parse(JSON.stringify(selectPropsMeta[key]))
          o.key = key
          o.value = value
          this.componentPropsList.push(o)
        })
        break
      case 'Modal':
        // this.componentPropsMeta = modalPropsMeta
        // Object.keys(this.componentPropsMeta).forEach((key) => {
        //   let o: ConfigItem = {
        //     ...this.componentPropsMeta[key],
        //     propKey: key,
        //     componentUlid: this.curComp!.ulid
        //   }
        //   o.overFields.forEach(field => {
        //     o[field] = this.curComp?.props[key]
        //   })
        //   this.componentPropsList.push(o)
        // })
        Object.entries(this.curComp.props).forEach(([key, value]) => {
          let o: ConfigItem = JSON.parse(JSON.stringify(modalPropsMeta[key]))
          o.key = key
          o.value = value
          this.componentPropsList.push(o)
        })
        break
      // case 'Table':
      //   break
      case 'Form':
        // this.componentPropsMeta = formPropsMeta
        // Object.keys(this.componentPropsMeta).forEach((key) => {
        //   let o: ConfigItem = {
        //     ...this.componentPropsMeta[key],
        //     propKey: key,
        //     componentUlid: this.curComp!.ulid
        //   }
        //   o.overFields.forEach(field => {
        //     o[field] = this.curComp?.props[key]
        //   })
        //   this.componentPropsList.push(o)
        // })

        Object.entries(this.curComp.props).forEach(([key, value]) => {
          let o: ConfigItem = JSON.parse(JSON.stringify(formPropsMeta[key]))
          o.key = key
          o.value = value
          this.componentPropsList.push(o)
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
      default:
        this.componentPropsMeta = {}
        break
    }
  }
  compUlidClickH (ref: HTMLElement) {
    let range = document.createRange()
    range.selectNode(ref)
    window.getSelection()?.removeAllRanges()
    window.getSelection()?.addRange(range)
    document.execCommand('copy')
    this.msg = [{ severity: 'success', summary: '', content: '已经复制' }];
    window.getSelection()?.removeAllRanges()
  }
}
