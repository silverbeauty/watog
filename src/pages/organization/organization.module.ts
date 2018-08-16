import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizationPage } from './organization';

@NgModule({
  declarations: [
    OrganizationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrganizationPage),
  ],
})
export class OrganizationPageModule {}
