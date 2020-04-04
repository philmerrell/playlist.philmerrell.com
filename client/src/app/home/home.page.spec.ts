import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { AuthService } from '../auth/auth.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  const spy = jasmine.createSpyObj('AuthService', ['login', 'signUp', 'isAuthenticated', 'logout', 'getAuthTokens']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      providers: [{ provide: AuthService, useValue: spy }],
      imports: [ IonicModule.forRoot() ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#login should call authService.login method', () => {
    component.login();
    expect(spy.login).toHaveBeenCalled();
  });

  it('#logout should call authService.logout method', () => {
    component.logout();
    expect(spy.logout).toHaveBeenCalled();
  });

  it('#signup should call authService.signup method', () => {
    component.signUp();
    expect(spy.signUp).toHaveBeenCalled();
  })
});
