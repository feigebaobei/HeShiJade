import { Component, Input } from '@angular/core';
import { A } from 'src/types/base';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  @Input() data: A
  constructor() {}
  
}
