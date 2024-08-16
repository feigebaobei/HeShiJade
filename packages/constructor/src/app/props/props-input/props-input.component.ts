import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { createDebounceFn } from 'src/helper/index'
// type
import type { A, S, ConfigItem, ConfigItemInput, F } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-props-input',
  templateUrl: './props-input.component.html',
  styleUrls: ['./props-input.component.sass']
})
export class PropsInputComponent implements OnInit, OnChanges {
  @Input() data!: ConfigItemInput
  value: S
  modelChangeH: F
  @Output() change = new EventEmitter()
  constructor(private componentService: ComponentService,
    // private pageService: PageService,
  ) {
    // 类实例化时还没收到传入的数据。所以得不到
    // this.value = this.data.value
    this.value = ''
    this.modelChangeH = createDebounceFn((v: S) => {
      // this.componentService.setCurComponentProp(this.data.propKey, this.data.value)
      this.componentService.setComponentProp(this.data.key, this.data.value)
      // this.componentService.setCurComponent(this.pageService.getCurPage()!.ulid, this.componentService.curComponent()!.ulid)
      this.componentService.props$.next({
        componentUlid: this.componentService.curComponent()!.ulid,
        key: this.data.key,
        value: this.data.value,
      })
      this.componentService.reqUpdateComponentProps('props', this.data.key, this.data.value)
      // clog('modelChangeH', v)
      this.change.emit(v)
    }, 400)
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
  // modelChangeH(v: S) {
  //   // this.componentService.setCurComponentProp(this.data.propKey, this.data.value)
  //   this.componentService.setComponentProp(this.data.key, this.data.value)
  //   // this.componentService.setCurComponent(this.pageService.getCurPage()!.ulid, this.componentService.curComponent()!.ulid)
  //   this.componentService.props$.next({
  //     componentUlid: this.componentService.curComponent()!.ulid,
  //     key: this.data.key,
  //     value: this.data.value,
  //   })
  //   this.componentService.reqUpdateComponentProps('props', this.data.key, this.data.value)
  //   // clog('modelChangeH', v)
  //   this.change.emit(v)
  // }
}
