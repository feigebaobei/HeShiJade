// todo 2024.06.15+ 删除
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotItemComponent } from './slot-item/slot-item.component';
import { SlotBoxComponent } from './slot-box/slot-box.component';



@NgModule({
  declarations: [
    SlotItemComponent,
    SlotBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlotBoxComponent
  ]
})
export class SlotModule { }
