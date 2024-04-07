import { Component, Input } from '@angular/core';
import { A } from 'src/types/base';

@Component({
  selector: 'app-modal-comp',
  templateUrl: './modal-comp.component.html',
  styleUrls: ['./modal-comp.component.sass']
})
export class ModalCompComponent {
  @Input() data: A
  constructor() {}
}
