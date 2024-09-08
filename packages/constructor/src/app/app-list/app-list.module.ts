import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import 
import { FormModule, ModalModule,
  ButtonModule,
SelectModule,
TextInputModule,
InputNumberModule,
ToastModule,
 } from 'ng-devui';
//  import { DialogService } from 'ng-devui/modal';
// import { DevUIModule } from 'ng-devui';
// import { ButtonModule } from 'ng-devui/button';
// import { SelectModule } from 'ng-devui/select';
// import { TextInputModule } from 'ng-devui/text-input';
// import { InputNumberModule } from 'ng-devui/input-number';
// import { ToastModule } from 'ng-devui/toast';
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
    // DevUIModule,
    ButtonModule,
    SelectModule,
    TextInputModule,
    InputNumberModule,
    ToastModule,
    ModalModule,
    // DialogService,
  ],
  providers: [],
  exports: [
    ListComponent,
  ]
})
export class AppListModule { }
