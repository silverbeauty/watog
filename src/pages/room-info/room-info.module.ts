import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomInfoPage } from './room-info';

@NgModule({
  declarations: [
    RoomInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomInfoPage),
  ],
})
export class RoomInfoPageModule {}
