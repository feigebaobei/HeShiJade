import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PropsDirective } from 'src/app/props.directive';
// 组件
import { PropsInputComponent } from '../props-input/props-input.component';
import { PropsSelectComponent } from '../props-select/props-select.component';
import { PropsSwitchComponent } from '../props-switch/props-switch.component';
import { PropsOptionComponent } from '../props-option/props-option.component';
// type
import type { A } from 'src/types/base';
import type { ComponentPropsMetaItem } from 'src/types/props'

@Component({
  selector: 'app-props-item',
  templateUrl: './props-item.component.html',
  styleUrls: ['./props-item.component.sass']
})
export class PropsItemComponent implements OnInit {
  @Input() propItem!: ComponentPropsMetaItem
  @ViewChild(PropsDirective, {static: true}) propsHost!: PropsDirective
  propArr: A[]
  constructor() {
    this.propArr = []
  }
  ngOnInit() {
    let viewContainerRef = this.propsHost.viewContainerRef
    viewContainerRef.clear() // 先清空

    let componentRef: A
    // viewContainerRef.createComponent(PropsInputComponent)
    // console.log('oninit', this, this.propItem)
    // componentRef.instance.data = this.propItem
    // 根据type使用相应的表单元素渲染设置器
    switch(this.propItem.type) {
      case 'input':
      default:
        componentRef = viewContainerRef.createComponent(PropsInputComponent)
        componentRef.instance.data = this.propItem
        break
      case 'select':
        componentRef = viewContainerRef.createComponent(PropsSelectComponent)
        componentRef.instance.data = this.propItem
        break
      case 'switch':
        componentRef = viewContainerRef.createComponent(PropsSwitchComponent)
        componentRef.instance.data = this.propItem
        break
      case 'option':
        componentRef = viewContainerRef.createComponent(PropsOptionComponent)
        componentRef.instance.data = this.propItem
        break
    }
  }
}
