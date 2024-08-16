import { Component, Input, OnInit } from '@angular/core';
import type { Component as Comp, ComponentMountItems } from 'src/types/component';
import type { ULID } from 'src/types';
import type { N, S } from 'src/types/base';

interface PaginationData {
  props: Comp['props']
  items: Comp['items']
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
}
