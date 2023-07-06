import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavAlumnoPage } from './tabnav-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: TabnavAlumnoPage,
    children: [
      {
        path: 'asis',
        loadChildren: () => import('./../../alumno/asis/asis.module').then( m => m.AsisPageModule)
      },
      {
        path: 'clases',
        loadChildren: () => import('./../../alumno/clases/clases.module').then( m => m.ClasesPageModule)
      },
      // Agrega aquí otras rutas para las páginas adicionales de alumno si las tienes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavAlumnoPageRoutingModule {}
