import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestPage } from './contest';

@NgModule({
  declarations: [
    ContestPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestPage),
  ],
})
export class ContestPageModule {}
