import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatogContactPage } from './watog-contact';

@NgModule({
  declarations: [
    WatogContactPage,
  ],
  imports: [
    IonicPageModule.forChild(WatogContactPage),
  ],
})
export class WatogContactPageModule {}
