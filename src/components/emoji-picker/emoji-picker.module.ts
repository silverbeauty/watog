import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojiPickerComponent } from './emoji-picker';

@NgModule({
  imports: [
    IonicPageModule.forChild(EmojiPickerComponent),
  ],
  exports: [
    EmojiPickerComponent
  ]
})
export class EmojiPickerComponentModule {
}
