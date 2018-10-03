import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportModalPage } from './report-modal';

@NgModule({
  declarations: [
    ReportModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportModalPage),
  ],
})
export class ReportModalPageModule {}
