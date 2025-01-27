import { Component, effect, Input, } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
// type
import type { Component as Comp, ChangeGridLayoutParams } from 'src/types/component';
import type { Page } from 'src/types/page';
import type { ULID } from 'src/types';

@Component({
  selector: 'app-comp-packet',
  // standalone: true,
  // imports: [],
  templateUrl: './comp-packet.component.html',
  styleUrl: './comp-packet.component.sass'
})
export class CompPacketComponent {
  @Input() data!: Comp
  curComponent: Comp | undefined
  curPage: Page | undefined
  constructor(
    private componentService: ComponentService,
    private pageService: PageService,
  ) {
    effect(() => {
      this.curComponent = this.componentService.curComponentS.get()
      // this.pageService
    })
  }

  init() {

  }
  packetClickH(e: MouseEvent) {
    e.stopPropagation()
    let curPage = this.pageService.getCurPage()
    if (curPage) {
      if (this.curComponent) {
        if (this.data.ulid !== this.curComponent.ulid) {
          this.componentService.setCurComponent(curPage.ulid, this.data.ulid)
        }
      } else {
        this.componentService.setCurComponent(curPage.ulid, this.data.ulid)
      }
    }
  }
  deleteClickH(ulid: ULID) {}
  ngOnInit() {
    this.init()
  }
  ngOnDestroy() {}
}
