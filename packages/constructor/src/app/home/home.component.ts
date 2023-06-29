import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
import { FormLayout } from 'ng-devui/form';

let clog = console.log

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  isCollapsed: boolean
  layoutDirection: FormLayout = FormLayout.Vertical;

  constructor(private router: Router, private http: HttpClient) {
    this.isCollapsed = false
  }
  formData = {
    account: '',
    password: '',
    // account: '',
  }

  listClickH() {
    this.router.navigate(['/list' ]);
  }
  submitForm(a: any) {
    clog(a)
    this.http.get('http://localhost:5000/first')
    // this.http.get('/first')
    .subscribe((res) => {
      clog(res)
    })
  }
  
  ngOnInit(): void {
  //   this.http.get('/first')
  }

}
