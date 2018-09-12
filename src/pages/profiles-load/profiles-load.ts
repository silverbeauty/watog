import { Component, EventEmitter, ViewChild, ViewChildren, QueryList,  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Modal } from 'ionic-angular';

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
  public showImage: boolean = false;
  public searchResults: Array<any> = [];
  public bestPicsByCat: Array<any>;
  public visibleElement: any;
  public currentPost: number = -1;
  public isPressed: boolean = false;
  public onInit : boolean = true;

  @ViewChild('postStacks') swingStack: SwingStackComponent;
  @ViewChildren('postCard') swingCards: QueryList<SwingCardComponent>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public dataProvider: DataProvider, public restProvider: RestProvider) {
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
      this.restProvider.queryPost(`?user_id=${this.user.id}`).then((posts: Array<Post>) => {
        this.posts = posts;
        this.currentPost = posts.length - 1;
      });
    } else if(params.from == 'contestUser'){
      this.posts = new Array(params.post);
      this.currentPost = this.posts.length - 1;
    } else if(params.from == 'searchUser') {
      this.posts = params.post;
      this.currentPost =  this.posts.length - 1;
    }
    console.log("les post",this.posts);
  }

  ionViewDidLoad() {
    this.showModal();
  }

  onThrowOut(event) {
    console.info('Event:', event)
    const className = event.target.classList[1];
    const id = parseInt(className.substring('Post:'.length)); // Cut `Post:`
    this.currentPost = this.currentPost - 1;

    let commend = true;
    const direction = event.throwDirection.toString()
    if (direction === `Symbol(LEFT)`) { // down vote
      commend = false;
    } else {
      commend = true;
    }
    this.showVoting()
    this.restProvider.votePost(id, commend).then((post: Post) => {
      console.log("mon post", this.currentPost)
      console.log("mon element", this.visibleElement)
      console.info('Voted post:', post)
      this.popPost()

      if (commend) { this.showJustLiked() } else { this.showJustdisliked() }
    }).catch(err => {
      console.log("My err: ",err)
    })
  }

  showVoting() {

  }

  hideVoting() {
    
  }

  showModal(){
    let bool = true;

    if(bool){
      let modalFirst = document.getElementById("modal-first");
      modalFirst.style.display = "block";
    }
  }

  modalClose(){
    let modalFirst = document.getElementById("modal-first");
    modalFirst.style.display = "none";
  }

  showJustLiked(){
    let justLiked = document.getElementById("just-liked");
    justLiked.style.display = "block";

    setTimeout(() => {
      justLiked.style.display = "none";
    }, 1000);
  }

  showJustdisliked(){
    let justDisliked = document.getElementById("just-disliked");
    justDisliked.style.display = "block";

    setTimeout(() => {
      justDisliked.style.display = "none";
    }, 1000);
  }

  htmlId(){
    console.log("mon post courrant", this.currentPost)
    return this.currentPost;
  }

  voteUp(flag) {
    this.showImage = true;
  }

  swipeEvent(e){
    this.showImage = true;
  }

  isVoted() {
    if (this.currentPost < 0) {
      return null;
    }
    const post = this.posts[this.currentPost];
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
    const post = this.posts[this.currentPost];

    // Revert vote
    this.restProvider.votePost(post.id, !curVote.commend).then((post: Post) => {
      console.info('Changed vote:', post)
      // this.popPost()
    }).catch((e) => {
      console.error(e)
    })
  }

  cancelVote() {
    if (!this.isVoted()) { // If not voted
      console.info('not voted!')
      return
    }

    const post = this.posts[this.currentPost];

    // Revert vote
    this.restProvider.cancelVotePost(post.id).then((post: Post) => {
      console.info('Canceled vote:', post)
      this.popPost()
    }).catch((e) => {
      console.error(e)
    })
  }

  onClickReport() {

    const post = this.posts[this.currentPost];
    this.restProvider.reportPost(post.id, 'scam', 'test').then((report) => {
      console.info('Post reported:', report)
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: ' Thanks for your report!',
        buttons: ['OK']
      });
      alert.present();
    }).catch(err => {
      console.log("Error",err);
    })
  }

  votePost( commend: boolean = true) {
    const post = this.posts[this.currentPost];
    // Revert vote
    this.restProvider.votePost(post.id, commend).then((post: Post) => {
      console.info('Changed vote:', post)
      this.popPost()
    }).catch((e) => {
      console.error(e)
    })
  }

  popPost() {
    this.posts.pop();
    this.currentPost = this.posts.length - 1;

    if (this.currentPost < 0) {
      this.goBack();
      return
    }
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
