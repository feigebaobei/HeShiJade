import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// 服务
import { AppService } from '../service/app.service';
import { EnvService } from '../service/env.service';
import { ComponentService } from '../service/component.service';
// type
import type { App } from 'src/types/app';
import type { Component as Comp } from 'src/types/component';
import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/types';
import type { N } from 'src/types/base';

let clog = console.log

interface SuperGridItem extends GridStackWidget {
  comp: Comp
}


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  // componentList: Comp[]
  componentList: SuperGridItem[]
  gridOptions: GridStackOptions
  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private envService: EnvService,
    private componentService: ComponentService,
  ) {
    this.componentList = []
    this.route.paramMap.subscribe((data: any) => {
      // clog('paramMap data', data)
      // clog('paramMap data', data.get('appKey'))
      // clog('paramMap data', data.get('env'))
      // clog('paramMap data', data.get('pageKey'))
      if (data.get('appKey') && data.get('env')) {
        this.appService.reqAppDetail(data.get('appKey'), data.get('env'))
      }
      if (data.get('env')) {
        this.envService.setCur(data.get('env'))
      }
    })
    this.componentService.componentList$.subscribe(componentList => {
      // this.componentList = p
      this.componentList = []
      componentList.forEach(component => {
        this.componentList.push({
          x: component.gridLayout.x,
          y: component.gridLayout.y,
          w: component.gridLayout.w,
          h: component.gridLayout.h,
          id: component.ulid,
          comp: component,
        })
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
  }
  identify(index: N, w: GridStackWidget) {
    return w.id
  }
}
