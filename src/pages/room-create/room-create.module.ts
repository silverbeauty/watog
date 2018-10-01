import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomCreatePage } from './room-create';

@NgModule({
  declarations: [
    RoomCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(RoomCreatePage),
  ],
})
export class RoomCreatePageModule {}
