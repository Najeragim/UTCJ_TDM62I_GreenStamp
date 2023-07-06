import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfPageRoutingModule } from './prof-routing.module';

import { ProfPage } from './prof.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfPageRoutingModule
  ],
  declarations: [ProfPage]
})
export class ProfPageModule {}
