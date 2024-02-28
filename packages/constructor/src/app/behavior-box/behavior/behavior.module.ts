import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorBoxComponent } from '../behavior-box.component';



@NgModule({
  declarations: [
    BehaviorBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BehaviorBoxComponent
  ]
})
export class BehaviorModule { }
