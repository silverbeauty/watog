import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoteRandomPage } from './vote-random';

@NgModule({
  declarations: [
    VoteRandomPage,
  ],
  imports: [
    IonicPageModule.forChild(VoteRandomPage),
  ],
})
export class VoteRandomPageModule {}
