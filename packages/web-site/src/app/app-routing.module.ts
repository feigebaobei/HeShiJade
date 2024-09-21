import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', 
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  { path: 'doc', 
    loadComponent: () => import('./doc/doc.component').then(m => m.DocComponent)
  },
  { path: 'boundary', 
    loadComponent: () => import('./boundary/boundary.component').then(m => m.BoundaryComponent)
  },
  { path: 'extend', 
    loadComponent: () => import('./extend/extend.component').then(m => m.ExtendComponent)
  },
  { path: 'design', 
    loadComponent: () => import('./design/design.component').then(m => m.DesignComponent)
  },
  { path: 'data', 
    loadComponent: () => import('./data/data.component').then(m => m.DataComponent)
  },
  { path: 'changelog', 
    loadComponent: () => import('./changelog/changelog.component').then(m => m.ChangelogComponent)
  },
  { path: 'circum', 
    loadComponent: () => import('./circum/circum.component').then(m => m.CircumComponent)
  },
  { path: 'skill', 
    loadComponent: () => import('./skill/skill.component').then(m => m.SkillComponent)
  },
  { path: 'api', 
    loadComponent: () => import('./api/api.component').then(m => m.ApiComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
