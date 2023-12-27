import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { SetupComponent } from './setup/setup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AppItemComponent } from './app-item/app-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { PanelModule } from 'ng-devui';
// import { IconModule } from 'ng-devui/icon';

// 指令
import { AdDirective } from './ad.directive';

// angular material
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input'

// devui
import { DevUIModule, 
  // LayoutModule
} from 'ng-devui';

// pipe
import { UpperCasePipe } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { DialogComponent } from './list/dialog/dialog.component';
import { PageDialogComponent } from './setup/page-list/dialog/page-dialog.component';
import { PageListComponent } from './setup/page-list/page-list.component';
import { ComponentListComponent } from './setup/component-list/component-list.component';
import { CompBoxComponent } from './setup/comp-box/comp-box.component';
import { CompItemComponent } from './setup/comp-item/comp-item.component';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { PropsBoxComponent } from './setup/props-box/props-box.component';
import { BehaviorBoxComponent } from './setup/behavior-box/behavior-box.component';
import { PropsInputComponent } from './setup/props-input/props-input.component';
import { PropsSelectComponent } from './setup/props-select/props-select.component';
import { PropsSwitchComponent } from './setup/props-switch/props-switch.component';
import { PropsDirective } from './props.directive';
import { PropsItemComponent } from './setup/props-item/props-item.component';
import { PropsOptionComponent } from './setup/props-option/props-option.component';
import { AppConfigDialogComponent } from './list/app-config-dialog/app-config-dialog.component';
import { PublishDialogComponent } from './list/publish-dialog/publish-dialog.component';
import { ItemsBoxComponent } from './setup/items-box/items-box.component';
import { ItemsItemComponent } from './setup/items-item/items-item.component';
import { ItemsDirective } from './items.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    SetupComponent,
    NotFoundComponent,
    HomeComponent,
    AppItemComponent,
    DialogComponent,
    PageDialogComponent,
    PageListComponent,
    ComponentListComponent,
    CompBoxComponent,
    AdDirective,
    CompItemComponent,
    ButtonComponent,
    ModalComponent,
    FormComponent,
    TableComponent,
    InputComponent,
    SelectComponent,
    PropsBoxComponent,
    BehaviorBoxComponent,
    PropsInputComponent,
    PropsSelectComponent,
    PropsSwitchComponent,
    PropsDirective,
    PropsItemComponent,
    PropsOptionComponent,
    AppConfigDialogComponent,
    PublishDialogComponent,
    ItemsBoxComponent,
    ItemsItemComponent,
    ItemsDirective,
    // IconModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterOutlet,
    UpperCasePipe,
    JsonPipe,
    // MatButtonModule,
    // MatIconModule,
    // MatFormFieldModule,
    // MatInputModule,
    DevUIModule,
    FormsModule,
    HttpClientModule,
    // LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
