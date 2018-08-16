import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadProfilePhotoPage } from './upload-profile-photo';

@NgModule({
  declarations: [
    UploadProfilePhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadProfilePhotoPage),
  ],
})
export class UploadProfilePhotoPageModule {}
