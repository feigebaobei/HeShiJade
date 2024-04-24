import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompBoxComponent } from './comp-box/comp-box.component';
import { DevUIModule } from 'ng-devui'
// import { AdDirective } from 'src/app/ad.directive';
import { CompDirective } from './comp.directive'


@NgModule({
  declarations: [
    CompBoxComponent,
    // AdDirective,
    CompDirective,
  ],
  imports: [
    CommonModule,
    DevUIModule,
  ],
  exports: [
    CompBoxComponent,
  ]
})
export class CompBoxModule { }
