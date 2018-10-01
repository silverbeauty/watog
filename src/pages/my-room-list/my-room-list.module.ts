import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRoomListPage } from './my-room-list';

@NgModule({
  declarations: [
    MyRoomListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRoomListPage),
  ],
})
export class MyRoomListPageModule {}
