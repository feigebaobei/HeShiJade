import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// 按照定义路由时的顺序依次匹配的，一旦匹配就会立即终止。
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)},
  { path: 'list', loadChildren: () => import('./app-list/app-list.module').then(m => m.AppListModule)},
  { path: 'setup', loadComponent: () => import('./setup/setup.component').then(m => m.SetupComponent)},
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
