import { Component } from '@angular/core';
import { ProgressModule } from 'ng-devui';
import { InputData } from 'src/helper/InputData';
// type
import type { IGradientColor, IProgressItem } from 'ng-devui/progress/progress.types';
import { A, B, N } from 'src/types/base';
import shareEvent, { creatEventName } from 'src/helper/share-event';
import { asyncFn, clog } from 'src/helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    CommonModule,
    ProgressModule,
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.sass'
})
export class ProgressComponent extends InputData {
  strokeColor: IGradientColor[]
  multiProgressConfig: IProgressItem[]
  percentage: N
  show: B
  constructor() {
    super()
    this.strokeColor = []
    this.multiProgressConfig = []
    this.percentage = 0
    this.show = true
  }
  initStrokColor() {
    this.strokeColor = this.data.props['strokeColor'].map((item: A) => {
      return { color: item.label, percentage: item.value }
    })
  }
  initMultiProgressConfig() {
    if (this.data.props['isOverlap']) {
      this.multiProgressConfig = this.data.items.map((item: A) => {
        return {
          // color: string; // 进度条色值
          // percentage: number; // 进度条的进度
          // percentageText?: string; // 进度条文字信息
          // template?: TemplateRef<any>; // 进度条内自定义模板
          // [key: string]: any;
          color: item.color,
          percentage: item.percentage,
          percentageText: item.percentageText,
        }
      })
    } else {
      this.multiProgressConfig = []
    }
  }
  listen() {
    shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'props', 'update'), ({key, value}) => {
      this.show = false
      // 因底层组件不能正确渲染变动后的props。又懒得排查具体哪些属性组合不能正常更新视图。所以全都处理为用销毁后再创建。
      asyncFn(() => {
        switch(key) {
          case 'strokeColor':
            this.initStrokColor()
            break;
          case 'isOverlap':
            this.initMultiProgressConfig()
            break;
        }
      }).then(() => {
        this.show = true
      })
    })
    shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'items', 'update'), ({key, value, index}) => {
      this.show = false
      asyncFn(() => {
        this.initMultiProgressConfig()
      }).then(() => {
        this.show = true
      })
    })
    shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'items', 'remove'), ({key, value, index}) => {
      this.show = false
      asyncFn(() => {
        this.initMultiProgressConfig()
      }).then(() => {
        this.show = true
      })
    })
  }
  ngOnInit() {
    this.initStrokColor()
    this.initMultiProgressConfig()
    this.listen()
  }
}
