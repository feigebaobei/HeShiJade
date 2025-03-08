// 模块
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule,
  TabsModule,
  LayoutModule,
  DataTableModule,
  SelectModule,
  PaginationModule,
  FormModule,
  IconModule,
  TextInputModule,
  ToggleModule,
  CheckBoxModule,
  ModalModule,
  // DataTableComponent,
} from 'ng-devui';
import { MenuModule } from 'ng-devui/menu';
import { FormsModule } from '@angular/forms';
import { GridstackModule } from 'gridstack/dist/angular'
// 指令
import { StackDirective } from './stack.directive';
// 组件
import { StackComponent } from './stack/stack.component';
import { CompBoxComponent } from './comp-box/comp-box.component';
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
import { PaginationComponent } from './pagination/pagination.component';
import { FlexComponent } from './flex/flex.component';
import { GridComponent } from './grid/grid.component';
import { LayoutComponent } from './layout/layout.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageSubListComponent } from './page-list/page-sub-list/page-sub-list.component';
import { PageListItemComponent } from './page-list/page-list-item/page-list-item.component';
import { ShowHideComponent } from './show-hide/show-hide.component';
import { LoopComponent } from './loop/loop.component';
// import { CompPacketComponent } from './comp-packet/comp-packet.component';

@NgModule({
  declarations: [
    StackDirective,
    StackComponent,
    CompBoxComponent,
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
    PaginationComponent,
    // DataTableComponent,
    FlexComponent,
    GridComponent,
    // CompPacketComponent,
    LayoutComponent,
    PageListComponent,
    PageSubListComponent,
    PageListItemComponent,
    ShowHideComponent,
    LoopComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TabsModule,
    LayoutModule,
    DataTableModule,
    SelectModule,
    PaginationModule,
    FormModule,
    IconModule,
    TextInputModule,
    ToggleModule,
    CheckBoxModule,
    ModalModule,
    MenuModule,

    FormsModule,
    GridstackModule,
  ],
  providers: [],
  exports: [
    StackComponent,
  ]
})
export class ComponentsModule { }
