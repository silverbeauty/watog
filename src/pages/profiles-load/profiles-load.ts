import { Component, EventEmitter, ViewChild, ViewChildren, QueryList,  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Modal, ModalController } from 'ionic-angular';

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
import { ModalLogout } from '../modal-logout/modal-logout';
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
  public voting : boolean = false;
  public showButtonFlag: boolean = false;
  public commend : boolean = null;
  private memory : number;

  @ViewChild('postStacks') swingStack: SwingStackComponent;
  @ViewChildren('postCard') swingCards: QueryList<SwingCardComponent>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public dataProvider: DataProvider, public restProvider: RestProvider, public modalCtrl: ModalController) {
    this.stackConfig = {
      // Default setting only allows UP, LEFT and RIGHT so you can override this as below
      allowedDirections: [Direction.LEFT, Direction.RIGHT],
      // Now need to send offsetX and offsetY with element instead of just offset
      throwOutConfidence: (offsetX, offsetY, element) => {
        this.showLikeDislike((offsetX) / (element.offsetWidth / 1.7));
        console.log((offsetX) / (element.offsetWidth / 1.7));
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

    this.commend = true;
    const direction = event.throwDirection.toString()
    if (direction === `Symbol(LEFT)`) { // down vote
      this.commend = false;
    } else {
      this.commend = true;
    }
    //this.showVoting()
    this.popPost()
    this.restProvider.votePost(id, this.commend).then((post: Post) => {
      //console.log("mon post", this.currentPost)
      //console.log("mon element", this.visibleElement)
      //console.info('Voted post:', post)
      //this.hideVoting()
      if (this.commend) { this.showJustLiked() } else { this.showJustdisliked() }
    }).catch(err => {
      this.hideVoting()
      //console.log("My err: ",err)
    })
  }

  showVoting() {
    this.voting = true;
  }

  hideVoting() {
    this.voting = false;
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
    if (!justLiked) return;

    justLiked.style.display = "block";

    setTimeout(() => {
      if (justLiked) justLiked.style.display = "none";
    }, 1000);
  }

  showJustdisliked(){
    let justDisliked = document.getElementById("just-disliked");
    if (!justDisliked) return;
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

  reportPost() {
    const post = this.posts[this.currentPost];
    this.restProvider.reportPost(post.id, 'scam', 'test').then((report) => {
      console.info('Post reported:', report)
      let alert = this.alertCtrl.create({
        title: 'Reported.',
        subTitle: ' Thanks for your report!',
        buttons: ['OK']
      });
      alert.present();
    }).catch(err => {
      console.log("Error",err);
    })
  }

  onClickReport() {
    const alert = this.alertCtrl.create({
      title: 'Confirm report',
      message: 'Do you want to report this photo?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Report',
          handler: () => {
            this.reportPost()
          }
        }
      ]
    });
    alert.present();
  }

  votePost( commend: boolean = true) {
    const post = this.posts[this.currentPost];
    this.popPost()
    // Revert vote
    this.restProvider.votePost(post.id, commend).then((post: Post) => {
      console.info('Changed vote:', post)
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
    let profileModal = this.modalCtrl.create( ModalLogout );
    profileModal.present();
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

  showLikeDislike(x_offset){
    const hiddenLike = document.getElementById('hidden-liked');
    const hiddenDislike = document.getElementById('hidden-disliked');

    /*If the x_offset is the same value twice in a row,
     then the image stopped moving, 
     the Like/Dislike doesn't need to be displayed anymore*/

    if (x_offset == this.memory) {
      hiddenLike.style.display = 'none';
      hiddenDislike.style.display = 'none';
    } 
    else if(x_offset > 0){
      hiddenLike.style.display = 'block';
      hiddenDislike.style.display = 'none';
      this.memory = x_offset; 
    } 
    else if (x_offset < 0){
      hiddenDislike.style.display = 'block';
      hiddenLike.style.display = 'none';
      this.memory = x_offset;
    } 
    else {
      hiddenLike.style.display = 'none';
      hiddenDislike.style.display = 'none';
    }
  }

  onClickDislike(){
    //
  }

  onClickLike(){
    //
  }
}
