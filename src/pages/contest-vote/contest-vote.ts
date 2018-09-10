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
  public searchByName: any;
  public mySearch: any;
  public random: any;
  public randomNum: any;
  public picture_url: any;
  public bestPicsByChat: any;
  public isVisible: boolean = false;
  _imageViewerCtrl: ImageViewerController;
    public bestPicsByCat: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public dataProvider: DataProvider, imageViewerCtrl: ImageViewerController, public modalCtrl: ModalController) {
    this._imageViewerCtrl = imageViewerCtrl;
    const bestCat1 = this.restProvider.queryBestPost('1');
    const bestCat2 = this.restProvider.queryBestPost('2');
    const bestCat3 = this.restProvider.queryBestPost('3');
    const bestCat4 = this.restProvider.queryBestPost('4');
    const bestCat5 = this.restProvider.queryBestPost('5');
    Promise.all([bestCat1, bestCat2, bestCat3, bestCat4, bestCat5]).then(data => {
      this.bestPicsByChat = data;
      console.log("Allphoto",data);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContestVotePage');
    Promise.all([this.restProvider.queryCategories()]).then(data =>{
      console.log(data)
      const images:any = data[0][0];
      console.log(images)
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
    console.info('Search:', this.data.name)
    // Set recent search
    DataProvider.searchUserName = this.data.name;

    this.restProvider.queryUsers(this.data.name).then((users: Array<User>) => {
      DataProvider.searchedUsers = users;
      DataProvider.searchUserOffset = 0;

      if(users.length != 0){
        console.log("my users daya: ", users)
        //const randomNum = Math.floor(Math.random() * user.length);
        console.log("mon user:  ",users)

        this.searchByName = this.restProvider.queryPost_(`?user_id=${users[0].id}&random&limit=1000`);
        this.searchByKey = this.restProvider.searchByKey(this.data.name);
        this.randomNum = this.restProvider.queryPost_("?random&limit=10000")
        this.searchCallBack();
      }
      else{
          this.searchCallBack(false)
      }
    }).catch((err: any) => {
      this.data.error = 'Failed to search, you can try again!'
    })

  }

  onRandomClick() {
    this.searchCallBack(false,true)
  }

  searchCallBack(active = true, random= false){
      if(active){
        this.mySearch = Promise.all([this.searchByName,this.searchByKey,this.randomNum]);
        console.log("COMPLETE SEARCH")
      }
      else if(random && !active){
        this.mySearch = Promise.all([this.randomNum]);
        console.log("RANDOM")
      }
      else{
        this.mySearch = Promise.all([this.searchByKey,this.randomNum]);
        console.log("KEYWORD SEARCH")
      }

      this.mySearch.then(data => {
        let tab: Array<any> = [];
        console.log("voici data", data)
        let dataLength = 0;
        for(let n in data){
          dataLength += data[n].length;
        }
        console.log("voici data length: ", dataLength);
        dataLength = dataLength - 1
        for(let i in data){
          for(let element in data[i]){
            tab.push(data[i][element])
            data[i][element].htmlId = dataLength;
            console.log("tab no reverse",data[i][element])
            dataLength --;
          }
        }
        console.log("tab no reverse",tab)
        let myTab = tab.reverse();
        console.log("my tab", myTab)
        console.log("mySearch: ", data)
        this.navCtrl.push(ProfilesLoadPage, {post: myTab, from: 'searchUser'});
      }).catch((err: any) => {
        this.data.error = 'Failed to search, you can try again!'
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

