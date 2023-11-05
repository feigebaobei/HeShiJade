import { Component, Input, } from '@angular/core';
import { A } from 'src/types/base';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent {
  @Input() data: A
  constructor() {}
}
