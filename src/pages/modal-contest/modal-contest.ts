import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParticipatePage } from '../participate/participate';

/**
 * Generated class for the ModalContestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-contest',
  templateUrl: 'modal-contest.html',
})
export class ModalContestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalContestPage');
  }

  goToContest(){
    this.navCtrl.push(ParticipatePage);
  }

}
