import { Component, ViewChild } from '@angular/core';
import { StackDirective } from 'src/app/stack.directive';
// 组件
import { ButtonComponent } from 'src/app/components/button/button.component';
// type
import type { A } from 'src/types/base';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.sass']
})
export class StackComponent {
  componentRef: A
  @ViewChild(StackDirective, {static: true}) stack!: StackDirective;
  constructor() {
    let componentRef
  }
  ngOnInit() {
    this.init()
  }
  init() {
    let viewContainerRef = this.stack.viewContainerRef
    viewContainerRef.clear()
    this.componentRef = viewContainerRef.createComponent(ButtonComponent)
    this.componentRef.instance.data = {
      props: {k: 'v'},
      slot: {k: 'str'},
    }
  }
}
