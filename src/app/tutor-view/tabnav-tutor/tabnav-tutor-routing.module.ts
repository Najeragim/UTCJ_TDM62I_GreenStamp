import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavTutorPage } from './tabnav-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: TabnavTutorPage, children:[{
      path: 'clases',
      loadChildren: () => import('./../../tutor-view/clases/clases-routing.module').then(m => m.ClasesPageRoutingModule )
    },
    {
      path: 'listas',
      loadChildren: () => import('./../../tutor-view/listas/listas-routing.module').then(m => m.ListasPageRoutingModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavTutorPageRoutingModule {}
