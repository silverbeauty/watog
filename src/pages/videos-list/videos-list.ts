import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { PlayVideoPage } from '../play-video/play-video';

import { RestProvider } from '../../providers';
import { User, Auth } from '../../types';
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
// public video;

public vidvalue;

public expression = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public modalCtrl: ModalController) {
  this.vidvalue = navParams.get('N');
  }

  goBack() {
    this.navCtrl.pop();
  }
  goToPlayVideo(){
    this.navCtrl.push(PlayVideoPage)
  }

}
