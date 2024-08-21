import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocComponent } from './doc/doc.component';
import { BoundaryComponent } from './boundary/boundary.component';
import { ExtendComponent } from './extend/extend.component';
import { DesignComponent } from './design/design.component';
import { DataComponent } from './data/data.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { CircumComponent } from './circum/circum.component';
import { SkillComponent } from './skill/skill.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'doc', component: DocComponent },
  { path: 'boundary', component: BoundaryComponent },
  { path: 'extend', component: ExtendComponent },
  { path: 'design', component: DesignComponent },
  { path: 'data', component: DataComponent },
  { path: 'changelog', component: ChangelogComponent },
  { path: 'circum', component: CircumComponent },
  { path: 'skill', component: SkillComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
