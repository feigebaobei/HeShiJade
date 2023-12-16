import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// 服务
import { AppService } from '../service/app.service';
import { EnvService } from '../service/env.service';
// type
import { App } from 'src/types/app';
import { Component as Comp } from 'src/types/component';
import { ComponentService } from '../service/component.service';

let clog = console.log

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  componenntList: Comp[]
  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private envService: EnvService,
    private componentService: ComponentService,
  ) {
    this.componenntList = []
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
    this.componentService.componentList$.subscribe(p => {
      this.componenntList = p
    })
  }
  ngOnInit(): void {
  }
}
