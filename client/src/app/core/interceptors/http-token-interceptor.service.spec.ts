// import { TestBed } from '@angular/core/testing';
// import { HttpTokenInterceptor } from './http-token-interceptor.service';
// import { Router } from '@angular/router';
// import { ToastController, LoadingController } from '@ionic/angular';
// import { AuthService } from '../../auth/auth.service';

// const routerSpy = jasmine.createSpyObj('AuthService', ['login', 'signUp', 'isAuthenticated', 'logout', 'getAuthTokens']);
// const toastControllerSpy = jasmine.createSpyObj('AuthService', ['login', 'signUp', 'isAuthenticated', 'logout', 'getAuthTokens']);
// const loadingControllerSpy = jasmine.createSpyObj('AuthService', ['login', 'signUp', 'isAuthenticated', 'logout', 'getAuthTokens']);
// const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'signUp', 'isAuthenticated', 'logout', 'getAuthTokens']);

// describe('HttpTokenInterceptor', () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     providers: [
//       {
//         provide: Router,
//         useValue: routerSpy
//       },
//       {
//         provide: ToastController,
//         useValue: toastControllerSpy
//       },
//       {
//         provide: LoadingController,
//         useValue: loadingControllerSpy
//       },
//       {
//         provide: AuthService,
//         useValue: authServiceSpy
//       }
//     ]
//   }));

//   it('should be created', () => {
//     const service: HttpTokenInterceptor = TestBed.get(HttpTokenInterceptor);
//     expect(service).toBeTruthy();
//   });
// });
