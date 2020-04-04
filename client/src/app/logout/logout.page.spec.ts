import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogoutPage } from './logout.page';
import { Router } from '@angular/router';

describe('LogoutPage', () => {
  let component: LogoutPage;
  let fixture: ComponentFixture<LogoutPage>;
  const spy = jasmine.createSpyObj('Router', ['navigateByUrl']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutPage ],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: Router, useValue: spy}]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#returnHome method should route user to /home', () => {
    component.returnHome();
    expect(spy.navigateByUrl).toHaveBeenCalledWith('/home', { replaceUrl: true})
  })
});
