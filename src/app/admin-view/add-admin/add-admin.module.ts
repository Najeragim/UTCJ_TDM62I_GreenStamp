import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdminPageRoutingModule } from './add-admin-routing.module';

import { AddAdminPage } from './add-admin.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdminPageRoutingModule,
    HttpClientModule, // Agregar el módulo HttpClientModule aquí
  ],
  declarations: [AddAdminPage]
})
export class AddAdminPageModule {}
