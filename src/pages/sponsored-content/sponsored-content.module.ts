import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SponsoredContentPage } from './sponsored-content';

@NgModule({
  declarations: [
    SponsoredContentPage,
  ],
  imports: [
    IonicPageModule.forChild(SponsoredContentPage),
  ],
})
export class SponsoredContentPageModule {}
