import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilesLoadPage } from './profiles-load';

@NgModule({
  declarations: [
    ProfilesLoadPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilesLoadPage),
  ],
})
export class ProfilesLoadPageModule {}
