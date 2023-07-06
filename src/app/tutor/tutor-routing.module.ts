import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorPage } from './tutor.page';

const routes: Routes = [
  {
    path: '',
    component: TutorPage
  },
  {
    path: 'prof',
    loadChildren: () => import('./prof/prof.module').then( m => m.ProfPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorPageRoutingModule {}
