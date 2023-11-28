import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
  // styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'constructor';
  constructor(private router: Router) {
    this.router = router
  }
}
