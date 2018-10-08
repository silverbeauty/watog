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
  ATTACH: string = server_url+"/file";
  token: string;
  auth: any;
  constructor(private http: HttpClient,
              private events: Events) {
      const res = [ window.localStorage.getItem('authorization'),  window.localStorage.getItem('user')]
      if (res[0]) {
        // Set token to RestProvider
        this.token = res[0];
      }
      this.auth = JSON.parse(res[1]);
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
console.log("get Msg Endpoint => ", this.EDIT_ROOM+id+"/messages?"+params)
    return new Promise((resolve, reject) => {
      this.http.get(this.EDIT_ROOM+id+"/messages?"+params, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            console.log("chating history", res.data)
            let _temp = [];
            res.data.forEach(element => {
              const sender = element.Member.User;
              let _msg: Message = {
                messageId: Date.now().toString(),
                userId: sender.id,
                userName: sender.first_name+" "+sender.last_name,
                userAvatar: sender.picture_profile,
                time: element.createdAt,
                message: element.text
              };
              _temp.push(_msg);
            });
            
            resolve(_temp);
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

  public sendFile(file: any): Promise<any>{
    const headers = new HttpHeaders({
      'Authorization':  this.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.post(this.ATTACH, JSON.stringify({file: file}), { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data);
          } else {
            reject('Save File Failed:')
          }
        }, (err) => {
          reject('Save File Failed:')
        });
    })
  }
  
  public getRoomInfo(room_id: any): Promise<any>{
    const headers = new HttpHeaders({
      'Authorization':  this.token,
      'Content-Type': 'application/json'
    });
    return new Promise((resolve, reject) => {
      this.http.get(this.EDIT_ROOM+room_id, { headers })
        .subscribe((res: any) => {
          if (res.status) {
            resolve(res.data);
          } else {
            reject('Save File Failed:')
          }
        }, (err) => {
          reject('Save File Failed:')
        });
    })
  }
}