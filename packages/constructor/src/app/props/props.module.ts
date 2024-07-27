import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevUIModule } from 'ng-devui'
import { FormsModule } from '@angular/forms';
import { PropsBoxComponent } from './props-box/props-box.component';
import { PropsItemComponent } from './props-item/props-item.component';
import { PropsSelectComponent } from './props-select/props-select.component';
import { PropsSwitchComponent } from './props-switch/props-switch.component';
import { PropsInputComponent } from './props-input/props-input.component';
import { PropsDirective } from './props.directive';


@NgModule({
  declarations: [
    PropsDirective,
    PropsBoxComponent,
    PropsItemComponent,
    PropsSelectComponent,
    PropsSwitchComponent,
    PropsInputComponent,
  ],
  imports: [
    CommonModule,
    DevUIModule,
    FormsModule,
  ],
  providers: [],
  exports: [
    PropsBoxComponent,
  ]
})
export class PropsModule { }
