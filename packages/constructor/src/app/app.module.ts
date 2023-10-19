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
