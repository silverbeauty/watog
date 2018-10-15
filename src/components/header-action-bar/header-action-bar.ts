import { Component } from '@angular/core';
import { NavController, ModalController, Events } from 'ionic-angular';

import { ProfilePage } from '../../pages/profile/profile';
import { SettingsPage } from '../../pages/settings/settings';
import { ModalLogout } from '../../pages/modal-logout/modal-logout';
import { ChatRoomPage } from '../../pages/chat-room/chat-room';
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
  count_unreadmessage : any = 0

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public events: Events,
  ) {

    var self = this
    this.events.subscribe('notification:unread', (count) => {
      self.count_unreadmessage = count
    })
  }
  onClickNotification(){
    this.navCtrl.push(ChatRoomPage);
  }

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
