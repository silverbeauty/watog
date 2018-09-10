import { Component, EventEmitter, ViewChild, ViewChildren, QueryList,  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  public visibleElement: any;
  public currentPost: number = 0;
  public isPressed: boolean = false;
  public onInit : boolean = true;

  @ViewChild('postStacks') swingStack: SwingStackComponent;
  @ViewChildren('postCard') swingCards: QueryList<SwingCardComponent>;

  constructor(public presentAlert: AlertController, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public dataProvider: DataProvider, public restProvider: RestProvider) {
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
    console.log("les post",this.posts);
  }

  loadInfo(){
    console.log("ma swingCards : ", this.swingCards)
    var el = document.querySelector('.stack').lastChild as HTMLElement
    var html = el.getAttributeNode("id").value;
    this.visibleElement = html;
    this.currentPost = parseInt(html);
  }

  ionViewDidLoad() {
    this.loadInfo();
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
      console.log("mon post", this.currentPost)
      console.log("mon element", this.visibleElement)
      console.info('Voted post:', post)
      this.popPost()
    }).catch(err => {
      console.log("My err: ",err)
    })
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
      this.presentAlert('', 'Thanks for your report!');
    }).catch(err => {
      alert("You are already reported this picture.")
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
    if (this.currentPost > 0) {
      this.loadInfo();
      this.currentPost --;
    }
    else{
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
/***



***/
