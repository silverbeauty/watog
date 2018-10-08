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
    const qwantCare = {
      name: 'Qwant Care',
      videos: this.value.list[0].videos
    }
    this.value.list.push(qwantCare);
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToVideosListPage(event, N, Nname) {
    console.log(N, Nname)
    this.navCtrl.push(VideosListPage, {
      N: N,
      Nname: Nname
    });
  }

}
