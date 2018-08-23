import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestVoteSearchDetailPage } from './contest-vote-search-detail';

@NgModule({
  declarations: [
    ContestVoteSearchDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestVoteSearchDetailPage),
  ],
})
export class ContestVoteSearchDetailPageModule {}
