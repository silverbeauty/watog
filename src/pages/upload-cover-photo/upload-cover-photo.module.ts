import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadCoverPhotoPage } from './upload-cover-photo';

@NgModule({
  declarations: [
    UploadCoverPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadCoverPhotoPage),
  ],
})
export class UploadCoverPhotoPageModule {}
