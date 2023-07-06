import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoPage } from './alumno.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnoPage
  },
  {
    path: 'clases',
    loadChildren: () => import('./clases/clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: 'asis',
    loadChildren: () => import('./asis/asis.module').then( m => m.AsisPageModule)
  },
  {
    path: 'tabnav-alumno',
    loadChildren: () => import('./tabnav-alumno/tabnav-alumno.module').then( m => m.TabnavAlumnoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoPageRoutingModule {}
