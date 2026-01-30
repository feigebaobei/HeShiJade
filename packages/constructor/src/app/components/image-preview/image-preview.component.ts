import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ImagePreviewModule } from 'ng-devui';
import { TextBase } from 'src/helper/text';
// type
import type { Component as Comp } from 'src/types/component';
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
export class ImagePreviewComponent extends TextBase {
  // @Input() data!: {props: Comp['props'], items: Comp['items']}
}
