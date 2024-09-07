import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import 
// import { RadioModule } from 'ng-devui/radio';
// import { RateModule } from 'ng-devui/rate';
// import { ReadTipModule } from 'ng-devui/read-tip';
// import { SearchModule } from 'ng-devui/search';
// import { SelectModule } from 'ng-devui/select';
import { FormModule } from 'ng-devui';
import { DevUIModule } from 'ng-devui';
import { ButtonModule } from 'ng-devui/button';
import { SelectModule } from 'ng-devui/select';
import { TextInputModule } from 'ng-devui/text-input';
import { InputNumberModule } from 'ng-devui/input-number';
import { ToastModule } from 'ng-devui/toast';


// component
import { ListComponent } from './list/list.component';
// import { PublishDialogComponent } from './publish-dialog/publish-dialog.component';
// import { DialogComponent } from './dialog/dialog.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListComponent }	
]

@NgModule({
  declarations: [
    // ToastModule,
    ListComponent,
    // PublishDialogComponent,
    // DialogComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormModule,
    DevUIModule,
    ButtonModule,
    SelectModule,
    TextInputModule,
    InputNumberModule,
    ToastModule,
  ],
  providers: [],
  exports: [
    ListComponent,
  ]
})
export class AppListModule { }
