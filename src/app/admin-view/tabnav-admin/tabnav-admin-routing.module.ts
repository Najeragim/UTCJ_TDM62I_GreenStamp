import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavAdminPage } from './tabnav-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabnavAdminPage,
    children: [
      {
        path: 'buscar',
        loadChildren: () => import('./../../admin-view/buscar/buscar.module').then( m => m.BuscarPageModule)
      },
      {
        path: 'add-admin',
        loadChildren: () => import('./../../admin-view/add-admin/add-admin.module').then( m => m.AddAdminPageModule)
      },
      {
        path: 'add-tutor',
        loadChildren: () => import('./../../admin-view/add-tutor/add-tutor.module').then( m => m.AddTutorPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavAdminPageRoutingModule {}