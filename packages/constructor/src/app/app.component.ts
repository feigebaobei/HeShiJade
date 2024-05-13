import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import type { F } from 'src/types/base';
// import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
  // styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'constructor';
  // refresh: F
  constructor(
    // private router: Router,
    // private userService: UserService,
  ) {
    // this.router = router
    // this.refresh = () => {}
  }
  ngOnInit(): void {
    // this.userService.clearRefresh()
    // this.userService.regularRefresh()
  }
  ngOnDestroy() {
    // this.userService.clearRefresh()
  }
}
