import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorBoxComponent } from './behavior-box/behavior-box.component';
import { BehaviorItemComponent } from './behavior-item/behavior-item.component';
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
    BehaviorItemComponent
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
