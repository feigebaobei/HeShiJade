import { Component } from '@angular/core';
import { FormLayout } from 'ng-devui/form';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  layoutDirection: FormLayout = FormLayout.Vertical;
}
