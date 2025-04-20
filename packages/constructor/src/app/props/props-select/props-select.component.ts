import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { debounceTime } from 'src/helper/config';
import { createDebounceFn } from 'src/helper/index'
import { A, F, S } from 'src/types/base';

@Component({
  selector: 'app-props-select',
  templateUrl: './props-select.component.html',
  styleUrls: ['./props-select.component.sass']
})
export class PropsSelectComponent {
  @Input() data: A
  @Output() change = new EventEmitter()
  modelChangeH: F
  constructor(private componentService: ComponentService) {
    this.modelChangeH = createDebounceFn((v: S) => {
      this.componentService.setProps(this.data.key, this.data.value)
      this.componentService.reqUpdateComponent('props', this.data.key, this.data.value)
      this.change.emit(v)
    }, debounceTime)
  }
  // change() {
  // modelChangeH(v: S) {
  // }
}
