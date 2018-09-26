import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { ContestVotePage } from '../contest-vote/contest-vote';
import { DataProvider } from '../../providers/data/data';

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

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
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

  onClickNext() {
    this.slides.slideNext();
  }

  showRules() {
    this.dataProvider.showRules();
  }
}
