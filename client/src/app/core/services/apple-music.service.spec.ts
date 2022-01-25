import { TestBed } from '@angular/core/testing';

import { AppleMusicService } from './apple-music.service';

describe('AppleMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppleMusicService = TestBed.get(AppleMusicService);
    expect(service).toBeTruthy();
  });
});
