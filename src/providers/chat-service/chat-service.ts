import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Contact, Message, Room, Member } from '../../types';
import { server_url } from '../../environments/environment'

@Injectable()
export class ChatService {
  _data: any={
    "array":[
      {
        "messageId":"1",
        "userId":"140000198202211138",
        "userName":"Luff",
        "userImgUrl":"./assets/user.jpg",
        "toUserId":"210000198410281948",
        "toUserName":"Hancock",
        "userAvatar":"./assets/to-user.jpg",
        "time":1488349800000,
        "message":"A good programmer is someone who always looks both ways before crossing a one-way street. ",
        "status":"success"
  
      },
      {
        "messageId":"2",
        "userId":"210000198410281948",
        "userName":"Hancock",
        "userImgUrl":"./assets/to-user.jpg",
        "toUserId":"140000198202211138",
        "toUserName":"Luff",
        "userAvatar":"./assets/user.jpg",
        "time":1491034800000,
        "message":"Don’t worry if it doesn't work right. If everything did, you’d be out of a job.",
        "status":"success"
      },
      {
        "messageId":"3",
        "userId":"140000198202211138",
        "userName":"Luff",
        "userImgUrl":"./assets/user.jpg",
        "toUserId":"210000198410281948",
        "toUserName":"Hancock",
        "userAvatar":"./assets/to-user.jpg",
        "time":1491034920000,
        "message":"Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris.",
        "status":"success"
      },
      {
        "messageId":"4",
        "userId":"210000198410281948",
        "userName":"Hancock",
        "userImgUrl":"./assets/to-user.jpg",
        "toUserId":"140000198202211138",
        "toUserName":"Luff",
        "userAvatar":"./assets/user.jpg",
        "time":1491036720000,
        "message":"One man’s crappy software is another man’s full time job.",
        "status":"success"
      },
      {
        "messageId":"5",
        "userId":"210000198410281948",
        "userName":"Hancock",
        "userImgUrl":"./assets/to-user.jpg",
        "toUserId":"140000198202211138",
        "toUserName":"Luff",
        "userAvatar":"./assets/user.jpg",
        "time":1491108720000,
        "message":"Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science.",
        "status":"success"
      },
      {
        "messageId":"6",
        "userId":"140000198202211138",
        "userName":"Luff",
        "userImgUrl":"./assets/user.jpg",
        "toUserId":"210000198410281948",
        "toUserName":"Hancock",
        "userAvatar":"./assets/to-user.jpg",
        "time":1491231120000,
        "message":"If at first you don’t succeed, call it version 1.0",
        "status":"success"
      },
      {
        "messageId":"7",
        "userId":"140000198202211138",
        "userName":"Luff",
        "userImgUrl":"./assets/user.jpg",
        "toUserId":"210000198410281948",
        "toUserName":"Hancock",
        "userAvatar":"./assets/to-user.jpg",
        "time":1491231150000,
        "message":"The <textarea> tag defines a multi-line text input control.\nA text area can hold an unlimited number of characters, and the text renders in a fixed-width font (usually Courier).\nThe size of a text area can be specified by the cols and rows attributes, or even better; through CSS' height and width properties.",
        "status":"success"
      }
    ]
  };

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

  public  getMsgList(): Observable<Message[]> {
    // const msgListUrl = './assets/mock/msg-list.json';
    // const msgListUrl:any= [];
    return this.http.get<any>(this._data)
    .pipe(map(response => response.array));
  }

  public sendMsg(msg: Message) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
    .then(() => this.mockNewMsg(msg));
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
