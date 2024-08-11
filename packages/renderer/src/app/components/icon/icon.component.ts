import { Component, Input } from '@angular/core';
import { A } from 'src/types/base';

@Component({
  selector: 'app-icon',
  // standalone: true,
  // imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.sass'
})
export class IconComponent {
  @Input() data: A
  constructor() {}
}
