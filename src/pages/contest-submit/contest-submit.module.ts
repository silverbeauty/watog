import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestSubmitPage } from './contest-submit';

@NgModule({
  declarations: [
    ContestSubmitPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestSubmitPage),
  ],
})
export class ContestSubmitPageModule {}
