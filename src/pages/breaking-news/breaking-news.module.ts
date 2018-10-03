import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BreakingNewsPage } from './breaking-news';

@NgModule({
  declarations: [
    BreakingNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(BreakingNewsPage),
  ],
})
export class BreakingNewsPageModule {}
