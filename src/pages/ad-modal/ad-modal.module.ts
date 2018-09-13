import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdModalPage } from './ad-modal';

@NgModule({
  declarations: [
    AdModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AdModalPage),
  ],
})
export class AdModalPageModule {}
