import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 模块
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ListComponent } from './list/list.component';
// import { SetupComponent } from './setup/setup.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ItemsModule } from './items/items.module';
// import { BehaviorModule } from './behavior/behavior.module';
// import { PropsModule } from './props/props.module';
// import { ComponentsModule } from './components/components.module';
// import { PageListModule } from './page-list/page-list.module';
import { GridstackModule } from 'gridstack/dist/angular'
// 指令
import { AdDirective } from './ad.directive';
import { ItemsDirective } from './items.directive';
import { ItemCategoryDirective } from './item-category.directive';
// devui
import { DevUIModule } from 'ng-devui';

// pipe
import { UpperCasePipe } from '@angular/common';
import { JsonPipe } from '@angular/common';

// 组件
import { DialogComponent } from './list/dialog/dialog.component';
import { AppConfigDialogComponent } from './list/app-config-dialog/app-config-dialog.component';
import { PublishDialogComponent } from './list/publish-dialog/publish-dialog.component';
// import { PageDialogComponent } from './setup/page-list/dialog/page-dialog.component';
// import { PageListComponent } from './setup/page-list/page-list.component';
// import { ComponentListComponent } from './setup/component-list/component-list.component';

@NgModule({
  declarations: [
    AdDirective,
    ItemsDirective,
    ItemCategoryDirective,
    AppComponent,
    // ListComponent,
    // SetupComponent,
    NotFoundComponent,
    // HomeComponent,
    // PageDialogComponent,
    // PageListComponent,
    // ComponentListComponent,
    DialogComponent,
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
    FormsModule,
    HttpClientModule,
    // ItemsModule,
    // BehaviorModule,
    // ComponentsModule,
    // PropsModule,
    // PageListModule,
    GridstackModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
