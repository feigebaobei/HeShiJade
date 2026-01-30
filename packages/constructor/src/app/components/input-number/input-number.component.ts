import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'ng-devui';
import type { A } from 'src/types/base';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [
    InputNumberModule,
    FormsModule,
  ],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.sass'
})
export class InputNumberComponent {
  @Input() data: A
  constructor () {}
}
