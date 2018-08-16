import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestVotePage } from './contest-vote';

@NgModule({
  declarations: [
    ContestVotePage,
  ],
  imports: [
    IonicPageModule.forChild(ContestVotePage),
  ],
})
export class ContestVotePageModule {}
