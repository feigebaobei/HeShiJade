import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PropsDirective } from 'src/app/props.directive';
// 组件
import { PropsInputComponent } from '../props-input/props-input.component';
// type
import type { A } from 'src/types/base';

@Component({
  selector: 'app-props-item',
  templateUrl: './props-item.component.html',
  styleUrls: ['./props-item.component.sass']
})
export class PropsItemComponent implements OnInit {
  @Input() propItem: A
  @ViewChild(PropsDirective, {static: true}) propsHost!: PropsDirective
  propArr: A[]
  constructor() {
    this.propArr = []
  }
  ngOnInit() {
    let viewContainerRef = this.propsHost.viewContainerRef
    viewContainerRef.clear() // 先清空
    let componentRef: A = viewContainerRef.createComponent(PropsInputComponent)
    console.log('oninit', this, this.propItem)
    componentRef.instance.data = this.propItem
  }
}
