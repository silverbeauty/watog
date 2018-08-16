import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestSearchPage } from './contest-search';

@NgModule({
  declarations: [
    ContestSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestSearchPage),
  ],
})
export class ContestSearchPageModule {}
