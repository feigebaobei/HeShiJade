import { Component, ViewChild } from '@angular/core';
import { IconModule } from 'ng-devui';
import { AppService } from 'src/app/service/app.service';
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
import { TextBase } from 'src/helper/text';
import { asyncFn, initComponentMeta } from 'src/helper';
import { CompStackComponent } from '../comp-stack/comp-stack.component';
import { ComponentsModule } from '../components.module';
import { Page } from 'src/types/page';
// 数据
import { gridLayoutDefault } from 'src/helper/gridLayout';
// type
import type { A, ULID } from 'src/types/base';
import type { Component as Comp } from 'src/types/component';

let clog = console.log

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    IconModule,
    // CompStackComponent,
    // ComponentsModule,
    // CompStackComponent,
  ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.sass'
})
export class DrawerComponent extends TextBase {
  childrenBody: Comp[]
  @ViewChild('compStackBody') compStackBody!: CompStackComponent
  page: Page
  constructor(
    private appService: AppService,
    private pageService: PageService,
    private componentService: ComponentService,
  ) {
    super()
    this.childrenBody = []
    this.page = this.pageService.getCurPage()!
  }
  dropBodyH($event: A) {
    let appUlid = this.appService.getCurApp()?.ulid || ''
    let pageUlid = this.pageService.getCurPage()?.ulid || ''
    let componentCategory = $event.dragData.item.componentCategory
    let compGridLayout = gridLayoutDefault[componentCategory]
    let component = initComponentMeta(
      componentCategory, 
      appUlid, pageUlid, 
      this.childrenBody.length ? this.childrenBody[this.childrenBody.length - 1].ulid : '',
       '', this.data.ulid,
      {area: 'slots', slotKey: 'body'},
      {x: 0, y: 0, w: compGridLayout.w, h: compGridLayout.h, noResize: compGridLayout.noResize},
    )
    this.childrenBody.push(component)
    this.componentService.mountComponent(component)
    this.componentService.reqCreateComponent(component).then(() => {
      clog('成功在远端保存组件')
    }).catch((error) => {
      clog('error', error)
    })
    this.compStackBody.init()
  }
  bodyDeleteComponentByUlidH(ulid: ULID) {
    this.childrenBody = this.childrenBody.filter(item => item.ulid !== ulid)
    let childrenUlid = this.componentService.getChildrenComponent(this.page.ulid, ulid).map(componentItem => componentItem.ulid)
    this.componentService.deleteComponentByUlid(this.page.ulid, ulid)
    this.componentService.reqDeleteComponent(ulid, childrenUlid)
    asyncFn(() => {
      this.compStackBody.init()
    })
  }
}
