import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 模块
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { SetupComponent } from './setup/setup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AppItemComponent } from './app-item/app-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BehaviorModule } from './behavior/behavior.module';
// import { SlotModule } from './slot/slot.module';
import { ItemsModule } from './items/items.module';
import { ComponentsModule } from './components/components.module';

// 指令
import { AdDirective } from './ad.directive';
import { ItemsDirective } from './items.directive';
import { ItemCategoryDirective } from './item-category.directive';
import { PropsDirective } from './props.directive';

// devui
import { DevUIModule, 
  // InputGroupModule,
  // LayoutModule
  // LayoutModule,
} from 'ng-devui';
import { InputGroupModule } from 'ng-devui/input-group';

// pipe
import { UpperCasePipe } from '@angular/common';
import { JsonPipe } from '@angular/common';

// 组件
import { DialogComponent } from './list/dialog/dialog.component';
import { PageDialogComponent } from './setup/page-list/dialog/page-dialog.component';
import { PageListComponent } from './setup/page-list/page-list.component';
import { ComponentListComponent } from './setup/component-list/component-list.component';
import { PropsBoxComponent } from './setup/props-box/props-box.component';
import { PropsInputComponent } from './setup/props-input/props-input.component';
import { PropsSelectComponent } from './setup/props-select/props-select.component';
import { PropsSwitchComponent } from './setup/props-switch/props-switch.component';
import { PropsItemComponent } from './setup/props-item/props-item.component';
import { PropsOptionComponent } from './setup/props-option/props-option.component';
import { AppConfigDialogComponent } from './list/app-config-dialog/app-config-dialog.component';
import { PublishDialogComponent } from './list/publish-dialog/publish-dialog.component';

@NgModule({
  declarations: [
    AdDirective,
    ItemsDirective,
    ItemCategoryDirective,
    AppComponent,
    ListComponent,
    SetupComponent,
    NotFoundComponent,
    HomeComponent,
    AppItemComponent,
    DialogComponent,
    PageDialogComponent,
    PageListComponent,
    ComponentListComponent,

    PropsBoxComponent,
    PropsInputComponent,
    PropsSelectComponent,
    PropsSwitchComponent,
    PropsDirective,
    PropsItemComponent,
    PropsOptionComponent,
    AppConfigDialogComponent,
    PublishDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterOutlet,
    UpperCasePipe,
    JsonPipe,
    DevUIModule,
    // LayoutModule,
    InputGroupModule,
    FormsModule,
    HttpClientModule,
    BehaviorModule,
    // SlotModule,
    ItemsModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
