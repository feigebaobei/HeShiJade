import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
// type
import type { A, S, ConfigItem, ConfigItemInput } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-props-input',
  templateUrl: './props-input.component.html',
  styleUrls: ['./props-input.component.sass']
})
export class PropsInputComponent implements OnInit, OnChanges {
  // @Input() data!: ConfigItem
  @Input() data!: ConfigItemInput
  value: S
  constructor(private componentService: ComponentService) {
    // 类实例化时还没收到传入的数据。所以得不到
    // this.value = this.data.value
    this.value = ''
  }
  ngOnInit(): void {
    // 初始化组件时可以收到传入的数据。在这里赋值。
    // console.log('props input', this, this.data)
    this.value = this.data.value
  }
  ngOnChanges(...p: A) {
    // console.log('changie', p)
  }
  ngModel(...p: A) {
    console.log('ngModel', p)
  }
  change() {
    // this.componentService.setCurComponentProp(this.data.propKey, this.data.value)
    this.componentService.setComponentProp(this.data.key, this.data.value)
    this.componentService.reqUpdateComponentProps('props', this.data.key, this.data.value)
  }
}
