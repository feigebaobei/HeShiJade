// module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { DevUIModule } from 'ng-devui';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { GridstackModule } from 'gridstack/dist/angular'
// components
import { AppComponent } from './app.component';
// import { NotFoundComponent } from './not-found/not-found.component';
// import { LayoutComponent } from './layout/layout.component';
// import { PageListComponent } from './page/page-list/page-list.component';

@NgModule({
  declarations: [
    AppComponent,
    // NotFoundComponent,
    // LayoutComponent,
    // PageListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // DevUIModule,
    HttpClientModule,
    FormsModule,
    ComponentsModule,
    GridstackModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
