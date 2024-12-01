import { Component, Input, OnInit, ViewChild, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { PropsDirective } from '../props.directive';
// 组件
import { PropsInputComponent } from '../props-input/props-input.component';
import { PropsSelectComponent } from '../props-select/props-select.component';
import { PropsSwitchComponent } from '../props-switch/props-switch.component';
import { PropsOptionComponent } from '../props-option/props-option.component'
import { PropsNumberComponent } from '../props-number/props-number.component';
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
export class PropsItemComponent implements OnInit, AfterContentInit {
  // @Input() propItem!: ComponentPropsMetaItem
  @Input() propItem!: ConfigItem
  @ViewChild(PropsDirective, {static: true}) propsHost!: PropsDirective
  @Output() itemChange = new EventEmitter()
  propArr: A[]
  constructor() {
    this.propArr = []
  }
  ngOnInit() {
  }
  init() {
    if (!this.propsHost) return
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
          this.itemChange.emit({key: this.propItem.key, value: v})
        })
        break
      case 'select':
        componentRef = viewContainerRef.createComponent(PropsSelectComponent)
        componentRef.instance.data = this.propItem
        // 绑定事件
        componentRef.instance.change.subscribe((v: A) => {
          this.itemChange.emit({key: this.propItem.key, value: v})
        })
        break
      case 'switch':
        componentRef = viewContainerRef.createComponent(PropsSwitchComponent)
        componentRef.instance.data = this.propItem
        // 绑定事件
        componentRef.instance.change.subscribe((v: A) => {
          // this.itemChange.emit({key: this.propItem.key, value: v})
          this.itemChange.emit({key: this.propItem.key, checked: v})
        })
        break
      case 'options':
        componentRef = viewContainerRef.createComponent(PropsOptionComponent)
        componentRef.instance.data = this.propItem
        // 绑定事件
        componentRef.instance.change.subscribe((v: A) => {
          this.itemChange.emit({key: this.propItem.key, value: v})
        })
        break;
      case 'number':
        componentRef = viewContainerRef.createComponent(PropsNumberComponent)
        componentRef.instance.data = this.propItem
        // 绑定事件
        componentRef.instance.change.subscribe((v: A) => {
          clog('subscribe', v)
          this.itemChange.emit({key: this.propItem.key, value: v})
        })
        break;
    }
  }
  ngAfterContentInit() { // 当指令的全部内容都初始化完成后只执行一次。一般用于执行初始化任务。
    this.init()
  }
}
