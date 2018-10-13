import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';

// import { ChatService } from "../../providers/chat-service/chat-service";
import { EmojiPickerComponentModule } from "../../components/emoji-picker/emoji-picker.module";
// import { EmojiProvider } from "../../providers/emoji/emoji";

@NgModule({
  imports: [
    EmojiPickerComponentModule,
    IonicPageModule.forChild(ChatPage),
  ],
})
export class ChatPageModule {}
