import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormModule,
  TextInputModule,
  SelectModule,
  IconModule,
  ButtonModule,
  LayoutModule,
  ToggleModule,
} from 'ng-devui'
import { FormsModule } from '@angular/forms';
// 组件
import { ItemsBoxComponent } from './items-box/items-box.component';
import { ItemsGroupComponent } from './items-group/items-group.component';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { SwitchComponent } from './switch/switch.component';
import { OptionsComponent } from './options/options.component';
import { ItemComponent } from './item/item.component';
// 指令
import { CompDirective } from './comp.directive'


@NgModule({
  declarations: [
    CompDirective,
    ItemsBoxComponent,
    ItemsGroupComponent,
    InputComponent,
    SelectComponent,
    SwitchComponent,
    OptionsComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    FormModule,
    TextInputModule,
    SelectModule,
    IconModule,
    ButtonModule,
    LayoutModule,
    ToggleModule,
  ],
  providers: [],
  exports: [
    ItemsBoxComponent
  ],
})
export class ItemsModule { }
