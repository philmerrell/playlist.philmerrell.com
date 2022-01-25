import { Injectable } from "@angular/core";
import { Subject, Observer, Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private CHAT_URL = 'wss://87mqnivskk.execute-api.us-west-2.amazonaws.com/prod';
  private socket: WebSocketSubject<any> = webSocket(this.CHAT_URL);

  constructor() {
    this.getSocket();
  }

  // EMITTER
  sendMessage(msg: any) {
    this.socket.next(msg);
  }

  // HANDLER
  getSocket() {
    this.socket.asObservable().subscribe(message => {
      console.log(message);
    });
  }


  
  
}