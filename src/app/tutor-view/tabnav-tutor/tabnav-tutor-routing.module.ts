import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavTutorPage } from './tabnav-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: TabnavTutorPage,
    children:[
      {
        path: 'clases-pendientes',
        loadChildren: () => import('./../../tutor-view/clases-pendientes/clases-pendientes.module').then( m => m.ClasesPendientesPageModule)
      },
      {
        path: 'listas',
        loadChildren: () => import('./../../tutor-view/listas/listas.module').then( m => m.ListasPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavTutorPageRoutingModule {}
