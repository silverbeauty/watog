import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the PlayVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play-video',
  templateUrl: 'play-video.html',
})
export class PlayVideoPage {

  public videoId;
  public videoThumbnil;

  constructor(public navCtrl: NavController, public navParams: NavParams, private youtube: YoutubeVideoPlayer, private plt: Platform) {
    this.videoId = navParams.get('videoId');
  }

  ngOnInit(): void {
    this.videoThumbnil = 'http://img.youtube.com/vi' + this.videoId + '/default.jpg';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayVideoPage');
  }

  goBack() {
    this.navCtrl.pop();
  }

  openVideo(videoId) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(videoId);
    } else {
      console.log(456)
      window.open('https://www.youtube.com/watch?v=' + videoId);
    }
  }

}
