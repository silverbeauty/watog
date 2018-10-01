import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ProfilePage } from '../../pages/profile/profile';
import { SettingsPage } from '../../pages/settings/settings';
import { ModalLogout } from '../../pages/modal-logout/modal-logout';
/**
 * Generated class for the HeaderActionBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'header-action-bar',
  templateUrl: 'header-action-bar.html'
})
export class HeaderActionBarComponent {

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  goToProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  logout(){
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
  }

}
