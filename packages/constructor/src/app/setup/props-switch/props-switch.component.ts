import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service'; {}
import { createDebounceFn } from 'src/helper/index'
import { A, F, S } from 'src/types/base';

@Component({
  selector: 'app-props-switch',
  templateUrl: './props-switch.component.html',
  styleUrls: ['./props-switch.component.sass']
})
export class PropsSwitchComponent {
  @Input() data: A
  @Output() change = new EventEmitter()
  modelChangeH: F
  constructor(private componentService: ComponentService) {
    this.modelChangeH = createDebounceFn((v: S) => {
      this.componentService.setComponentProp(this.data.key, this.data.value)
      this.componentService.reqUpdateComponentProps('props', this.data.key, this.data.value)
      this.change.emit(v)
    }, 400)
  }
  // modelChangeH(v: S) {
  //   // this.componentService.setCurComponentProp(this.data.propKey, this.data.value)
  //   // this.componentService.setComponentProp(this.data.propKey, this.data.value)
  // }
}
