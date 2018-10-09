import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { VideosListPage } from '../videos-list/videos-list';
/**
 * Generated class for the SponsoredContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponsored-content',
  templateUrl: 'sponsored-content.html',
})
export class SponsoredContentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SponsoredContentPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToVideosListPage(){
    this.navCtrl.push(VideosListPage);
  }

}
