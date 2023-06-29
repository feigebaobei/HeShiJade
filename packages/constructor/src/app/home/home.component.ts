import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
import { FormLayout } from 'ng-devui/form';

let clog = console.log

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  isCollapsed: boolean
  layoutDirection: FormLayout = FormLayout.Vertical;

  constructor(private router: Router) {
    this.isCollapsed = false
  }
  formData = {
    account: '',
    password: '',
    // account: '',
  }

  // loginClickH() {
  //   this.router.navigate(['/login' ]);
  // }
  listClickH() {
    this.router.navigate(['/list' ]);
    // this.route
  }
  // submitForm({valid, direction}) {
  //   clog(valid, direction)
  // }
  submitForm(a: any) {
    clog(a)
  }

}
