import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { ListComponent } from './list/list.component';
// import { SetupComponent } from './setup/setup.component';
import { NotFoundComponent } from './not-found/not-found.component';

// 按照定义路由时的顺序依次匹配的，一旦匹配就会立即终止。
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: 'home', component: HomeComponent},
  // { path: 'home', component: () => import('./home/home.component')},
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},

  // { path: 'list', component: ListComponent},
  // { path: 'list', component: () => import('./list/list.component')},
  { path: 'list', loadComponent: () => import('./list/list.component').then(m => m.ListComponent)},

  // { path: 'setup', component: SetupComponent},
  // { path: 'setup', loadChildren: () => import('./setup/setup.component').then(m => m.SetupComponent)},
  { path: 'setup', loadComponent: () => import('./setup/setup.component').then(m => m.SetupComponent)},

  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
