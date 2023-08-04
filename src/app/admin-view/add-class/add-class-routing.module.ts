import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddClassPage } from './add-class.page';

const routes: Routes = [
  {
    path: '',
    component: AddClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddClassPageRoutingModule {}
