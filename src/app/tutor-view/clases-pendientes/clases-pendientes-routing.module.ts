import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesPendientesPage } from './clases-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesPendientesPageRoutingModule {}
