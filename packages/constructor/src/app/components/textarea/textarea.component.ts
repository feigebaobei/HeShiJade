import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'ng-devui';
import { InputData } from 'src/helper/InputData';

let clog = console.log

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
export class TextareaComponent extends InputData {
  ngOnInit() {
    clog('dfsfsf', this.data.props)
  }

}
