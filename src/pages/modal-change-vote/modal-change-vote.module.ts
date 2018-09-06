import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalChangeVotePage } from './modal-change-vote';

@NgModule({
  declarations: [
    ModalChangeVotePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalChangeVotePage),
  ],
})
export class ProfilesLoadPageModule {}
