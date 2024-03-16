import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { A } from 'src/types/base';

@Component({
  selector: 'app-props-select',
  templateUrl: './props-select.component.html',
  styleUrls: ['./props-select.component.sass']
})
export class PropsSelectComponent {
  @Input() data: A
  constructor(private componentService: ComponentService) {}
  change() {
    // this.componentService.setCurComponentProp(this.data.propKey, this.data.value)
    this.componentService.setComponentProp(this.data.key, this.data.value)
    // this.componentService.reqUpdateComponentProps('props', this.data.key, this.data.value)
  }
}
