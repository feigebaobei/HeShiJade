import { Component } from '@angular/core';
import { Router } from '@angular/router';
let clog = console.log

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'web-site';
  constructor(
    private router: Router
  ) {}
  homeClickH() {
    this.router.navigate(['/home'])
  }
  constructorClickH() {
    window.location.href='http://heshijade.com:4200';
  }
  docClickH() {
    this.router.navigate(['/doc'])
  }
  boundaryClickH() {
    this.router.navigate(['/boundary'])
  }
  extendClickH() {
    this.router.navigate(['/extend'])
  }
  designClickH() {
    this.router.navigate(['/design'])
  }
  dataClickH() {
    this.router.navigate(['/data'])
  }
  changelogClickH() {
    this.router.navigate(['/changelog'])
  }
  circumClickH() {
    this.router.navigate(['/circum'])
  }
  skillClickH() {
    this.router.navigate(['/skill'])
  }
}
