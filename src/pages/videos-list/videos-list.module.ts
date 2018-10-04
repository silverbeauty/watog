import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosListPage } from './videos-list';

@NgModule({
  declarations: [
    VideosListPage,
  ],
  imports: [
    IonicPageModule.forChild(VideosListPage),
  ],
})
export class VideosListPageModule {}
