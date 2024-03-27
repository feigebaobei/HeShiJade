import { Component, Input } from '@angular/core';
import type { A } from 'src/types/base';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {
  @Input() data: A
  basicDataSource: A[]
  constructor() {
    this.basicDataSource = [
      {
        id: 1,
        name: 'name',
        a: 'a',
        d: 'd',
      },
      {
        id: 2,
        name: 'name2',
        a: 'a2',
        d: 'd2',
      },
      {
        id: 1,
        name: 'name3',
        a: 'a3',
        d: 'd3',
      },
      {
        id: 1,
        name: 'name4',
        a: 'a4',
        d: 'd4',
      },
    ]
  }
}
