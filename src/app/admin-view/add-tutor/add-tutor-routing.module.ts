import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTutorPage } from './add-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: AddTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTutorPageRoutingModule {}
