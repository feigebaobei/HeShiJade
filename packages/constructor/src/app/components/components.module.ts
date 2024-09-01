// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevUIModule } from 'ng-devui'
import { FormsModule } from '@angular/forms';
import { GridstackModule } from 'gridstack/dist/angular'
// import { CompBoxModule } from 'src/app/comp-box/comp-box.module';
// directive
import { CompDirective } from './comp.directive'
// import { AdDirective } from 'src/app/ad.directive';

// component
import { CompBoxComponent } from './comp-box/comp-box.component';
import { ButtonComponent } from './button/button.component';
import { FormComponent } from './form/form.component';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { SelectComponent } from './select/select.component';
import { TableComponent } from './table/table.component';
import { IconComponent } from './icon/icon.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TabsComponent } from './tabs/tabs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CompStackComponent } from './comp-stack/comp-stack.component';

@NgModule({
  declarations: [
    // AdDirective,
    CompDirective,
    CompBoxComponent,
    ButtonComponent,
    FormComponent,
    InputComponent,
    ModalComponent,
    SelectComponent,
    TableComponent,
    IconComponent,
    CheckboxComponent,
    TabsComponent,
    PaginationComponent,
    CompStackComponent,
  ],
  imports: [
    CommonModule,
    DevUIModule,
    FormsModule,
    GridstackModule,
    // CompBoxModule,
  ],
  providers: [],
  exports: [
    CompBoxComponent,
    CompStackComponent,
  ],
})
export class ComponentsModule { }
