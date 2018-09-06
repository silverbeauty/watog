import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContestVotePage } from '../contest-vote/contest-vote';

/**
 * Generated class for the VoteModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote-modal',
  templateUrl: 'vote-modal.html',
})
export class VoteModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoteModalPage');
  }

  goToVote() {
    this.navCtrl.push(ContestVotePage);
  }
  goBack() {
    this.navCtrl.pop();
  }

}
