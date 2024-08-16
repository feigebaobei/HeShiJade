import { Component, Input, OnInit } from '@angular/core';
// type
import type { Component as Comp } from 'src/types/component';
import type { ULID } from 'src/types';
import type { N, S, } from 'src/types/base';

let clog = console.log

interface PaginationData {
  props: Comp['props']
  behavior: Comp['behavior']
  // items: Comp['items']
  // slots: Comp['slots']
  ulid: ULID

}


@Component({
  selector: 'app-pagination',
  // standalone: true,
  // imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.sass'
})
export class PaginationComponent implements OnInit {
  @Input() data!: PaginationData
  pageSizeOptions: N[]
  constructor() {
    this.pageSizeOptions = []
  }
  ngOnInit(): void {
    this.pageSizeOptions = this.data.props['pageSizeOptions'].split(',').map((item: S) => Number(item))
  }
  pageIndexChangeH(n: N) {
    clog('pageIndexChangeH', n)
  }
  pageSizeChangeH(n: N) {
    clog('pageSizeChangeH', n)
  }
}
