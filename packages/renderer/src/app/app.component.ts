import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

let clog = console.log

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'renderer';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((data: any) => {
      clog('paramMap data', data)
      clog('paramMap data', data.get('appKey'))
      clog('paramMap data', data.get('env'))
      clog('paramMap data', data.get('page'))
    })
    // this.route.queryParamMap.subscribe((data: any) => {
    //   clog('queryParamMap data', data)
    // })
  }
  
}
