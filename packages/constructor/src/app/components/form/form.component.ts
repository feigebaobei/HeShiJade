import { Component, Input } from '@angular/core';
import { FormLayout } from 'ng-devui/form';
import type { A, S } from 'src/types/base';
// import { FormsModule } from '@angular/forms';

let clog = console.log

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  @Input() data: A
  // layout: FormLayout
  selectOptions
  formData: A
  constructor() {
    this.selectOptions = [
      { label: 'one', value: 'one' },
      { label: 'two', value: 'two' },
    ]
    this.formData = {
      selectValue: '',
      toggleValue: '',
    }
  }
  layoutDirection: FormLayout = FormLayout.Vertical;
  ngOnInit() {
    // clog('form data', this)
  }
}
