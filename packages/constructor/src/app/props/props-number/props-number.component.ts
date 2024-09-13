import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { createDebounceFn } from 'src/helper';
// type
import type { ConfigItemNumber, F, N, } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-props-number',
  // standalone: true,
  // imports: [],
  templateUrl: './props-number.component.html',
  styleUrl: './props-number.component.sass'
})
export class PropsNumberComponent implements OnInit {
  @Input() data!: ConfigItemNumber
  @Output() change = new EventEmitter<N>()
  value: N
  ngModelChangeH: F
  constructor(private componentService: ComponentService) {
    this.value = 0
    this.ngModelChangeH = createDebounceFn((v: N) => {
      clog('createDebounceFn', v)
      this.componentService.setComponentProp(this.data.key, this.data.value)
      this.componentService.propsS.set({
        componentUlid: this.componentService.curComponent()!.ulid,
        key: this.data.key,
        value: this.data.value,
      })
      this.componentService.reqUpdateComponentProps('props', this.data.key, this.data.value)
      this.change.emit(v)
    }, 400)
  }
  ngOnInit() {
    // this.value = this.data.value
  }
}
