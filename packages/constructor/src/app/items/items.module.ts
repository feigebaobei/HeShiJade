import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsBoxComponent } from './items-box/items-box.component';
import { ItemsGroupComponent } from './items-group/items-group.component';
import { DevUIModule } from 'ng-devui'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ItemsBoxComponent,
    ItemsGroupComponent
  ],
  imports: [
    CommonModule,
    DevUIModule,
    FormsModule,
  ],
  providers: [],
  exports: [
    ItemsBoxComponent
  ],
})
export class ItemsModule { }
