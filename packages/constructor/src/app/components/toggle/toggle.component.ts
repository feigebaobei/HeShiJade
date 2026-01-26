import { Component } from '@angular/core';
import { ToggleModule } from 'ng-devui';
import { InputData } from 'src/helper/InputData';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [
    ToggleModule,
  ],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.sass'
})
export class ToggleComponent extends InputData {

}
