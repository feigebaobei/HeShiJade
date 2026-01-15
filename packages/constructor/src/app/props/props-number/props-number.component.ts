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
      // todo 2027.01.01+ for delete 所有使用propsS的地方。在项目中现有props的数据传递，不需要propsS也能正常运行。
      // 
      // this.componentService.propsS.set({
      //   componentUlid: this.componentService.curComponent()!.ulid,
      //   key: this.data.key,
      //   value: this.data.value,
      // })
      this.componentService.reqUpdateComponent('props', this.data.key, this.data.value)
      this.change.emit(v)
    }, debounceTime)
  }
  ngOnInit() {
    // this.value = this.data.value
  }
}
