import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  appList: {
    name: string
    key: string
    theme: string
    id: number
  }[]
  constructor() {
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
}
