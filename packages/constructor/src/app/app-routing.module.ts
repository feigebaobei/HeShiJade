import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { SetupComponent } from './setup/setup.component';
import { NotFoundComponent } from './not-found/not-found.component';

// 按照定义路由时的顺序依次匹配的，一旦匹配就会立即终止。
const routes: Routes = [
  // { path: 'login', component: LoginComponent,
  //   // children: [{
  //   //   path: 'detail', component: ProductDetailComponent
  //   // }, {
  //   //   path: '', redirectTo: 'detail', pathMatch: 'full'
  //   // }]
  // },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'list', component: ListComponent},
  { path: 'setup', component: SetupComponent},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
