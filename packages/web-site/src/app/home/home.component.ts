import { Component } from '@angular/core';
import { Router } from '@angular/router';
let clog = console.log

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  constructor(private router: Router) {

  }
  constructorClickH() {
    clog('constructorClickH')
  }
  startButtonClickH() {
    clog('docClickH')
    window.location.href='http://heshijade.com:4200';
  }
  docButtonClickH() {
    clog('designClickH')
    this.router.navigate(['/doc'])
  }
}
