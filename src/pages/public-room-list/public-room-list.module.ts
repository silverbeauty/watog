import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicRoomListPage } from './public-room-list';

@NgModule({
  declarations: [
    PublicRoomListPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicRoomListPage),
  ],
})
export class PublicRoomListPageModule {}
