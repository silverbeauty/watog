import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContestSearchResultUsersPage } from './contest-search-result-users';

@NgModule({
  declarations: [
    ContestSearchResultUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(ContestSearchResultUsersPage),
  ],
})
export class ContestSearchResultUsersPageModule {}
