import { Component } from '@angular/core';
import { TextareaModule } from 'ng-devui';
import { InputData } from 'src/helper/InputData';

let clog = console.log

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [
    TextareaModule,
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.sass'
})
export class TextareaComponent extends InputData {
  ngOnInit() {
    clog('dfsfsf', this.data.props)
  }

}
