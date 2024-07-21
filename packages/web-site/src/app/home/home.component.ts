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
    this.router.navigate(['http://heshijade.com:4200'])
  }
  docClickH() {
    clog('docClickH')
    this.router.navigate(['/doc'])
  }
  designClickH() {
    clog('designClickH')
  }
  dataClickH() {
    clog('dataClickH')
  }
  changelogClickH() {
    clog('changelogClickH')
  }
}
