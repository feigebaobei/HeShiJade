import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentListComponent } from './component-list/component-list.component';
import { DevUIModule } from 'ng-devui'

@NgModule({
  declarations: [
    ComponentListComponent,
  ],
  imports: [
    CommonModule,
    DevUIModule,
  ],
  providers: [],
  exports: [
    ComponentListComponent,
  ]
})
export class ComponentListModule { }
