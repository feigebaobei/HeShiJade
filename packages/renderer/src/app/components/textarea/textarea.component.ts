import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'ng-devui';
import { CompBase } from 'src/helper/pool';
import { S } from 'src/types/base';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [
    FormsModule,
    TextareaModule,
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.sass'
})
export class TextareaComponent extends CompBase {
  valueChangeH(p: S) {
    this.pool.trigger(this.data.ulid, 'change', this.getLoopEventParams(this.loopIndex, p), this)
  }
}
