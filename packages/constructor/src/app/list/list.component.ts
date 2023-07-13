import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import type { ResponseData } from 'src/types';
import type { A } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  appList: {
    name: string
    key: string
    theme: string
    id: number
  }[]
  user: A
  constructor(private router: Router, private http: HttpClient) {
    this.user = {}
    this.appList = [
      {
        name: 'name',
        key: 'key',
        theme: 'theme',
        id: 1,
      },
      {
        name: 'name',
        key: 'key',
        theme: 'theme',
        id: 2,
      },
    ]
  }
  ngOnInit(): void {
    this.init()
  }
  init(): void {
    this.http.get<ResponseData>('http://localhost:5000/users/login', {}).subscribe((res) => {
      this.user = res
    })
  }
  logoutBtClickH()  {
    this.http.post<ResponseData>('http://localhost:5000/users/logout', {}).subscribe((res) => {
      this.router.navigate(['/'])
    })
  }
  userInfoBtClickH() {
    this.http.get<ResponseData>('http://localhost:5000/users', {withCredentials: true}).subscribe((res) => {
      clog('getUserInfo', res)
    })
  }
  gotoHomeInfoBtClickH() {
    this.router.navigate(['/' ]);
  }
}
