import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
// import { popupsComponents } from 'src/helper/config'
import { asyncFn } from 'src/helper';
import { serviceUrl } from 'src/helper/config';
import { filter } from 'rxjs/operators'
import { pool } from 'src/helper/pool';
// import { trigger } from 'src/helper/utils'
// module
import { CommonModule } from '@angular/common';
// 服务
import { AppService } from '../service/app.service';
import { EnvService } from '../service/env.service';
import { ComponentService } from '../service/component.service';
import { ComponentsModule } from '../components/components.module';
import { DataService } from 'src/app/service/data.service';
import { PageService } from '../service/page.service';
// component
import { PageListComponent } from '../page/page-list/page-list.component';
// type
// import type { App } from 'src/types/app';
import type { Component as Comp } from 'src/types/component';
import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/types';
import type { B, N, O, Oa, S, ULID } from 'src/types/base';


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
  account: N
  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private pageService: PageService,
    private envService: EnvService,
    private componentService: ComponentService,
    private dataService: DataService,
    private router: Router
  ) {
    this.show = true
    this.componentList = []
    this.popupsComponentList = []
    this.gridOptions = {
      margin: 2,
      float: true,
      staticGrid: true,
      column: 24,
    }
    this.account = 0
    effect(() => {
      let componentList = this.componentService.componentListS.get()
      this.show = false
      this.componentList = []
      this.componentList = componentList
      asyncFn(() => {
        this.show = true
      })
    })
    effect(() => {
      let pageList = this.pageService.listS.get()
      // this.pageList = pageList
      let {pageKey} = this.route.snapshot.params
      let page = pageList.find(item => item.key === pageKey)
      if (page) {
        asyncFn(() => { // effect内可以使用宏任务去设置signal
          // clog('setCur qwert')
          this.setCur(page.ulid)
        })
      }
    })
    effect(() => {
      this.pageService.curS.get()
      // clog('effect')
      pool.runHooks('pageChange')
    })
  }
  setCur(ulid: ULID) {
    this.pageService.setCur(ulid)
  }
  ngOnInit(): void {
    let {appKey, env} = this.route.snapshot.params
    this.appService.reqAppDetail(appKey, env)
    this.envService.setCur(env)
    this.opPlugins('key')
  }
  ngAfterViewInit(): void {
    // 触发postRenderer事件
    // asyncFn(() => {

      let ulid = this.pageService.getCur() // ?.ulid
      // clog('ulid', ulid)
      if (ulid) {
        // trigger(ulid, 'postPageRender', undefined, this)
      }
  }
  // ngAfterViewChecked() {
  //   let ulid = this.pageService.getCur()?.ulid
  //   clog('ngAfterViewChecked ulid', ulid)
  // }
  ngDoCheck(){
    // clog('ngDoCheck')
  }

  opPlugins(key: S) {
    this.dataService.req(
      `${serviceUrl()}/plugins`,
      'get',
      {key: 'key'}
    ).then((res) => {
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
        pool.runHooks('loadPost', pluginObj['profile'].key)
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
