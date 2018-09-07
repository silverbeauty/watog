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
  selector: 'page-img-modal',
  templateUrl: 'img-modal.html',
})
export class ImageModalPage {

  public images: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.images = this.navParams.data.images;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageModalPage');
  }

  goToVote() {
    this.navCtrl.push(ContestVotePage);
  }
  goBack() {
    this.navCtrl.pop();
  }

}
