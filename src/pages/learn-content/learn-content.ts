import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { VideosListPage } from '../videos-list/videos-list';

/**
 * Generated class for the LearnContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-learn-content',
  templateUrl: 'learn-content.html',
})

export class LearnContentPage {
  value: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.value = navParams.get('item');

  }

  goBack() {
    this.navCtrl.pop();
  }

  goToVideosListPage(event, N) {
    this.navCtrl.push(VideosListPage, {
      N: N
    });
  }

}
