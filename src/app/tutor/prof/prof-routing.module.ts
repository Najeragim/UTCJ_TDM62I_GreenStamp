import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfPage } from './prof.page';

const routes: Routes = [
  {
    path: '',
    component: ProfPage, children:[{
      path: 'materias',
      loadChildren: () => import('./../../tutor/materias/materias.module').then(m => m.MateriasPageModule)
    },
    {
      path: 'horarios',
      loadChildren: () => import('./../../tutor/horarios/horarios.module').then(m => m.HorariosPageModule)
    }]
  },

  {
    path: 'materias',
    loadChildren: () => import('./../../tutor/materias/materias.module').then(m => m.MateriasPageModule)
  },
  {
    path: 'horarios',
    loadChildren: () => import('./../../tutor/horarios/horarios.module').then(m => m.HorariosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfPageRoutingModule {}
