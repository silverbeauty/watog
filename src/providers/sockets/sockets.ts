import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import * as io from 'socket.io-client';
import { Contact, Message, Room, Member } from '../../types';
import * as io from 'socket.io-client';
// import { Socket } from 'ng-socket-io';
import { Events } from 'ionic-angular';
// declare var io;
const socket_server: string = 'http://151.236.34.11:3000';
// const socket_server: string = 'http://localhost:3000';

@Injectable()
export class SocketsProvider {

  token: string;
  socket:any;
  auth: any;
  constructor(public http: HttpClient, public events: Events, 
    // public socket: Socket
    ) {
      const res = [ window.localStorage.getItem('authorization'),  window.localStorage.getItem('user')]
      if (res[0]) {
        this.token = res[0];
      }
      this.auth = JSON.parse(res[1]);      
  }

  public connectSocket():void{
    this.socket=io(socket_server);

    let self = this;
    setInterval(function(){ 
      if(!self.socket.connected)
        self.socket.connect();
    }, 1000);    
  }

  public registerForChatService() : void
  {
    if(!this.socket.connected)
      this.socket.connect();
    console.log("registerForChatService => ", this.socket)
    this.socket.emit('authenticate', { token: this.token });
  }
  
  public getSocket(){
    return this.socket;
  }

  public sendMsg(msg: any):void {
    if(!this.socket.connected)
      this.socket.connect();
    
    this.socket.emit('send_message', msg);
  }
    
  public Receive(){
    var self = this;
    this.socket.on('new_message', (data) =>
    {
      if(data.Member.user_id != self.auth.id){
        const sender = data.Member.User;
        let _newMsg: Message = {
          messageId: Date.now().toString(),
          userId: sender.id,
          userName: sender.first_name+" "+sender.last_name,
          userAvatar: sender.picture_profile,
          time: data.createdAt,
          message: data.text
        };
        self.events.publish('chat:received', _newMsg);
      }          
    });
    
    this.socket.on('authenticated', (authenticate) => {
      console.log("authenticate status =>", authenticate)
    });
  }
  
  logoutFromSocket() : void
  {
      this.socket.disconnect();
  }
}
