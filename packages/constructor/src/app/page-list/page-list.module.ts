import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormModule,
  IconModule,
  ButtonModule,
  ToastModule,
  // DevUIModule,
  ModalModule,
 } from 'ng-devui'
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'ng-devui/input-group';
// 组件
import { PageListComponent } from './page-list/page-list.component';
import { PageDialogComponent } from './page-list/dialog/page-dialog.component';

@NgModule({
  declarations: [
    PageListComponent,
    PageDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputGroupModule,
    FormModule,
    IconModule,
    ButtonModule,
    ToastModule,
    // DevUIModule,
    ModalModule,
  ],
  providers: [],
  exports: [
    PageListComponent
  ],
})
export class PageListModule { }
