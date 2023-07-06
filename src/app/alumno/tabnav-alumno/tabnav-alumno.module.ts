import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabnavAlumnoPageRoutingModule } from './tabnav-alumno-routing.module';

import { TabnavAlumnoPage } from './tabnav-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabnavAlumnoPageRoutingModule
  ],
  declarations: [TabnavAlumnoPage]
})
export class TabnavAlumnoPageModule {}
