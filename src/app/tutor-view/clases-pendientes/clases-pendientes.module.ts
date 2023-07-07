import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesPendientesPageRoutingModule } from './clases-pendientes-routing.module';

import { ClasesPendientesPage } from './clases-pendientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesPendientesPageRoutingModule
  ],
  declarations: [ClasesPendientesPage]
})
export class ClasesPendientesPageModule {}
