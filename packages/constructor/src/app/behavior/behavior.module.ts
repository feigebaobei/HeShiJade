import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorBoxComponent } from './behavior-box/behavior-box.component';
import { BehaviorGroupComponent } from './behavior-group/behavior-group.component';
import { FormsModule } from '@angular/forms';
// devui
import { 
  // DevUIModule, 
  // LayoutModule
  FormModule,
  SelectModule,
  TextareaModule,
  ButtonModule,
} from 'ng-devui';


@NgModule({
  declarations: [
    BehaviorBoxComponent,
    BehaviorGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // DevUIModule,
    FormModule,
    SelectModule,
    TextareaModule,
    ButtonModule,
  ],
  exports: [
    BehaviorBoxComponent
  ]
})
export class BehaviorModule { }
