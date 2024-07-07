import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service'; {}
import { A, S } from 'src/types/base';

@Component({
  selector: 'app-props-switch',
  templateUrl: './props-switch.component.html',
  styleUrls: ['./props-switch.component.sass']
})
export class PropsSwitchComponent {
  @Input() data: A
  constructor(private componentService: ComponentService) {}
  @Output() change = new EventEmitter()
  modelChangeH(v: S) {
    // this.componentService.setCurComponentProp(this.data.propKey, this.data.value)
    // this.componentService.setComponentProp(this.data.propKey, this.data.value)
    this.componentService.setComponentProp(this.data.key, this.data.value)
    this.componentService.reqUpdateComponentProps('props', this.data.key, this.data.value)
    this.change.emit(v)
  }
}
