import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', 
    // component: HomeComponent,
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  { path: 'doc', 
    // component: DocComponent,
    loadComponent: () => import('./doc/doc.component').then(m => m.DocComponent)
  },
  { path: 'boundary', 
    // component: BoundaryComponent,
    loadComponent: () => import('./boundary/boundary.component').then(m => m.BoundaryComponent)
  },
  { path: 'extend', 
    // component: ExtendComponent,
    loadComponent: () => import('./extend/extend.component').then(m => m.ExtendComponent)
  },
  { path: 'design', 
    // component: DesignComponent,
    loadComponent: () => import('./design/design.component').then(m => m.DesignComponent)
  },
  { path: 'data', 
    // component: DataComponent,
    loadComponent: () => import('./data/data.component').then(m => m.DataComponent)
  },
  { path: 'changelog', 
    // component: ChangelogComponent,
    loadComponent: () => import('./changelog/changelog.component').then(m => m.ChangelogComponent)
  },
  { path: 'circum', 
    // component: CircumComponent,
    loadComponent: () => import('./circum/circum.component').then(m => m.CircumComponent)
  },
  { path: 'skill', 
    // component: SkillComponent,
    loadComponent: () => import('./skill/skill.component').then(m => m.SkillComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
