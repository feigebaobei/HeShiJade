import { Component } from '@angular/core';
import { CompBase } from 'src/helper/pool';

@Component({
  selector: 'app-image-preview',
  // standalone: true,
  // imports: [],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.sass'
})
export class ImagePreviewComponent extends CompBase {
  constructor() {
    super()
  }
}
