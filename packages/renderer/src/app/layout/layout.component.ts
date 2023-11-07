import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// 服务
import { AppService } from '../service/app.service';
import { EnvService } from '../service/env.service';
import { PageService } from '../service/page.service';
// type
import { App } from 'src/types/app';

let clog = console.log

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private envService: EnvService,
    private pageService: PageService,
    ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((data: any) => {
      // clog('paramMap data', data)
      clog('paramMap data', data.get('appKey'))
      clog('paramMap data', data.get('env'))
      clog('paramMap data', data.get('pageKey'))
      if (data.get('appKey')) {
        this.appService.setCurAppKey(data.get('appKey'))
        this.appService.reqAppDetail(data.get('appKey'))
        this.appService.curApp$.subscribe((app: App) => {
          this.pageService.reqList(app.ulid).then(() => {
            let page = this.pageService.list.find(item => item.key === data.get('pageKey'))
            if (page) {
              this.pageService.setCur(page.ulid)
            }
          })
        })
      }
      if (data.get('env')) {
        this.envService.setCur(data.get('env'))
      }
    })
    
  }
}
