import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PropsDirective } from 'src/app/props.directive';
// 组件
import { PropsInputComponent } from '../props-input/props-input.component';
import { PropsSelectComponent } from '../props-select/props-select.component';
import { PropsSwitchComponent } from '../props-switch/props-switch.component';
// import { PropsOptionComponent } from '../props-option/props-option.component';
// type
import type { A, ConfigItem, } from 'src/types/base';
// import type { ComponentPropsMetaItem } from 'src/types/props'

let clog = console.log

@Component({
  selector: 'app-props-item',
  templateUrl: './props-item.component.html',
  styleUrls: ['./props-item.component.sass']
})
export class PropsItemComponent implements OnInit {
  // @Input() propItem!: ComponentPropsMetaItem
  @Input() propItem!: ConfigItem
  @ViewChild(PropsDirective, {static: true}) propsHost!: PropsDirective
  @Output() itemChange = new EventEmitter()
  propArr: A[]
  constructor() {
    this.propArr = []
  }
  ngOnInit() {
    let viewContainerRef = this.propsHost.viewContainerRef
    viewContainerRef.clear() // 先清空

    let componentRef: A
    // 根据type使用相应的表单元素渲染设置器
    switch(this.propItem.category) {
      case 'input':
      default:
        componentRef = viewContainerRef.createComponent(PropsInputComponent)
        componentRef.instance.data = this.propItem
        // 绑定事件
        componentRef.instance.change.subscribe((v: A) => {
          // clog('change', v)
          this.itemChange.emit({key: this.propItem.key, value: v})
        })
        break
      case 'select':
        componentRef = viewContainerRef.createComponent(PropsSelectComponent)
        componentRef.instance.data = this.propItem
        break
      case 'switch':
        componentRef = viewContainerRef.createComponent(PropsSwitchComponent)
        componentRef.instance.data = this.propItem
        break
      // 暂时不渲染option
      // todo 需要支持option
      // case 'option':
      //   componentRef = viewContainerRef.createComponent(PropsOptionComponent)
      //   componentRef.instance.data = this.propItem
        // break
    }
  }
}
