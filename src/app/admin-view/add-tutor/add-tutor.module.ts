import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTutorPageRoutingModule } from './add-tutor-routing.module';

import { AddTutorPage } from './add-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTutorPageRoutingModule
  ],
  declarations: [AddTutorPage]
})
export class AddTutorPageModule {}
