import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImagePreviewModule } from 'ng-devui';
import { CompBase } from 'src/helper/pool';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [
    ImagePreviewModule,
    CommonModule,
  ],
  templateUrl: './image-preview.component.html',
  styleUrl: './image-preview.component.sass'
})
export class ImagePreviewComponent extends CompBase {
  constructor() {
    super()
  }
}
