import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient, HttpBackend } from '@angular/common/http';

import { Plugins } from '@capacitor/core';
const { Browser } = Plugins;


let httpClientSpy: { get: jasmine.Spy };
let httpClientSpy2: { post: jasmine.Spy };

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: HttpClient,
        useValue: httpClientSpy
      }, {
        provide: HttpBackend,
        useValue: httpClientSpy2
      }]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  // it('#login should open a browser', () => {
  //   const service: AuthService = TestBed.get(AuthService);
  //   service.login();
  //   expect
  //   expect(service).toBeTruthy();
  // })
});
