import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { socket_server } from '../../environments/environment'
import { Contact, Message, Room, Member } from '../../types';

@Injectable()
export class SocketsProvider {
  private _SERVER 				: string 	=	socket_server;
  token: string;

  constructor(public http: HttpClient,
    private socket 		: Socket) {
      const res = [ window.localStorage.getItem('authorization'),  window.localStorage.getItem('user')]
      if (res[0]) {
        this.token = res[0];
      }
  }

   /**
    * @public
    * @method pollServer
    * @description    			Use Angular Http call to determine if server address is reachable
    * @return {Observable}
    */
   pollServer() : Observable<any>
   {
      return this.http
      		 .get(this._SERVER);
   }

   public registerForChatService() : void
    {
      
      this.socket.connect();
      this.socket.emit('authenticated', { token: this.token });

      this.socket.on('authenticated', (data) =>
      {
         console.log("socket data=>", data)
      });
    }

    logoutFromSocket() : void
    {
        this.socket.disconnect();
    }
}
