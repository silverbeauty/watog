import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LearnContentPage } from './learn-content';

@NgModule({
  declarations: [
    LearnContentPage,
  ],
  imports: [
    IonicPageModule.forChild(LearnContentPage),
  ],
})
export class LearnContentPageModule {}
