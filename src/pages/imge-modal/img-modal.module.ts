import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageModalPage } from './img-modal';

@NgModule({
  declarations: [
    ImageModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageModalPage),
  ],
})
export class ImageModalPageModule {}
