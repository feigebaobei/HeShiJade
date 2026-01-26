import { Component } from '@angular/core';
import { ToggleModule } from 'ng-devui';
import { CompBase } from 'src/helper/pool';
import { A, B, F } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [
    ToggleModule,
  ],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.sass'
})
export class ToggleComponent extends CompBase {
  beforeChangeH: (p: A) => B
  constructor() {
    super()
    this.beforeChangeH = () => {
      let arr = this.pool.trigger(this.data.ulid, 'beforeChange', this.getLoopEventParams(this.loopIndex, undefined), this)
      return arr[0]
      // 这是改变前的方法。若返回true，则可以改变；否则不能改变。
      // 当前搭建侧的运行逻辑不支持用户只创建一个beforeChange事件，所以只能在约定上让用户使用与运行逻辑相一致。
      // 这个事件能创建一个方法体。
      // 内部运行逻辑是取出此事件的第一个方法体的返回值。
      // 要求用户最多只能创建一个这种事件的方法体。即使创建多个，也只取第一个方法体的返回值。这些方法体都会执行，以第一个方法体的返回值判断是否可以切换。
    }
  }
  changeH(p: B) {
    this.pool.trigger(this.data.ulid, 'change', this.getLoopEventParams(this.loopIndex, p), this)
  }
}
