import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { popupsComponents } from 'src/helper/config'
import { asyncFn } from 'src/helper';
import { serviceUrl } from 'src/helper/config';
import { pool } from 'src/helper/pool';
// module
import { CommonModule } from '@angular/common';
// 服务
import { AppService } from '../service/app.service';
import { EnvService } from '../service/env.service';
import { ComponentService } from '../service/component.service';
import { ComponentsModule } from '../components/components.module';
import { DataService } from 'src/app/service/data.service';
// component
import { PageListComponent } from '../page/page-list/page-list.component';
// type
// import type { App } from 'src/types/app';
import type { Component as Comp } from 'src/types/component';
import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/types';
import type { B, N, O, Oa, S } from 'src/types/base';


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
    private dataService: DataService,
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
    }
  }
  ngOnInit(): void {
    let {appKey, env} = this.route.snapshot.params
    this.appService.reqAppDetail(appKey, env)
    this.envService.setCur(env)
    this.opPlugins('key')
  }
  opPlugins(key: S) {
    // 无法找到此模块
    // import(`${serviceUrl()}/plugins/${key}`).then((res) => {
    // // import(`${serviceUrl()}/plugins`).then((res) => {
    //   clog('res', res)
    // })

    // 方法无法传递
    this.dataService.req(
      // `${serviceUrl()}/plugins/${key}`,
      `${serviceUrl()}/plugins`,
      'get',
      {key: 'key'}
    ).then((res) => {
      // clog('res', res)
      if (res.code === 0) {
        let pluginObj: Oa = {}
        Array.from(Object.entries(res.data)).forEach(([k, v]) => {
          switch(k) {
            case 'profile':
              pluginObj['profile'] = v
              break;
            case 'hooks':
              let t: Oa = {}
              Array.from(Object.entries(v as O)).forEach(([k, v]) => {
                t[k] = eval(v)
              })
              pluginObj['hooks'] = t
              break;
            case '_id':
              break;
            default:
              pluginObj[k] = eval(v as S)
              break;
          }
        })
        // clog('pluginObj', pluginObj)
        pool.registerPlugin(key, pluginObj)
      } else {
        clog(`插件 ${key} 请求失败。`)
      }
    })


  }
  identify(index: N, w: GridStackWidget) {
    return w.id
  }
}
