import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevUIModule } from 'ng-devui';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { StackDirective } from './stack.directive';
// import { StackComponent } from './comp/stack/stack.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { PageListComponent } from './page/page-list/page-list.component';



import { ComponentsModule } from './components/components.module';



// import { ButtonComponent } from './components/button/button.component';
// import { FormComponent } from './components/form/form.component';
// import { ModalComponent } from './components/modal/modal.component';
// import { InputComponent } from './components/input/input.component';
// import { SelectComponent } from './components/select/select.component';
// import { TableComponent } from './components/table/table.component';
// import { ModalCompComponent } from './components/modal/modal-comp/modal-comp.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    // StackDirective,
    // StackComponent,
    LayoutComponent,
    PageListComponent,
    
    
    // ButtonComponent,
    // FormComponent,
    // ModalComponent,
    // InputComponent,
    // SelectComponent,
    // TableComponent,
    // ModalCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DevUIModule,
    HttpClientModule,
    FormsModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
