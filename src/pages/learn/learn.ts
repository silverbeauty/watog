import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { DashboardPage } from '../dashboard/dashboard';
import { InstitutionalContentsPage } from '../institutional-contents/institutional-contents';
import { SponsoredContentPage } from '../sponsored-content/sponsored-content';
import { BreakingNewsPage } from '../breaking-news/breaking-news';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}


