import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RateModule } from 'ng-devui';
import { InputData } from 'src/helper/InputData';

@Component({
  selector: 'app-rate',
  standalone: true,
  imports: [
    FormsModule,
    RateModule,
  ],
  templateUrl: './rate.component.html',
  styleUrl: './rate.component.sass'
})
export class RateComponent extends InputData {

}
