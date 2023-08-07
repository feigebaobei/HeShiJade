import { Component, Input } from '@angular/core';
import type { A } from 'src/types/base';

@Component({
  selector: 'app-page-dialog',
  templateUrl: './page-dialog.component.html',
  styleUrls: ['./page-dialog.component.sass']
})
export class PageDialogComponent {
  @Input() data: A
  constructor() {
  }

}
