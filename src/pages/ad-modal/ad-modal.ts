import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ContestVotePage } from '../contest-vote/contest-vote';

/**
 * Generated class for the AdModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ad-modal',
  templateUrl: 'ad-modal.html',
})

export class AdModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.info('navParams:', navParams)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdModal');
  }

  onClickDismiss() {
    this.viewCtrl.dismiss();
  }
}
