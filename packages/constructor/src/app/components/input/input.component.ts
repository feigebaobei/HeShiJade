import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextInputModule } from 'ng-devui';
import type { A } from 'src/types/base';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    TextInputModule,
    FormsModule,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent {
  @Input() data: A
  constructor() {

  }
}
