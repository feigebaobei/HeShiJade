import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { popupsComponents } from 'src/helper/config'
import { asyncFn } from 'src/helper';
// 服务
import { AppService } from '../service/app.service';
import { EnvService } from '../service/env.service';
import { ComponentService } from '../service/component.service';
// type
import type { App } from 'src/types/app';
import type { Component as Comp } from 'src/types/component';
import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/types';
import type { B, N } from 'src/types/base';

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
      new Promise((s, _j) => {
        s(true)
      }).then(() => {
        this.show = false
        this.componentList = []
        // for(let i = 0; i < componentList.length; i++) {
        //   if (popupsComponents.includes(componentList[i].type)) {
        //     let j = i + 1
        //     let h = componentList[i].gridLayout.h
        //     while (j < componentList.length) {
        //       componentList[j].gridLayout.h -= h
        //       j++
        //     }
        //   }
        // }
        // componentList.filter(component => !popupsComponents.includes(component.type))
        
        // componentList.forEach(component => {
        //   if (popupsComponents.includes(component.type)) {
        //     this.popupsComponentList.push(component)
        //   } else {
        //     this.componentList.push({
        //       x: component.gridLayout.x,
        //       y: component.gridLayout.y,
        //       w: component.gridLayout.w,
        //       h: component.gridLayout.h,
        //       id: component.ulid,
        //       comp: component,
        //     })
        //   }
        // })
        
        this.componentList = componentList
        return true
      }).then(() => {
        asyncFn(() => {
          this.show = true
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
