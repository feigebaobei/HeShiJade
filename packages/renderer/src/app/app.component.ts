import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// // 服务
// import { AppService } from './service/app.service';
// import { EnvService } from './service/env.service';
// import { PageService } from './service/page.service';
// // type
// import { App } from 'src/types/app';

// let clog = console.log

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'renderer';
  constructor(
  ) {
  }
  ngOnInit(): void {
  }
}
