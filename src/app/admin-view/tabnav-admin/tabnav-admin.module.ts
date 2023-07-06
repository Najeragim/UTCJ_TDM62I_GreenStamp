import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabnavAdminPageRoutingModule } from './tabnav-admin-routing.module';

import { TabnavAdminPage } from './tabnav-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabnavAdminPageRoutingModule
  ],
  declarations: [TabnavAdminPage]
})
export class TabnavAdminPageModule {}
