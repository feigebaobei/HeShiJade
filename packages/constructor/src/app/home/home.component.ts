import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  // loginClickH() {
  //   this.router.navigate(['/login' ]);
  // }
  listClickH() {
    this.router.navigate(['/list' ]);
    // this.route
  }

}
