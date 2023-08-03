import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTutorPageRoutingModule } from './add-tutor-routing.module';

import { AddTutorPage } from './add-tutor.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTutorPageRoutingModule,
    HttpClientModule, // Agregar el módulo HttpClientModule aquí
  ],
  declarations: [AddTutorPage]
})
export class AddTutorPageModule {}
