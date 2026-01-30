import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ButtonModule, RadioModule, SelectModule, ToggleModule } from 'ng-devui';
import { FormLayout, FormModule } from 'ng-devui/form';
import type { A, S } from 'src/types/base';
// import { FormsModule } from '@angular/forms';

let clog = console.log

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormModule,
    SelectModule,
    ToggleModule,
    RadioModule,
    ButtonModule,
    CommonModule,
    // NgModule,
    // NgModel,
    FormsModule,
    
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  @Input() data: A
  // layout: FormLayout
  // selectOptions
  // formData: A
  constructor() {
    // this.selectOptions = [
    //   { label: 'one', value: 'one' },
    //   { label: 'two', value: 'two' },
    // ]
    // this.formData = {
    //   selectValue: '',
    //   toggleValue: '',
    // }
  }
  layoutDirection: FormLayout = FormLayout.Vertical;
  ngOnInit() {
    // clog('form data', this)
  }
}
