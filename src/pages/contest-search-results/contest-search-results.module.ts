import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestSearchResultsPage } from './contest-search-results';

@NgModule({
  declarations: [
    ContestSearchResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestSearchResultsPage),
  ],
})
export class ContestSearchResultsPageModule {}
