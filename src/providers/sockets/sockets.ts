import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import * as io from 'socket.io-client';
import { Contact, Message, Room, Member } from '../../types';
// import * as io from 'socket.io-client';
import { Socket } from 'ng-socket-io';
import { Events } from 'ionic-angular';
// declare var io;
const socket_server: string = 'http://151.236.34.11:3000';
// const socket_server: string = 'http://localhost:3000';

@Injectable()
export class SocketsProvider {

  token: string;
  // socket:any;

  constructor(public http: HttpClient, public events: Events, public socket: Socket) {
      const res = [ window.localStorage.getItem('authorization'),  window.localStorage.getItem('user')]
      if (res[0]) {
        this.token = res[0];
      }

      // events.publish('new_message', )
      // events.subscribe('new_message', (dd) => {
      //   console.log("dd", dd)
      // })
      
  }

  public connectSocket():void{
    // this.socket=io(socket_server);
    // alert(this.socket.connected)
    let self = this;
    setInterval(function(){ 
      if(!self.socket.ioSocket.connected)
        self.socket.ioSocket.connect();
    }, 1000);

    
  }

  public registerForChatService():void
  {
    //this.socket.connect();
    console.log("registerForChatService = >", this.socket);    
    this.socket.emit('authenticate', { token: this.token });
  }
  public getSocket(){
    return this.socket;
  }
  public sendMsg(msg: any):void {
    if(!this.socket.ioSocket.connected)
      this.socket.ioSocket.connect();
    
    console.log("sendMsg =>  " , this.socket)
    this.socket.emit('send_message', { msg });
  }
    
  public Receive(){
    // if(!this.socket.connected)
    //   this.socket.connect();
    
    console.log("Receive = > ", this.socket);
    this.socket.on('new_message', (msg) => {
      // separate the salted message with "#" tag 
      console.log("receive message1=>", msg)
    });
    this.socket.on('send_message', (msg) => {
      // separate the salted message with "#" tag 
      console.log("receive message2=>", msg)
    });
    this.socket.on('authenticate', (msg) => {
      // separate the salted message with "#" tag 
      console.log("receive message3=>", msg)
    });
    // return new Observable((observer) =>
    // {
    //   console.log("receive => ", this.socket);
    //   // this.socket.connect();
    //   this.socket.on('new_message', (msg) => {
    //     // separate the salted message with "#" tag 
    //     console.log("receive message1=>", msg)
    //   });
    //   this.socket.on('send_message', (msg) => {
    //     // separate the salted message with "#" tag 
    //     console.log("receive message2=>", msg)
    //   });
    //   this.socket.on('authenticated', (msg) => {
    //     // separate the salted message with "#" tag 
    //     console.log("receive message3=>", msg)
    //   });
    // })
  }

  public retrieveMessages() : Observable<any>
  {
    return new Observable((observer) =>
    {
        this.socket.on('new_message', (data) =>
        {
          console.log("receive message=>", data)
          //observer.next(data);
        });
    })
  }

    logoutFromSocket() : void
    {
        this.socket.disconnect();
    }
}
