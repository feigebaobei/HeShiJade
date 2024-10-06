import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import 
import {
  FormModule,
  ModalModule,
  ButtonModule,
  SelectModule,
  TextInputModule,
  InputNumberModule,
  ToastModule,
 } from 'ng-devui';
import { Routes, RouterModule } from '@angular/router';
// component
import { ListComponent } from './list/list.component';
import { PublishDialogComponent } from './publish-dialog/publish-dialog.component';
import { DialogComponent } from './dialog/dialog.component';
import { AppConfigDialogComponent } from './app-config-dialog/app-config-dialog.component'

const routes: Routes = [
  { path: '', component: ListComponent }
]

@NgModule({
  declarations: [
    ListComponent,
    PublishDialogComponent,
    DialogComponent,
    AppConfigDialogComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormModule,
    FormsModule,
    ButtonModule,
    SelectModule,
    TextInputModule,
    InputNumberModule,
    ToastModule,
    ModalModule,
  ],
  providers: [],
  exports: [
    ListComponent,
  ]
})
export class AppListModule { }
