import { Component } from '@angular/core';
import { CompBase } from 'src/helper/pool';
import { ProgressModule } from 'ng-devui';
// type
import type { IGradientColor, IProgressItem } from 'ng-devui/progress/progress.types';
import type { A } from 'src/types/base';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    ProgressModule,
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.sass'
})
export class ProgressComponent extends CompBase {
  strokeColor: IGradientColor[]
  multiProgressConfig: IProgressItem[]
  constructor() {
    super()
    this.strokeColor = []
    this.multiProgressConfig = []
  }
  initStrokeColor() {
    this.strokeColor = this.data.props['strokeColor'].map((item: A) => {
      return {color: item.label, percentage: item.value }
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
  override extraNgOnInit(): void {
    this.initStrokeColor()
    this.initMultiProgressConfig()
  }
}
