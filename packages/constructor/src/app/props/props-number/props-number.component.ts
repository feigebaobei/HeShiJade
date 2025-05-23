import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { createDebounceFn } from 'src/helper';
import { debounceTime } from 'src/helper/config';
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
      this.componentService.setProps(this.data.key, this.data.value)
      this.componentService.propsS.set({
        componentUlid: this.componentService.curComponent()!.ulid,
        key: this.data.key,
        value: this.data.value,
      })
      this.componentService.reqUpdateComponent('props', this.data.key, this.data.value)
      this.change.emit(v)
    }, debounceTime)
  }
  ngOnInit() {
    // this.value = this.data.value
  }
}
