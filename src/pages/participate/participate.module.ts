import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipatePage } from './participate';

@NgModule({
  declarations: [
    ParticipatePage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipatePage),
  ],
})
export class ParticipatePageModule {}
