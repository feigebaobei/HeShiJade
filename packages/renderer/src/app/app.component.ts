import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// 服务
import { AppService } from './service/app.service';

let clog = console.log

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'renderer';
  constructor(
    private route: ActivatedRoute,
    private appService: AppService
  ) {
    this.route.paramMap.subscribe((data: any) => {
      clog('paramMap data', data)
      clog('paramMap data', data.get('appKey'))
      clog('paramMap data', data.get('env'))
      clog('paramMap data', data.get('page'))
      if (data.get('appKey')) {
        this.appService.setCurAppKey(data.get('appKey'))
      }
      if (data.get('env')) {
        this.appService.set(data.get('env'))
      }
      if (data.get('page')) {
        this.appService.setAppKey(data.get('page'))
      }
    })
  }
  ngOnInit(): void {
    // this.route.queryParamMap.subscribe((data: any) => {
    //   clog('queryParamMap data', data)
    // })
  }
  
}
