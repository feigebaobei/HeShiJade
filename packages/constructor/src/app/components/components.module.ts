// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  DragDropModule,
  TabsModule,
  ButtonModule,
  LayoutModule, 
  DataTableModule,
  SelectModule,
  PaginationModule,
  IconModule,
  TextInputModule,
  ToggleModule,
  FormModule,
  CheckBoxModule,
  // MenuModule,
} from 'ng-devui'
import { MenuModule } from 'ng-devui/menu';
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
import { FlexComponent } from './flex/flex.component';
import { GridComponent } from './grid/grid.component';
import { CompPacketComponent } from './comp-packet/comp-packet.component';
import { LayoutComponent } from './layout/layout.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageSubListComponent } from './page-list/page-sub-list/page-sub-list.component';
import { PageListItemComponent } from './page-list/page-list-item/page-list-item.component';
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
    FlexComponent,
    GridComponent,
    CompPacketComponent,
    LayoutComponent,
    PageListComponent,
    PageSubListComponent,
    PageListItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    GridstackModule,
    // CompBoxModule,
    DragDropModule,
    TabsModule,
    ButtonModule,
    LayoutModule,
    DataTableModule,
    SelectModule,
    PaginationModule,
    IconModule,
    TextInputModule,
    ToggleModule,
    FormModule,
    CheckBoxModule,
    MenuModule,
  ],
  providers: [],
  exports: [
    // CompBoxComponent,
    CompStackComponent,
  ],
})
export class ComponentsModule { }
