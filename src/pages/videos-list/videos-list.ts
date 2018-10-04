import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PlayVideoPage } from '../play-video/play-video';

/**
 * Generated class for the VideosListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videos-list',
  templateUrl: 'videos-list.html',
})
export class VideosListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosListPage');
  }
  goBack() {
    this.navCtrl.pop();
  }
  goToPlayVideo(){
    this.navCtrl.push(PlayVideoPage)
  }

}
