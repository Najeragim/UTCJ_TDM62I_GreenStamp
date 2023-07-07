import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorPage } from './tutor.page';

const routes: Routes = [
  {
    path: '',
    component: TutorPage
  },
  {
    path: 'prof',
    loadChildren: () => import('./prof/prof.module').then( m => m.ProfPageModule)
  },
  {
    path: 'horarios',
    loadChildren: () => import('./horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'materias',
    loadChildren: () => import('./materias/materias.module').then( m => m.MateriasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorPageRoutingModule {}
