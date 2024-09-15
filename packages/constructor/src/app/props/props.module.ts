// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormModule,
  IconModule,
  SelectModule,
  LayoutModule,
  ButtonModule,
  ToastModule,
  ToggleModule,
  InputNumberModule,
 } from 'ng-devui'
import { FormsModule } from '@angular/forms';
// component
import { PropsBoxComponent } from './props-box/props-box.component';
import { PropsItemComponent } from './props-item/props-item.component';
import { PropsSelectComponent } from './props-select/props-select.component';
import { PropsSwitchComponent } from './props-switch/props-switch.component';
import { PropsInputComponent } from './props-input/props-input.component';
import { PropsOptionComponent } from './props-option/props-option.component';
import { PropsNumberComponent } from './props-number/props-number.component';
// directive
import { PropsDirective } from './props.directive';


@NgModule({
  declarations: [
    PropsDirective,
    PropsBoxComponent,
    PropsItemComponent,
    PropsSelectComponent,
    PropsSwitchComponent,
    PropsInputComponent,
    PropsOptionComponent,
    PropsNumberComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    // DevUIModule,
    FormModule,
    IconModule,
    SelectModule,
    LayoutModule,
    ButtonModule,
    ToastModule,
    ToggleModule,
    InputNumberModule,
  ],
  providers: [],
  exports: [
    PropsBoxComponent,
  ]
})
export class PropsModule { }
