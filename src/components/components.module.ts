import { NgModule } from '@angular/core';
import { HeaderActionBarComponent } from './header-action-bar/header-action-bar';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker';
@NgModule({
	declarations: [HeaderActionBarComponent,
    EmojiPickerComponent],
	imports: [],
	exports: [HeaderActionBarComponent,
    EmojiPickerComponent]
})
export class ComponentsModule {}
