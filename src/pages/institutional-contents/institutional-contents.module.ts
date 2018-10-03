import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstitutionalContentsPage } from './institutional-contents';

@NgModule({
  declarations: [
    InstitutionalContentsPage,
  ],
  imports: [
    IonicPageModule.forChild(InstitutionalContentsPage),
  ],
})
export class InstitutionalContentsPageModule {}
