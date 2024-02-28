import { Component, Input, ViewChild } from '@angular/core';
import { StackDirective } from 'src/app/stack.directive';
// 组件
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { SelectComponent } from 'src/app/components/select/select.component';
// type
import type { A, S } from 'src/types/base';

// data
let compMap: {[k: S]: A} = {
  Button: ButtonComponent,
  Form: FormComponent,
  Modal: ModalComponent,
  Input: InputComponent,
  Select: SelectComponent,
}

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.sass']
})
export class StackComponent {
  @Input() data: A
  @ViewChild(StackDirective, {static: true}) stack!: StackDirective;
  componentRef: A
  constructor() {
    let componentRef
  }
  ngOnInit() {
    this.init()
  }
  init() {
    let viewContainerRef = this.stack.viewContainerRef
    viewContainerRef.clear()
    // this.componentRef = viewContainerRef.createComponent(ButtonComponent)
    // this.componentRef.instance.data = {
    //   props: {
    //     type: 'button',
    //     bsSize: 'md',
    //     bordered: true,
    //     disabled: false,
    //     width: '100px',
    // },
    //   slot: 'button',
    // }
    this.componentRef = viewContainerRef.createComponent(compMap[this.data.type])
    switch(this.data.type) {
      case 'Button':
        this.componentRef.instance.data = {
          props: this.data.props,
          slot: this.data.slot,
        }
        break;
      case 'Form':
        this.componentRef.instance.data = {
          props: this.data.props,
          items: this.data.item,
        }
        break;
      case 'Modal':
        this.componentRef.instance.data = {
          props: this.data.props
        }
        break;
      case 'Input':
        this.componentRef.instance.data = {
          props: this.data.props,
        }
        break;
      case 'Select':
        this.componentRef.instance.data = {
          props: this.data.props,
        }
        break;
    }
  }
}
