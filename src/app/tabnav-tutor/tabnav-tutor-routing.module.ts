import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavTutorPage } from './tabnav-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: TabnavTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavTutorPageRoutingModule {}
