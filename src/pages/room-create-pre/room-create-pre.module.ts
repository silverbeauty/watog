import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomCreatePrePage } from './room-create-pre';

@NgModule({
  declarations: [
    RoomCreatePrePage,
  ],
  imports: [
    IonicPageModule.forChild(RoomCreatePrePage),
  ],
})
export class RoomCreatePrePageModule {}
