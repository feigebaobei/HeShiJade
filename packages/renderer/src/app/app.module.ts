import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevUIModule } from 'ng-devui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ButtonComponent } from './components/button/button.component';
import { StackDirective } from './stack.directive';
import { StackComponent } from './comp/stack/stack.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ButtonComponent,
    StackDirective,
    StackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DevUIModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
