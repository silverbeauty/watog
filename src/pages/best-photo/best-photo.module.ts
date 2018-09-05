import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BestPhotoPage } from './best-photo';

@NgModule({
  declarations: [
    BestPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(BestPhotoPage),
  ],
})
export class BestPhotoPageModule {}
