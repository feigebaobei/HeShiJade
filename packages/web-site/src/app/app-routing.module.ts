import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';
import { DataComponent } from './data/data.component';
import { DesignComponent } from './design/design.component';
import { ChangelogComponent } from './changelog/changelog.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'doc', component: DocComponent },
  { path: 'data', component: DataComponent },
  { path: 'design', component: DesignComponent },
  { path: 'changelog', component: ChangelogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
