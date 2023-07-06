import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorPageRoutingModule } from './tutor-routing.module';

import { TutorPage } from './tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorPageRoutingModule
  ],
  declarations: [TutorPage]
})
export class TutorPageModule {}
