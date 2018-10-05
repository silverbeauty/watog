import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Contact, Message, Room, Member } from '../../types';
import { server_url } from '../../environments/environment'

@Injectable()
export class ChatService {
  apiUrl: string = server_url;
  USER_LIST: string = server_url+"/user?not_me";
  CREATE_ROOM: string = server_url+"/room";
  MY_ROOM: string = server_url+"/room/my";
  EDIT_ROOM: string = server_url+"/room/";
  token: string;

  constructor(private http: HttpClient,
              private events: Events) {
      const res = [ window.localStorage.getItem('authorization'),  window.localStorage.getItem('user')]
      console.log("authorization => ", res)
      if (res[0]) {
        // Set token to RestProvider
        this.token = res[0];
      }
      console.log('Hello ChatService Provider Provider');
  }

  public getUserList(): Promise<Member>{
    const headers = new HttpHeaders({
      'Authorization':  this.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.USER_LIST, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data)
          } else {
            console.error('Failed to load All users:', res)
            reject ('Failed to load All Users')
          }
        }, (err) => {
          console.info('Failed to load All Users:', err)
          reject(err);
        });
    })
  }
  
  public createRoom(params : any ): Promise<any>{
    const headers = new HttpHeaders({
      'Authorization':  this.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.post(this.CREATE_ROOM, JSON.stringify(params), { headers })
        .subscribe((res: any) => {
          if (res.status) {
            console.log("create room response => ", res)
            resolve(res.status)
          } else {
            console.error('Failed to load profile:', res)
            reject ('Failed to create room')
          }
        }, (err) => {
          console.info('Failed to create room:', err)
          reject(err);
        });
    })
  }

  public myRoomList(): Promise<Array<Room>>{
    const headers = new HttpHeaders({
      'Authorization':  this.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.get(this.MY_ROOM, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data);
          } else {
            console.error('Failed to load All users:', res)
            reject ('Failed to load All Users')
          }
        }, (err) => {
          console.info('Failed to load All Users:', err)
          reject(err);
        });
    })
  }
  
  public editRoom(params : any, id : any): Promise<Room>{
    const headers = new HttpHeaders({
      'Authorization':  this.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.put(this.EDIT_ROOM+id, JSON.stringify(params), { headers })
        .subscribe((res: any) => {
          if (res.status) {
            console.log(res.data)
            resolve(res.data);
          } else {
            console.error('Failed to load All users:', res)
            reject ('Failed to load All Users')
          }
        }, (err) => {
          console.info('Failed to load All Users:', err)
          reject(err);
        });
    })
  }
  
  public archiveRoom(id : any): Promise<Room>{
    const headers = new HttpHeaders({
      'Authorization':  this.token,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.http.put(this.EDIT_ROOM+id, JSON.stringify({archived: true}), { headers })
        .subscribe((res: any) => {
          if (res.status) {
            console.log(res.data)
            resolve(res.data);
          } else {
            console.error('Failed to archive room:', res)
            reject ('Failed to load archvie room')
          }
        }, (err) => {
          console.info('Failed to load archive room:', err)
          reject(err);
        });
    })
  }

  public  getMsgList(id, params): Promise<Message[]> {
    const headers = new HttpHeaders({
      'Authorization':  this.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.get(this.EDIT_ROOM+id+"/messages?"+params, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            console.log(res.data)
            resolve(res.data);
          } else {
            console.error('Failed to archive room:', res)
            reject ('Failed to load archvie room')
          }
        }, (err) => {
          console.info('Failed to load archive room:', err)
          reject(err);
        });
    })
  }

  public mockNewMsg(msg) {
    
    const mockMsg: Message = {
      messageId: Date.now().toString(),
      userId: 210000198410281948,
      userName: 'Hancock',
      userAvatar: './assets/imgs/image_group_avatar.png',
      toUserId: 140000198202211138,
      time: Date.now(),
      message: msg.message,
      status: 'success'
    };

    setTimeout(() => {
      this.events.publish('chat:received', mockMsg, Date.now())
    }, Math.random() * 1800)
  }

  public getUserInfo(): Promise<Contact> {
    const userInfo: Contact = {
      id: 140000198202211138,
      name: 'Luff',
      avatar: './assets/imgs/image_avatar.png'
    };
    return new Promise(resolve => resolve(userInfo));
  }

}
