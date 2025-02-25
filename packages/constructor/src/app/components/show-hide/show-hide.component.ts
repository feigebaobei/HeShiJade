import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { A, B, N, S, ULID } from 'src/types/base';
import { DropEvent } from 'ng-devui';
import { asyncFn } from 'src/helper';

interface ShowHideData {
  props: Comp['props']
  slots: Comp['slots']
  ulid: ULID
}

@Component({
  selector: 'app-show-hide',
  // standalone: true,
  // imports: [],
  templateUrl: './show-hide.component.html',
  styleUrl: './show-hide.component.sass'
})
export class ShowHideComponent {
  @Input() data!: ShowHideData
  show: B
  constructor(
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    this.show = true
    // 只了放置一个子组件
  }
  ngOnInit() {}
  dropH(e: DropEvent) {
    asyncFn(() => {
      this.show = false
      return true
    }).then(() => {
      // do
      return true
    }).then(() => {
      this.show = true
    })
  }
  deleteComponentsByUlidH(ulid: ULID) {
    asyncFn(() => {
      this.show = false
      return true
    }).then(() => {
      // 
      return true
    }).then(() => {
      this.show = true
    })
  }
}
