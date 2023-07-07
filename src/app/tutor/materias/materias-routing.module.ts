import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MateriasPage } from './materias.page';

const routes: Routes = [
  {
    path: '',
    component: MateriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MateriasPageRoutingModule {}
