import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
// import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // { path: ':appKey/:env/:pageKey', component: AppComponent, pathMatch: 'full' },
  { path: ':appKey/:env/:pageKey', component: LayoutComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
