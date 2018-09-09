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
    let name = this.data.name.split(' ')[0]
    let lastname = '';
    if(this.data.name.includes(' ')){
      lastname = this.data.name.split(' ')[1]
    }

    this.restProvider.queryUsers(name, lastname).then((users: Array<User>) => {
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
          this.data.error = 'Failed to search, you can try again!'
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
      }
      else if(random){
        this.mySearch = Promise.all([this.randomNum]);
        console.log("RANDOM")
      }
      else{
        this.mySearch = Promise.all([this.searchByKey,this.randomNum]);
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
/***
import { Component, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  Direction,
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent } from 'angular2-swing';

import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { ProfilePage } from '../profile/profile';
import { DataProvider, RestProvider } from '../../providers';
import { User, Auth, Post } from '../../types';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profiles-load',
  templateUrl: 'profiles-load.html',
})

export class ProfilesLoadPage {

  public user: User;
  public posts: Array<Post> = [];
  public stackConfig: any;
  public activeIndex: number = -1;
  public showImage: boolean = false;
  public searchResults: Array<any> = [];
  public bestPicsByCat: Array<any>;

  public isPressed: boolean = false;

  @ViewChild('postStacks') swingStack: SwingStackComponent;
  @ViewChildren('postCard') swingCards: QueryList<SwingCardComponent>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public restProvider: RestProvider) {
    this.stackConfig = {
      // Default setting only allows UP, LEFT and RIGHT so you can override this as below
      allowedDirections: [Direction.LEFT, Direction.RIGHT],
      // Now need to send offsetX and offsetY with element instead of just offset
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.max(Math.abs(offsetX) / (element.offsetWidth / 1.7), Math.abs(offsetY) / (element.offsetHeight / 2)), 1);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    }

    const params = this.navParams.data;
    if(params.from == 'randomUser'){
      this.user = params.user.User;
      this.restProvider.queryPost_(`?user_id=${this.user.id}`).then((posts: Array<Post>) => {
        this.posts = posts;
        this.activeIndex = posts.length - 1;
      });
    } else if(params.from == 'contestUser'){
      this.posts = new Array(params.post);
        this.activeIndex =  this.posts.length - 1;
    } else if(params.from == 'searchUser') {
      this.posts = params.post;
      this.activeIndex =  this.posts.length - 1;
    }

    console.log(this.posts);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilesLoadPage');
    // Use default avatar
    if (this.user && !this.user.picture_profile) {
      this.user.picture_profile = 'assets/icon/Profil.png';
    }
  }

  onThrowOut(event) {
    console.info('Event:', event)
    const className = event.target.classList[1];
    const id = parseInt(className.substring('Post:'.length)); // Cut `Post:`
    this.activeIndex = this.activeIndex - 1;

    let commend = true;
    const direction = event.throwDirection.toString()
    if (direction === `Symbol(LEFT)`) { // down vote
      commend = false;
    } else {
      commend = true;
    }
    this.restProvider.votePost(id, commend).then((post: Post) => {
      console.info('Voted post:', post)
      this.popPost()
    }).catch((e) => {
      console.error(e)
    })
  }

  voteUp(flag) {
    this.showImage = true;
  }

  swipeEvent(e){
    this.showImage = true;
  }

  isVoted() {
    if (this.activeIndex < 0) {
      return null;
    }
    const post = this.posts[this.activeIndex];
    if (!post.Votes) {
      return false;
    }
    const index = post.Votes.findIndex(v => v.user_id === DataProvider.auth.id);
    if (index > -1) {
      return post.Votes[index];
    } else {
      return null
    }
  }

  changeVote() {
    const curVote = this.isVoted();

    if (!curVote) { // If not voted
      console.info('not voted!')
      return
    }
    const post = this.posts[this.activeIndex];

    // Revert vote
    this.restProvider.votePost(post.id, !curVote.commend).then((post: Post) => {
      console.info('Changed vote:', post)
      this.popPost()
    }).catch((e) => {
      console.error(e)
    })
  }

  cancelVote() {
    if (!this.isVoted()) { // If not voted
      console.info('not voted!')
      return
    }

    const post = this.posts[this.activeIndex];

    // Revert vote
    this.restProvider.cancelVotePost(post.id).then((post: Post) => {
      console.info('Canceled vote:', post)
      this.popPost()
    }).catch((e) => {
      console.error(e)
    })
  }

  votePost( commend: boolean = true) {
    const post = this.posts[this.activeIndex];
    // Revert vote
    this.restProvider.votePost(post.id, commend).then((post: Post) => {
      console.info('Changed vote:', post)
      this.popPost()
    }).catch((e) => {
      console.error(e)
    })
  }

  popPost() {
    this.activeIndex --;
    if (this.activeIndex < 0) {
      this.goBack();
      return;
    }
    this.posts.pop();

  }

  goBack(){
    this.navCtrl.pop();
  }

  goToProfilePage() {
    this.navCtrl.push(ProfilePage);
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

  pressed() {
    console.log('pressed');
  }

  active() {
    console.log('active');
  }

  onPress(event) {
    // event.preventDefault();
    this.isPressed = true;
  }

  onCancelPress(event) {
    // event.preventDefault();
    this.isPressed = false;
  }
}


***/
