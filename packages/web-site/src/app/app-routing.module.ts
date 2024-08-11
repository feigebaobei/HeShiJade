import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';
import { BoundaryComponent } from './boundary/boundary.component';
import { DesignComponent } from './design/design.component';
import { DataComponent } from './data/data.component';
import { ChangelogComponent } from './changelog/changelog.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'doc', component: DocComponent },
  { path: 'boundary', component: BoundaryComponent },
  { path: 'design', component: DesignComponent },
  { path: 'data', component: DataComponent },
  { path: 'changelog', component: ChangelogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
