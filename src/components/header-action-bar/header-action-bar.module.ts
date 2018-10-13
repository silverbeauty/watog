import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeaderActionBarComponent } from './header-action-bar';

@NgModule({
  imports: [
    IonicPageModule.forChild(HeaderActionBarComponent),
  ],
  exports: [
    HeaderActionBarComponent
  ]
})
export class HeaderActionBarModule {
}
