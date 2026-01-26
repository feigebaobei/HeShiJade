import { Component } from '@angular/core';
import { TagsModule } from 'ng-devui';
import { clog } from 'src/helper';
import { CompBase } from 'src/helper/pool';
import { A, B, N, S } from 'src/types/base';

interface Itag {
  id: S, label: S, tip: S, labelStyle: S, checked: B
}

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    TagsModule,
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.sass'
})
export class TagComponent extends CompBase {
  tags: {id: S, label: S, tip: S, labelStyle: S, checked: B}[]
  beforeDeleteH: () => B
  constructor() {
    super()
    this.tags = []
    this.beforeDeleteH = () => {
      let arr = this.pool.trigger(this.data.ulid, 'beforeDelete', this.getLoopEventParams(this.loopIndex, undefined), this)
      return arr[0] as B
    }
  }
  initTag() {
    this.tags = this.data.items.map(item => {
      return {
        id: item['id'],
        label: item['label'],
        tip: item['tip'],
        labelStyle: item['labelStyle'],
        checked: item['checked'],
      }
    })
  }
  tagDeleteH(p: { tag: Itag, index: N, event: Event }) {
    this.pool.trigger(this.data.ulid, 'tagDelete', this.getLoopEventParams(this.loopIndex, p), this)
  }
  checkedChangeH(p: { tag: Itag, index: N, event: Event }) {
    this.pool.trigger(this.data.ulid, 'checkedChange', this.getLoopEventParams(this.loopIndex, p), this)
  }
  override extraNgOnInit(): void {
    this.initTag()
  }
}
