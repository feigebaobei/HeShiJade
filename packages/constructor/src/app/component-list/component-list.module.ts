import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentListComponent } from './component-list/component-list.component';
import { 
  DragDropModule,
 } from 'ng-devui'

@NgModule({
  declarations: [
    ComponentListComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
  ],
  providers: [],
  exports: [
    ComponentListComponent,
  ]
})
export class ComponentListModule { }
