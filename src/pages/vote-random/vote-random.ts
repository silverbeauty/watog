import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,  AlertController, Content } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';
import { ProfilesLoadPage } from '../profiles-load/profiles-load';
import { DataProvider } from '../../providers/data/data';
import { RestProvider } from '../../providers/rest/rest';
import { User, Auth } from '../../types';

/**
 * Generated class for the VoteRandomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote-random',
  templateUrl: 'vote-random.html',
})
export class VoteRandomPage {
  @ViewChild(Content) content: Content;
  public allUser: any =  [];
  public str: string = "";
  public description: string = "";
  public vote: any = {
    commend: true
  }
  public report: any = {
    type: "",
    description: ""
  }
  showBack: boolean = true;
  previousScroll: number = 0;
  public rando: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public dataProvider: DataProvider, public restProvider: RestProvider) {
    console.log(DataProvider.searchedUsers)
    this.rando = this.restProvider.getAllPost("?random&limit=100000");
    this.getData();
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe((event) => {
      console.log(event);
      if (event.scrollTop > this.previousScroll) {
        this.showBack = false;
        console.log(false);
      } else {
        this.showBack = true;
        console.log(true);
      }
      this.previousScroll = event.scrollTop;
    });
  }

  ionViewDidLoad() {
    Promise.all([this.restProvider.queryPost("?random&limit=100000")]).then(data => {});
  }

  getData(){
    Promise.all([this.rando]).then(data => {
      this.allUser = [];
      console.log("ma promise: ", data)
      for (let element in data){
        for(let all in data[element]){
          this.allUser.push(data[element][all]);
        }
      }
      console.log(this.allUser)
    });
  }

  reported(img){
    let alert = this.alertCtrl.create({
      title: 'Spam',
      subTitle: 'Dou you really want report this picture ?',
      buttons: [
        { text: 'Spam', handler: () =>{
          this.vote.type = 'spam'
        }},
        { text: 'violence', handler: () => {
          this.vote.type = 'violence'
        }},
        { text: 'sex', handler: () => {
          this.vote.type = 'sex'
        }},
        { text: 'other', handler: () => {
          this.vote.type = 'other'
        }}]
    });
    alert.present();
    console.log(this.vote)
    this.vote.description = this.description;
    this.Voted(img.id)
  }

  voteUp(img){
    this.vote.commend = true;
    this.Voted(img.id)
  }

  voteDown(img){
    this.vote.commend = false;
    this.Voted(img.id)
  }

  Voted(id: number){
    //this.vote check to user ng
  /*  const makeVote = "/"+ id +"/vote"
    console.log("vote: ", this.vote)
    this.restProvider.Voted(this.vote, makeVote).then(user => {
      //this.navCtrl.push(VoteRandomPage)
      this.getData();
      let data = user;
      let users = this.allUser;
      console.log("a user: ", data)

      for(let i in users){
        if(this.allUser[i].id === data.id){
          this.allUser[i].up_vote_count = data.up_vote_count.toString();
          this.allUser[i].down_vote_count = data.down_vote_count.toString();
        }
      }
      
    })
    .catch( err => {
      console.log("You have already voted")
    })*/
  }

  goToSearch(user){
    console.log(user)
    this.navCtrl.push(ProfilesLoadPage , {user: user, from: 'randomUser'});
  }

  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  goToProfilePage(){
    this.navCtrl.push(LoginPage);
  }

  goToSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  goBack() {
    this.navCtrl.pop();
  }

  logout(){
    this.dataProvider.clearProfile();
    this.navCtrl.push(LoginPage);
  }

}
