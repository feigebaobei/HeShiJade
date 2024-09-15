import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { popupsComponents } from 'src/helper/config'
import { asyncFn } from 'src/helper';
// module
import { CommonModule } from '@angular/common';
// 服务
import { AppService } from '../service/app.service';
import { EnvService } from '../service/env.service';
import { ComponentService } from '../service/component.service';
import { ComponentsModule } from '../components/components.module';
// component
import { PageListComponent } from '../page/page-list/page-list.component';
// type
// import type { App } from 'src/types/app';
import type { Component as Comp } from 'src/types/component';
import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/types';
import type { B, N } from 'src/types/base';

let clog = console.log

interface SuperGridItem extends GridStackWidget {
  comp: Comp
}


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    PageListComponent,
    ComponentsModule,
    CommonModule,
  ],
  // declarations: [],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  // componentList: SuperGridItem[]
  show: B
  componentList: Comp[]
  popupsComponentList: Comp[]
  gridOptions: GridStackOptions
  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private envService: EnvService,
    private componentService: ComponentService,
  ) {
    this.show = true
    this.componentList = []
    this.popupsComponentList = []
    effect(() => {
      let componentList = this.componentService.componentListS.get()
      this.show = false
      this.componentList = []
      this.componentList = componentList
      asyncFn(() => {
        this.show = true
      })
    })
    this.gridOptions = {
      margin: 2,
      float: true,
      staticGrid: true,
      column: 24,
      // resizable: false,
      // removable: false,
    }
  }
  ngOnInit(): void {
    let {appKey, env} = this.route.snapshot.params
    // clog('9', o)
    this.appService.reqAppDetail(appKey, env)
    this.envService.setCur(env)
    // this.pageService.setCur(pageKey)
  }
  identify(index: N, w: GridStackWidget) {
    return w.id
  }
}
