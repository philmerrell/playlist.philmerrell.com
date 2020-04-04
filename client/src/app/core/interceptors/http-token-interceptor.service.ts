import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, EMPTY, from, of } from 'rxjs';
import { catchError, switchMap, finalize, take, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment';

// HERE BE DRAGONS...

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken$ = from(this.authService.getAuthTokens());
    return accessToken$.pipe(
      switchMap(tokens => {
        return next.handle(this.addTokenToRequest(request, tokens))
          .pipe(
            catchError((error: HttpErrorResponse) => {
              switch (error.status) {
                case 401:
                  this.presentLoading();
                  return this.handle401Error(request, next);
                default:
                  return throwError(error);
              }
            }
          )
        );
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, tokens: any): HttpRequest<any> {
    if (request.url.indexOf(`${environment.apiBaseUrl}`) !== -1) {
      return request.clone({ setHeaders: { Authorization: `Bearer ${tokens.access_token}` } });
    } else {
      return request;
    }
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return from(this.authService.refreshToken())
        .pipe(
          switchMap((tokens: any) => {
            if (tokens !== null) {
              this.tokenSubject.next(tokens.access_token);
              this.authService.saveTokensToLocalStorage(tokens);
              this.loadingController.dismiss();
              return next.handle(this.addTokenToRequest(request, tokens));
            } else {
              console.log('Tokens cleared: (tried refreshing tokens and failed)');
              this.loadingController.dismiss();
              this.presentToast('Your session has expired');
              // this.authService.clearTokens();
              this.router.navigateByUrl('/home', { replaceUrl: true });
              return EMPTY;
            }

          }),
          catchError(err => {
            console.log('TODO: Initiate logout sequence (catchError - something weird happened)');
            this.presentToast(err.message)
            return next.handle(request);
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      this.isRefreshingToken = false;
      return this.tokenSubject
        .pipe(
          filter(token => token != null),
          take(1),
          switchMap(token => next.handle(this.addTokenToRequest(request, token))));
    }
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    return await toast.present();
  }

  private async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 0,
      spinner: 'crescent'
    });
    return await loading.present();
  }

}