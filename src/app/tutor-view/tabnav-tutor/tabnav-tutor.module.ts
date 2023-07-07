import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabnavTutorPageRoutingModule } from './tabnav-tutor-routing.module';

import { TabnavTutorPage } from './tabnav-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabnavTutorPageRoutingModule
  ],
  declarations: [TabnavTutorPage]
})
export class TabnavTutorPageModule {}
