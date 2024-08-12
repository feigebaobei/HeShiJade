import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevUIModule } from 'ng-devui'
import { FormsModule } from '@angular/forms';
// import { CompBoxModule } from 'src/app/comp-box/comp-box.module';
import { CompDirective } from './comp.directive'

// import { AdDirective } from 'src/app/ad.directive';

import { CompBoxComponent } from './comp-box/comp-box.component';
import { ButtonComponent } from './button/button.component';
import { FormComponent } from './form/form.component';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { SelectComponent } from './select/select.component';
import { TableComponent } from './table/table.component';
import { IconComponent } from './icon/icon.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
  declarations: [
    // AdDirective,
    CompDirective,
    ButtonComponent,
    FormComponent,
    InputComponent,
    ModalComponent,
    SelectComponent,
    TableComponent,
    CompBoxComponent,
    IconComponent,
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    DevUIModule,
    FormsModule,
    // CompBoxModule,
  ],
  providers: [],
  exports: [
    CompBoxComponent,
  ],
})
export class ComponentsModule { }
