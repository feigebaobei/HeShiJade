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
    // let layout: FormLayout
    // switch (this.data.props.layout) {
    //   case 'horizontal':
    //   default:
    //     layout = FormLayout.Horizontal;
    //     break;
    //   case 'vertical':
    //     layout = FormLayout.Vertical;
    //     break;
      
    // }
    // this.layout = layout
    // this.layout = 'horizontal'
    
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
