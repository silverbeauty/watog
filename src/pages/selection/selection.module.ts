import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectionPage } from './selection';

@NgModule({
  declarations: [
    SelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectionPage),
  ],
})
export class SelectionPageModule {}
