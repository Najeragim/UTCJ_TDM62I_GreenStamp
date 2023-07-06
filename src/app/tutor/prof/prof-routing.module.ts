import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfPage } from './prof.page';

const routes: Routes = [
  {
    path: '',
    component: ProfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfPageRoutingModule {}
