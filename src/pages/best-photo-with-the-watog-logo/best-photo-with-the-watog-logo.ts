import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BestPhotoWithTheWatogLogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-photo-with-the-watog-logo',
  templateUrl: 'best-photo-with-the-watog-logo.html',
})
export class BestPhotoWithTheWatogLogoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestPhotoWithTheWatogLogoPage');
  }

}
