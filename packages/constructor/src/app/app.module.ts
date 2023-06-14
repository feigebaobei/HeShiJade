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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    SetupComponent,
    NotFoundComponent,
    HomeComponent,
    AppItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
