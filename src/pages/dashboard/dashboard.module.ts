import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { HeaderActionBarComponent } from '../../components/header-action-bar/header-action-bar';

@NgModule({
  imports: [
    HeaderActionBarComponent,
    IonicPageModule.forChild(DashboardPage)
  ],
})
export class DashboardPageModule {}
