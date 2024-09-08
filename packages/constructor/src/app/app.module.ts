import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 模块
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
// import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { GridstackModule } from 'gridstack/dist/angular'
// 指令
import { AdDirective } from './ad.directive';
import { ItemsDirective } from './items.directive';
import { ItemCategoryDirective } from './item-category.directive';
// pipe

@NgModule({
  declarations: [
    AdDirective,
    ItemsDirective,
    ItemCategoryDirective,
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterOutlet,
    // UpperCasePipe,
    // JsonPipe,
    // FormsModule,
    HttpClientModule,
    // GridstackModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
