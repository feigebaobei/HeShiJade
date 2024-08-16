import { Component, Input } from '@angular/core';
import type { Component as Comp, ComponentMountItems } from 'src/types/component';
import type { ULID } from 'src/types';

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
export class PaginationComponent {
  @Input() data!: PaginationData
  constructor() {}
}
