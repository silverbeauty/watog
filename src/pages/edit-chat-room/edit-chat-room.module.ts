import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditChatRoomPage } from './edit-chat-room';

@NgModule({
  declarations: [
    EditChatRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(EditChatRoomPage),
  ],
})
export class EditChatRoomPageModule {}
