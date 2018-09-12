import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ImageViewerController } from 'ionic-img-viewer';

import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { VoteRandomPage } from '../vote-random/vote-random';
import { LoginPage } from '../login/login';
import { ContestSearchResultsPage } from '../contest-search-results/contest-search-results';
import { ProfilesLoadPage } from '../profiles-load/profiles-load';
import { ImageModalPage } from '../imge-modal/img-modal';
import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';
import {User, Auth, Post} from '../../types';

/**
 * Generated class for the ContestVotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contest-vote',
  templateUrl: 'contest-vote.html',
})
export class ContestVotePage {

  public data = {
    name: '',
    error: null
  }
  public posts: Array<Post> = [];
  public searchByKey: any;
  public keyword: any;
  public searchByName: any;
  public getName: any = null;
  public user: Array<User> = null;
  public mySearch: any;
  public random: any;
  public randomNum: any = null;
  public picture_url: any;
  public bestPicsByChat: any;
  public isVisible: boolean = false;
  _imageViewerCtrl: ImageViewerController;
    public bestPicsByCat: Array<any>;

  public searching: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider, imageViewerCtrl: ImageViewerController, public modalCtrl: ModalController) {
    this._imageViewerCtrl = imageViewerCtrl;
    const bestCat1 = this.restProvider.queryBestPost('1');
    const bestCat2 = this.restProvider.queryBestPost('2');
    const bestCat3 = this.restProvider.queryBestPost('3');
    const bestCat4 = this.restProvider.queryBestPost('4');
    const bestCat5 = this.restProvider.queryBestPost('5');
    Promise.all([bestCat1, bestCat2, bestCat3, bestCat4, bestCat5]).then(data => {
      this.bestPicsByChat = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestVotePage');
    Promise.all([this.restProvider.queryCategories()]).then(data =>{
      const images:any = data[0][0];
      this.picture_url = images.User.picture_profile;
    })
  }

  goBack() {
    this.navCtrl.pop();
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }


  onSearchClick() {
    DataProvider.searchUserName = this.data.name;
    let query = '?not_me&random&limit=1000&'
    if(this.data.name[0] == '@'){
      const username = this.data.name.split('@')[1];
      query += 'user_name=' + username
      console.log("query")
    } else if (this.data.name[0] == '#') {
      const keyword = this.data.name.split('#')[1];
      query += 'keyword=' + keyword
    } else{
      this.data.error = 'Please enter an username @USERNAME or a keyword #KEYWORD!'
      return
    }
    this.searching = true;
    this.restProvider.queryPost(query).then((posts: Array<Post>) => {
      this.searching = false;
      this.onReceivedPosts(posts)
    }).catch((e) => {
      this.searching = false;
      console.error(e)
      this.data.error = 'Failed to search photos! Please try again.'
    }) 
    // This is really a mess
    // this.restProvider.queryUsers(this.data.name).then((users: Array<User>) => {
    //   DataProvider.searchedUsers = users;
    //   DataProvider.searchUserOffset = 0;

    //   if(users.length != 0){
    //     this.searchByName = this.restProvider.queryPost_(`?user_id=${users[0].id}&random&limit=1000`);
    //     this.searchByKey = this.restProvider.searchByKey(this.data.name);
    //     this.randomNum = this.restProvider.queryPost_("?random&limit=10000")
    //     this.searchCallBack();
    //   }
    //   else{
    //     this.searchCallBack(false)
    //   }
    // }).catch((err: any) => {
    //   this.data.error = 'Failed to search, you can try again!'
    // })
  }

  onReceivedPosts(posts: Array<Post>){
    console.log("data of my promise: ", posts)
    this.navCtrl.push(ProfilesLoadPage, { post: posts, from: 'searchUser'});
  }

  onRandomClick() {
    this.restProvider.queryPost("?limit=100000&random").then((data: Array<Post>) => {
      this.onReceivedPosts(data);
    })
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

  checkFocus() {
    this.data.error = null;
  }

  presentImage(myImage) {
    console.log(myImage)
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();

    setTimeout(() => imageViewer.dismiss(), 3000);
  }

  showImageGallery() {
    this.isVisible = true;
    let imgModal = this.modalCtrl.create(ImageModalPage, { images: this.bestPicsByChat });
    imgModal.present();
    setTimeout(() => imgModal.dismiss(), 8000);
  }
}
