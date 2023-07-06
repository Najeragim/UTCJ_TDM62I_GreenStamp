import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsisPageRoutingModule } from './asis-routing.module';

import { AsisPage } from './asis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsisPageRoutingModule
  ],
  declarations: [AsisPage]
})
export class AsisPageModule {}
