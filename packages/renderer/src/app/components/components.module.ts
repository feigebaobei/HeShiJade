// 模块
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevUIModule } from 'ng-devui';
import { FormsModule } from '@angular/forms';
// 指令
import { StackDirective } from './stack.directive';
// 组件
// import { StackComponent } from './stack/stack.component';
import { StackComponent } from './stack/stack.component';
import { ButtonComponent } from './button/button.component';
import { FormComponent } from './form/form.component';
import { ModalComponent } from './modal/modal.component';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { TableComponent } from './table/table.component';
import { ModalCompComponent } from './modal/modal-comp/modal-comp.component';
import { IconComponent } from './icon/icon.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TabsComponent } from './tabs/tabs.component';


@NgModule({
  declarations: [
    StackDirective,
    StackComponent,
    ButtonComponent,
    FormComponent,
    ModalComponent,
    InputComponent,
    SelectComponent,
    TableComponent,
    ModalCompComponent,
    IconComponent,
    CheckboxComponent,
    TabsComponent,
  ],
  imports: [
    CommonModule,
    DevUIModule,
    FormsModule,
  ],
  providers: [],
  exports: [
    StackComponent,
  ]
})
export class ComponentsModule { }
