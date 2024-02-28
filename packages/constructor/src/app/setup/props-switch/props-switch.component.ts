import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service'; {}
import { A } from 'src/types/base';

@Component({
  selector: 'app-props-switch',
  templateUrl: './props-switch.component.html',
  styleUrls: ['./props-switch.component.sass']
})
export class PropsSwitchComponent {
  @Input() data: A
  constructor(private componentService: ComponentService) {}
  change() {
    // this.componentService.setCurComponentProp(this.data.propKey, this.data.value)
    this.componentService.setComponentProp(this.data.propKey, this.data.value)
  }
}
