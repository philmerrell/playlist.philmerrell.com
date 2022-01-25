import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { ToastController } from '@ionic/angular';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class AppleMusicService {
  // tslint:disable-next-line:max-line-length
  key = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVUNjRUN1FHRFcifQ.eyJpYXQiOjE1NzExOTU4MzksImV4cCI6MTU4Njc0NzgzOSwiaXNzIjoiOVBMWjNOUkMzOCJ9.kHewJpvobCMBZz_MKoMcUKWJepbywvgBPpHlwBV9wIPrGXKSuN5zhxUZD_3VoR8u3WmAeREg3QPRa_AsEfz3Gg';
  musicKit: any;
  isAuthorized = false;

  constructor(
    private auth: AuthService,
    private toast: ToastController) {

    MusicKit.configure({
      developerToken: this.key,
      app: {
        name: 'Plylstr',
        build: '1.0'
      }
    });

    this.musicKit = MusicKit.getInstance();
    this.musicKit.addEventListener(MusicKit.Events.authorizationStatusDidChange, this.authorizationStatusDidChange.bind(this));

    this.isAuthorized = this.musicKit.isAuthorized;
  }

  async authorize(): Promise<any> {
    try {
      await this.musicKit.authorize();
    } catch (error) {
      console.log(error);
    }
  }

  unauthorize(): void {
    from(this.musicKit.unauthorize()).subscribe(() => {
      this.isAuthorized = false;

      const connectedPlatforms = JSON.parse(localStorage.getItem('connectedPlatforms'));
      const found = connectedPlatforms.findIndex(item => item === 'apple');
      connectedPlatforms.splice(found, 1);
      localStorage.setItem('platform', connectedPlatforms[0]);
    });
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Your Apple Music account is now connected',
      color: 'dark',
      duration: 3000
    });
    toast.present();
  }

  authorizationStatusDidChange(event): void {
    this.isAuthorized = event.authorizationStatus;
    if (this.isAuthorized) {
      this.auth.setIsConnectedToMusicPlatform(true);
      this.presentToast();
    }
  }


  addAuthChangeListener(func) {
    this.musicKit.addEventListener(MusicKit.Events.authorizationStatusDidChange, func);
  }


  getSongsByIRSC() {
    // https://stackoverflow.com/questions/49661397/lookup-song-by-isrc-in-apple-music-itunes
  }

}