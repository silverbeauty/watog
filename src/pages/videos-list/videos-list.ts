import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, Platform } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public modalCtrl: ModalController, private youtube: YoutubeVideoPlayer, private plt: Platform) {
    this.vidvalue = navParams.get('N');

    console.log(this.vidvalue)
  }

  ngOnInit(): void {
    this.vidvalue.forEach(element => {
      const link = element.link;
      element.link = element.link.replace('https://www.youtube.com/embed', 'http://img.youtube.com/vi') + '/default.jpg';
      element.videoId = link.replace('https://www.youtube.com/embed/', '')
    });
    console.log(this.vidvalue)
  }

  openVideo(videoId) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(videoId);
    } else {
      window.open('https://www.youtube.com/watch?v=' + videoId);
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToPlayVideo(video) {
    this.navCtrl.push(PlayVideoPage, {
      videoId: video.videoId
    })
  }

}
