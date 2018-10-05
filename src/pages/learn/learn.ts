import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { InstitutionalContentsPage } from '../institutional-contents/institutional-contents';
import { SponsoredContentPage } from '../sponsored-content/sponsored-content';
import { BreakingNewsPage } from '../breaking-news/breaking-news';
import { LearnContentPage } from '../learn-content/learn-content';
import { RestProvider } from '../../providers';
import { User, Auth } from '../../types';


/**
 * Generated class for the LearnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-learn',
  templateUrl: 'learn.html',
})
export class LearnPage {
  public catlist = Object.keys;
  public video;
  public expression

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    this.restProvider.getVideos().then( (video: any) => {
      this.video = video;
      this.expression = true;
      
    }).catch(err => {
      console.error(err)
    })
  }
 
  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }
 
  goToInstitutionalContents(){
    this.navCtrl.push(InstitutionalContentsPage);
  }
  goToSponsoredContents(){
    this.navCtrl.push(SponsoredContentPage);
  }
   goToBreakingNews(){
    this.navCtrl.push(BreakingNewsPage);
  }

  goToLearnContent(event ,item){
    this.navCtrl.push(LearnContentPage,{
      item:item
    });
  }

}


