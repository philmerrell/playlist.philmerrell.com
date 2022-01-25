import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { WebsocketService } from '../core/websocket.service';
import { AppleMusicService } from '../core/services/apple-music.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isAuthenticated = false;
  socket$: Observable<any>;
  message: string;
  user;
  testResult;

  constructor(
    private authService: AuthService,
    private websocketService: WebsocketService,
    private appleMusicService: AppleMusicService) {}

  async ngOnInit() {
    this.isAuthenticated = await this.authService.isAuthenticated();
    this.getUser();
    // this.socket$ = this.websocketService.getSocket();
  }

  sendMessage(message) {
    this.websocketService.sendMessage({action: 'echo', data: message });
  }


  echoTest() {
    const message = JSON.stringify({action: 'echo', data: 'test' });
    this.websocketService.sendMessage({action: 'echo', data: 'test' });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  signUp() {
    this.authService.signUp();
  }

  async getUser() {
    const token = await this.authService.getAuthTokens();
    if (token) {
      this.user = this.authService.decodeIdToken(token);
      console.log(this.user);
    }
  }

  async testApi() {
    this.testResult = await this.authService.testApi().toPromise();
  }

  connectAppleMusic() {
    this.appleMusicService.authorize();
  }



}
