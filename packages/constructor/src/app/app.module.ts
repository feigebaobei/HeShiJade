import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 模块
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// 指令
import { AdDirective } from './ad.directive';
import { ItemsDirective } from './items.directive';
import { ItemCategoryDirective } from './item-category.directive';
// pipe
// 组件
import { AppComponent } from './app.component';
// import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AdDirective,
    ItemsDirective,
    ItemCategoryDirective,
    AppComponent,
    // NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterOutlet,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
