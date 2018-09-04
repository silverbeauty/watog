import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalContestPage } from '../modal-contest/modal-contest';
import { LandingPage } from '../landing/landing';
/**
 * Generated class for the ModalPrinciplesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-principles',
  templateUrl: 'modal-principles.html',
})
export class ModalPrinciplesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPrinciplesPage');
  }

  goToContest(){
    this.navCtrl.push(ModalContestPage);
  }

  goToLanding() {
    this.navCtrl.setRoot(LandingPage);
  }
}
