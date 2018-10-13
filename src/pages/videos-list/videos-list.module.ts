import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideosListPage } from './videos-list';

@NgModule({
  imports: [
    IonicPageModule.forChild(VideosListPage),
  ],
})
export class VideosListPageModule {}
