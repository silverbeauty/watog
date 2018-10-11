import { Component, forwardRef } from '@angular/core';
import { EmojiProvider } from "../../providers/emoji/emoji";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ChatService } from "../../providers/";

export const EMOJI_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojiPickerComponent),
  multi: true
};

@Component({
  selector: 'emoji-picker',
  providers: [EMOJI_PICKER_VALUE_ACCESSOR],
  templateUrl: 'emoji-picker.html'
})
export class EmojiPickerComponent implements ControlValueAccessor {

  emojiArr = [];

  _content: string;
  _onChanged: Function;
  _onTouched: Function;
  unicode: string = "";

  constructor(private emojiProvider: EmojiProvider, private chatService: ChatService) {
    this.emojiArr = emojiProvider.getEmojis();
  }

  writeValue(obj: any): void {
    this._content = obj;
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
    this.setValue(this._content);
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  private setValue(val: any): any {
    this._content += val;
    if (this._content) {
      this.unicode += this.emojiUnicode(val) + ",";
      this._onChanged(this._content)
    }

    this.chatService.setEmojiUnicode(this.unicode);
  }

  emojiUnicode (emoji) {
    let comp;
    if (emoji.length === 1) {
      comp = emoji.charCodeAt(0);
    }
    comp = (
      (emoji.charCodeAt(0) - 0xD800) * 0x400
      + (emoji.charCodeAt(1) - 0xDC00) + 0x10000
    );
    if (comp < 0) {
      comp = emoji.charCodeAt(0);
    }

    return comp.toString("16");
  };
}
