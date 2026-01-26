import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'ng-devui';
import { InputData } from 'src/helper/InputData';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    FormsModule,
    SliderModule,
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.sass'
})
export class SliderComponent extends InputData {

}
