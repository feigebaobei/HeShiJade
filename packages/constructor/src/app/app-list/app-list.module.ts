import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import 
// import { RadioModule } from 'ng-devui/radio';
// import { RateModule } from 'ng-devui/rate';
// import { ReadTipModule } from 'ng-devui/read-tip';
// import { SearchModule } from 'ng-devui/search';
// import { ToastModule } from 'ng-devui/toast';
// import { SelectModule } from 'ng-devui/select';
import { FormModule } from 'ng-devui';
import { DevUIModule } from 'ng-devui';
import { ButtonModule } from 'ng-devui/button';
import { SelectModule } from 'ng-devui/select';
import { TextInputModule } from 'ng-devui/text-input';
import { InputNumberModule } from 'ng-devui/input-number';


// component
import { PublishDialogComponent } from './publish-dialog/publish-dialog.component';
import { DialogComponent } from './dialog/dialog.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ListComponent,
    PublishDialogComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    DevUIModule,
    ButtonModule,
    SelectModule,
    TextInputModule,
    InputNumberModule,
    FormModule,
  ],
  providers: [],
  exports: [
    ListComponent,
  ]
})
export class AppListModule { }
